"use strict";
const all = window.GALLERY;
const categories = [...new Set(all.map(item => item.cat))];
const filterBar = document.querySelector(".filters");
const collection = document.querySelector(".collection");
const count = document.querySelector(".count");
const dialog = document.querySelector("dialog");
const viewerImage = dialog.querySelector("img");
const source = dialog.querySelector(".source");
let active = "全部";
let visible = all;
let viewing = 0;
let opener;
const element = (tag, className, content) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (content) node.textContent = content;
  return node;
};
function showFrame() {
  const item = visible[viewing];
  viewerImage.src = item.src;
  viewerImage.alt = item.title;
  dialog.querySelector(".viewer-count").textContent = `${viewing + 1} / ${visible.length}`;
  dialog.querySelector(".viewer-group").textContent = `${item.cat} / ${item.group}`;
  dialog.querySelector(".viewer-title").textContent = item.title;
  source.hidden = !/^https:\/\//.test(item.origin);
  if (source.hidden) source.removeAttribute("href");
  else source.href = item.origin;
}
function step(amount) {
  viewing = (viewing + amount + visible.length) % visible.length;
  showFrame();
}
function render() {
  visible = active === "全部" ? all : all.filter(item => item.cat === active);
  count.textContent = `${visible.length} 张截图`;
  for (const button of filterBar.children) button.setAttribute("aria-pressed", button.textContent === active);
  const sections = (active === "全部" ? categories : [active]).map(category => {
    const items = visible.filter(item => item.cat === category);
    const section = element("section", "section");
    const heading = element("div", "section-head");
    heading.append(element("h2", "", category), element("span", "", `${items.length} 张`));
    const grid = element("div", "grid");
    for (const item of items) {
      const card = element("button", "card");
      card.type = "button";
      const photo = element("span", "card-photo");
      const img = element("img");
      img.src = item.src;
      img.alt = "";
      img.loading = "lazy";
      img.width = item.w;
      img.height = item.h;
      photo.append(img);
      const meta = element("span", "card-meta");
      meta.append(element("span", "", item.group), element("strong", "", item.title));
      card.append(photo, meta);
      card.addEventListener("click", () => {
        opener = card;
        viewing = visible.indexOf(item);
        showFrame();
        dialog.showModal();
      });
      grid.append(card);
    }
    section.append(heading, grid);
    return section;
  });
  collection.replaceChildren(...sections);
}
for (const name of ["全部", ...categories]) {
  const button = element("button", "", name);
  button.type = "button";
  button.addEventListener("click", () => {
    active = name;
    render();
    if (window.scrollY > document.querySelector("main").offsetTop) document.querySelector("main").scrollIntoView();
  });
  filterBar.append(button);
}
dialog.querySelector(".close").addEventListener("click", () => dialog.close());
dialog.querySelector(".prev").addEventListener("click", () => step(-1));
dialog.querySelector(".next").addEventListener("click", () => step(1));
dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
dialog.addEventListener("close", () => opener?.focus());
dialog.addEventListener("keydown", event => {
  if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
    event.preventDefault();
    step(event.key === "ArrowLeft" ? -1 : 1);
  }
});
render();
