import Cocoa
import WebKit
import CoreGraphics

final class TransparentWebView: WKWebView {
    override var acceptsFirstResponder: Bool { false }
}

final class AppDelegate: NSObject, NSApplicationDelegate, WKNavigationDelegate {
    private var panel: NSPanel!
    private var webView: TransparentWebView!
    private var statusItem: NSStatusItem!
    private var syncTimer: Timer?
    private var mouseMonitor: Any?
    private var enabled = true
    private var pageReady = false
    private var lastRipple = Date.distantPast
    private var overlayVisible = false
    private var values: [String: Double] = ["clarity": 0.58, "ripple": 0.95, "speed": 0.72, "density": 1.0]

    func applicationDidFinishLaunching(_ notification: Notification) {
        NSApp.setActivationPolicy(.accessory)
        loadPreferences()
        buildOverlay()
        buildMenu()
        startTracking()
    }

    private func buildOverlay() {
        panel = NSPanel(contentRect: .zero, styleMask: [.borderless, .nonactivatingPanel], backing: .buffered, defer: false)
        panel.level = .floating
        panel.isOpaque = false
        panel.backgroundColor = .clear
        panel.hasShadow = false
        panel.ignoresMouseEvents = true
        panel.collectionBehavior = [.canJoinAllSpaces, .fullScreenAuxiliary, .ignoresCycle]
        panel.hidesOnDeactivate = false

        let config = WKWebViewConfiguration()
        config.preferences.setValue(true, forKey: "developerExtrasEnabled")
        webView = TransparentWebView(frame: .zero, configuration: config)
        webView.navigationDelegate = self
        webView.setValue(false, forKey: "drawsBackground")
        webView.isHidden = false
        panel.contentView = webView

        let page = URL(fileURLWithPath: Bundle.main.resourcePath!).appendingPathComponent("web/index.html")
        var components = URLComponents(url: page, resolvingAgainstBaseURL: false)!
        components.query = "overlay=1"
        webView.loadFileURL(components.url!, allowingReadAccessTo: page.deletingLastPathComponent())
    }

    func webView(_ webView: WKWebView, didFinish navigation: WKNavigation!) {
        pageReady = true
        applySettings()
    }

    private func buildMenu() {
        statusItem = NSStatusBar.system.statusItem(withLength: NSStatusItem.squareLength)
        statusItem.button?.title = "≋"
        statusItem.button?.toolTip = "Codex 浅海动态背景"
        rebuildMenu()
    }

