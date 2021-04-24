import images from './gallery-items.js';

const refgallery = document.querySelector(".gallery");
const refmodal = document.querySelector(".lightbox");
const refImg = document.querySelector(".lightbox__image");

let activeImg = 0;

const markup = images.map(({ preview, original, description }) => {
  return `<li class="gallery__item"><a class="gallery__link" href="${original}"><img class="gallery__image" data-source="${original}" src="${preview}" alt="${description}"></a></li>`;
});


refgallery.insertAdjacentHTML("beforeend", markup.join(""));


refgallery.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target.nodeName !== "IMG") {
        return;
    }
    markup.forEach((element, index) => {
        if (element.includes(e.target.src)) {
            activeImg = index;
        }
    });
  refmodal.classList.add("is-open");
  refImg.src = e.target.dataset.source;
});

refmodal.addEventListener('click', e => {
    if (e.target.nodeName === "IMG") {
        return;
    }
    refmodal.classList.remove("is-open");
    refImg.src = "";
});

function keyscroll({ key }) {
    switch (key) {
        case images.length - 1 > activeImg && "ArrowRight":
            activeImg += 1;
            refImg.src = images[activeImg].original;
            break;
        case activeImg > 0 && "ArrowLeft":
            activeImg -= 1;
            refImg.src = images[activeImg].original;
            break;
        case activeImg === images.length - 1 && "ArrowRight":
            activeImg = 0;
            refImg.src = images[activeImg].original;
            break;
        case activeImg === 0 && "ArrowLeft":
            activeImg = images.length - 1;
            refImg.src = images[activeImg].original;
            break;
        case "Escape":
            refmodal.classList.remove("is-open");
            break;
    } 
}
window.addEventListener("keyup", keyscroll);