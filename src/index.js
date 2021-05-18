import galleryTpl from './template/pictures.hbs';

import './sass/main.scss';
import NewsApiService from './js/apiService';

const newsApiService = new NewsApiService();

const picturesContainer = document.querySelector('.gallery');
const searchForm = document.querySelector('#search-form');
searchForm.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  newsApiService.query = e.currentTarget.elements.query.value.trim();
  newsApiService.fetchPictures().then(hits => {
    appendPicturesMarkup(hits);
  });
}

function appendPicturesMarkup(pictures) {
  picturesContainer.insertAdjacentHTML('beforeend', galleryTpl(pictures));
}
