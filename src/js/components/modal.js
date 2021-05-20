//basiclightbox
import * as basicLightbox from 'basiclightbox';

// refs
import getRefs from './get-refs';

// variables
const refs = getRefs();
refs.galleryContainer.addEventListener('click', onCardClick);

function onCardClick(evt) {
  evt.preventDefault();

  const isGalleryImgEl = evt.target.classList.contains('gallery__img');
  if (!isGalleryImgEl) {
    return;
  }
  const src = evt.target.dataset.source;
  openModal(src);
}

function openModal(src) {
  const instance = basicLightbox.create(`<img src="${src}" width="800" height="600">`);
  instance.show();
}