    private func rebuildMenu() {
        let menu = NSMenu()
        let toggle = NSMenuItem(title: enabled ? "暂停海洋背景" : "启用海洋背景", action: #selector(toggleOverlay), keyEquivalent: "")
        toggle.target = self; menu.addItem(toggle)
        let encounter = NSMenuItem(title: "召唤更多真实鱼群", action: #selector(randomEncounter), keyEquivalent: "")
        encounter.target = self; menu.addItem(encounter)
        menu.addItem(.separator())
        menu.addItem(settingMenu(title: "水体通透度", key: "clarity"))
        menu.addItem(settingMenu(title: "波纹强度", key: "ripple"))
        menu.addItem(settingMenu(title: "生物速度", key: "speed"))
        menu.addItem(settingMenu(title: "生物密度", key: "density"))
        menu.addItem(.separator())
        let preview = NSMenuItem(title: "打开独立设置页", action: #selector(openPreview), keyEquivalent: "")
        preview.target = self; menu.addItem(preview)
        let quit = NSMenuItem(title: "退出动态背景", action: #selector(quitApp), keyEquivalent: "q")
        quit.target = self; menu.addItem(quit)
        statusItem.menu = menu
    }

    private func settingMenu(title: String, key: String) -> NSMenuItem {
        let parent = NSMenuItem(title: title, action: nil, keyEquivalent: "")
        let sub = NSMenu(title: title)
        for (label, value) in [("低", 0.45), ("中", 0.80), ("高", 1.20)] {
            let item = NSMenuItem(title: label, action: #selector(changeSetting(_:)), keyEquivalent: "")
            item.representedObject = ["key": key, "value": value] as [String : Any]
            item.target = self
            if abs((values[key] ?? 0.8) - value) < 0.12 { item.state = .on }
            sub.addItem(item)
        }
        parent.submenu = sub
        return parent
    }

    private func startTracking() {
        syncTimer = Timer.scheduledTimer(withTimeInterval: 0.35, repeats: true) { [weak self] _ in self?.syncToCodexWindow() }
        RunLoop.main.add(syncTimer!, forMode: .common)
        mouseMonitor = NSEvent.addGlobalMonitorForEvents(matching: [.mouseMoved, .leftMouseDragged]) { [weak self] event in self?.handleMouse(event) }
        syncToCodexWindow()
    }

    private func codexWindow() -> CGRect? {
        guard let list = CGWindowListCopyWindowInfo([.optionOnScreenOnly, .excludeDesktopElements], kCGNullWindowID) as? [[String: Any]] else { return nil }
        let candidates = list.compactMap { info -> CGRect? in
            guard (info[kCGWindowOwnerName as String] as? String) == "ChatGPT",
                  (info[kCGWindowLayer as String] as? Int) == 0,
                  let dict = info[kCGWindowBounds as String] as? NSDictionary,
                  let rect = CGRect(dictionaryRepresentation: dict as CFDictionary), rect.width > 500, rect.height > 350 else { return nil }
            return rect
        }
        return candidates.max(by: { $0.width * $0.height < $1.width * $1.height })
    }

    private func syncToCodexWindow() {
        guard enabled else {
            hideOverlay(); return
        }
        let app = NSWorkspace.shared.frontmostApplication
        let appName = app?.localizedName?.lowercased() ?? ""
        let bundleID = app?.bundleIdentifier?.lowercased() ?? ""
        let isCodex = appName.contains("chatgpt") || appName.contains("codex") || bundleID.contains("openai.codex") || bundleID.contains("openai.chat")
        guard isCodex else { hideOverlay(); return }
        let frame: NSRect
        if let cg = codexWindow(), let screen = NSScreen.screens.first(where: { $0.frame.width >= cg.width }) ?? NSScreen.main {
            frame = NSRect(x: cg.minX, y: screen.frame.maxY - cg.maxY, width: cg.width, height: cg.height)
        } else {
            // macOS may hide other apps' window bounds until Screen Recording is granted.
            // Full visible-screen fallback matches the common maximized Codex layout without requesting that permission.
            frame = NSScreen.main?.visibleFrame ?? NSScreen.screens[0].visibleFrame
        }
        if panel.frame != frame { panel.setFrame(frame, display: true) }
        panel.orderFrontRegardless()
        if !overlayVisible {
            overlayVisible = true
            if pageReady { webView.evaluateJavaScript("window.oceanSetActive(true)") }
        }
    }

    private func hideOverlay() {
        panel.orderOut(nil)
        if overlayVisible {
            overlayVisible = false
            if pageReady { webView.evaluateJavaScript("window.oceanSetActive(false)") }
        }
    }

    private func handleMouse(_ event: NSEvent) {
        guard enabled, pageReady, panel.isVisible, Date().timeIntervalSince(lastRipple) > 0.055 else { return }
        lastRipple = Date()
        let local = panel.convertPoint(fromScreen: NSEvent.mouseLocation)
        guard local.x >= 0, local.y >= 0, local.x <= panel.frame.width, local.y <= panel.frame.height else { return }
        let y = panel.frame.height - local.y
        webView.evaluateJavaScript("window.oceanRipple(\(local.x),\(y),false)")
    }

    private func applySettings() {
        guard pageReady else { return }
        let json = values.map { "\"\($0.key)\":\($0.value)" }.joined(separator: ",")
        webView.evaluateJavaScript("window.oceanSettings({\(json)})")
    }

    private func loadPreferences() {
        for key in values.keys { let v = UserDefaults.standard.double(forKey: key); if v > 0 { values[key] = v } }
    }

    @objc private func toggleOverlay() { enabled.toggle(); if !enabled { hideOverlay() }; rebuildMenu() }
    @objc private func randomEncounter() { if pageReady { webView.evaluateJavaScript("window.oceanEncounter()") } }
    @objc private func changeSetting(_ sender: NSMenuItem) {
        guard let data = sender.representedObject as? [String: Any], let key = data["key"] as? String, let value = data["value"] as? Double else { return }
        values[key] = value; UserDefaults.standard.set(value, forKey: key); applySettings(); rebuildMenu()
    }
    @objc private func openPreview() {
        let url = URL(fileURLWithPath: Bundle.main.resourcePath!).appendingPathComponent("web/index.html")
        NSWorkspace.shared.open(url)
    }
    @objc private func quitApp() { NSApp.terminate(nil) }
}

let app = NSApplication.shared
let delegate = AppDelegate()
app.delegate = delegate
app.run()
