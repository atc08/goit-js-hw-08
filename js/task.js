"use strict";

import imagesMassive from "./gallery-items.js";

const imagesRef = document.querySelector(".js-gallery");
const createImgList = (imagesMassive) => {
  const createLi = document.createElement("li");
  createLi.classList.add("gallery__item");
  const createItemLink = document.createElement("a");
  createItemLink.classList.add("gallery__link");
  createItemLink.setAttribute("href", imagesMassive.original);
  createLi.append(createItemLink);
  const createImg = document.createElement("img");
  createImg.classList.add("gallery__image");
  createImg.setAttribute("src", imagesMassive.preview);
  createImg.setAttribute("data-source", imagesMassive.original);
  createImg.setAttribute("alt", imagesMassive.description);
  createItemLink.append(createImg);
  return createLi;
};

const imgCard = imagesMassive.map((image) => createImgList(image));
imagesRef.append(...imgCard);

const imgRef = document.querySelector(".gallery__image");
const lightboxModalRef = document.querySelector(".js-lightbox");
const lightboxModalImgRef = document.querySelector(".lightbox__image");
const closeBtnRef = document.querySelector(
  'button[data-action="close-lightbox"]'
);

imagesRef.addEventListener("click", onOpenImgClick);

function onOpenImgClick(event) {
  window.addEventListener("keydown", onButtons);
  event.preventDefault();
  if (event.target.nodeName !== "IMG") {
    return;
  }
  lightboxModalRef.classList.add("is-open");
  lightboxModalImgRef.setAttribute("src", event.target.dataset.source);
  lightboxModalImgRef.setAttribute("alt", event.target.alt);
}

function onButtons(event) {
  if (event.code === "Escape") {
    onCloseBtn();
  }
  if (event.code === "ArrowRight") {
    onNext();
  }
  if (event.code === "ArrowLeft") {
    onPrev();
  }
}

lightboxModalImgRef.setAttribute("data-index", "0");
let index = lightboxModalImgRef.dataset.index;

function onNext() {
  if (index > imagesMassive.length - 2) index = -1;
  ++index;
  lightboxModalImgRef.src = imagesMassive[index].original;
}

function onPrev() {
  if (index < 1) index = imagesMassive.length;
  --index;
  lightboxModalImgRef.src = imagesMassive[index].original;
}

closeBtnRef.addEventListener("click", onCloseBtn);

function onCloseBtn() {
  window.removeEventListener("keydown", onButtons);
  lightboxModalRef.classList.remove("is-open");
  lightboxModalImgRef.setAttribute("src", "");
  lightboxModalImgRef.setAttribute("alt", "");
}

lightboxModalRef.addEventListener("click", onCloseModal);

function onCloseModal(event) {
  if (event.target.nodeName !== "IMG") {
    onCloseBtn();
  }
}
