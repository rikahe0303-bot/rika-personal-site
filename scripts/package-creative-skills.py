"""Build the downloadable skills from the committed, portable sources."""
import hashlib
import json
from pathlib import Path
from zipfile import ZipFile, ZIP_DEFLATED

root = Path(__file__).resolve().parents[1] / "public/creative-skills"
manifest = json.loads((root / "manifest.json").read_text())
out = root / "downloads"
out.mkdir(exist_ok=True)

def add_file(archive, path, archive_name):
    info_name = str(archive_name)
    assert not info_name.startswith("/") and ".." not in Path(info_name).parts
    archive.write(path, info_name)

files = {}
for skill_id in manifest["skills"]:
    folder = root / "source" / skill_id
    assert (folder / "SKILL.md").is_file()
    files[skill_id] = sorted(p for p in folder.rglob("*") if p.is_file())
    target = out / (skill_id + ".zip")
    with ZipFile(target, "w", ZIP_DEFLATED) as z:
        for path in files[skill_id]:
            add_file(z, path, Path(skill_id) / path.relative_to(folder))
        add_file(z, root / "INSTALL.md", Path("INSTALL.md"))

with ZipFile(out / "rika-creative-skills.zip", "w", ZIP_DEFLATED) as z:
    for skill_id, paths in files.items():
        for path in paths:
            add_file(z, path, Path("rika-creative-skills") / skill_id / path.relative_to(root / "source" / skill_id))
    for name in ["INSTALL.md", "manifest.json"]:
        add_file(z, root / name, Path("rika-creative-skills") / name)

checksums = {p.name: hashlib.sha256(p.read_bytes()).hexdigest() for p in sorted(out.glob("*.zip"))}
(out / "checksums.json").write_text(json.dumps(checksums, indent=2) + "\n")
print(f"Packaged {len(files)} skills and {len(checksums)} ZIP downloads.")
