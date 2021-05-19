// pnotify
import { info } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';

import { defaults } from '@pnotify/animate';
defaults.inClass = 'fadeInDown';
defaults.outClass = 'fadeOutUp';

import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';

import galleryTpl from './template/pictures.hbs';
import './sass/main.scss';
import NewsApiService from './js/apiService';
import LoadMoreBtn from './js/components/load-more-btn';

const newsApiService = new NewsApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

const refs = {
  searchForm: document.querySelector('#search-form'),
  picturesContainer: document.querySelector('.gallery'),
  galleryContainer: document.querySelector('.gallery-container'),
  formContainer: document.querySelector('.form-container'),
};

refs.searchForm.addEventListener('submit', onSearch);

loadMoreBtn.refs.button.addEventListener('click', fetchPictures);
const heightFormContainer = refs.formContainer.clientHeight;
let top = 0;

function scrollTo() {
  window.scrollTo({
    top: top,
    behavior: 'smooth',
  });
}

function onSearch(e) {
  e.preventDefault();

  newsApiService.query = e.currentTarget.elements.query.value.trim();

  if (newsApiService.query === '') {
    return info({
      text: 'You must enter query parameters. Try again',
    });
  }
  loadMoreBtn.show();
  newsApiService.resetPage();
  clearPicturesContainer();
  fetchPictures();
}

function fetchPictures() {
  loadMoreBtn.disable();
  newsApiService.fetchPictures().then(hits => {
    if (hits.length == 0) {
      loadMoreBtn.hide();
      return info({
        text: 'No country has been found. Please enter a more specific query!',
      });
    }
    appendPicturesMarkup(hits);
    loadMoreBtn.enable();
    scrollTo();
  });
}

function appendPicturesMarkup(pictures) {
  top = refs.galleryContainer.clientHeight + heightFormContainer;
  refs.picturesContainer.insertAdjacentHTML('beforeend', galleryTpl(pictures));
}

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}
