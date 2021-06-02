import { info } from '@pnotify/core';
import * as PNotifyAnimate from '@pnotify/animate';
import { defaults } from '@pnotify/animate';
defaults.inClass = 'fadeInDown';
defaults.outClass = 'fadeOutUp';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import '@pnotify/bootstrap4/dist/PNotifyBootstrap4.css';

// templates
import galleryTpl from '../template/pictures.hbs';
// import paginateTpl from '../template/paginate.hbs';

// modules
import PicturesApiService from './apiService';
import LoadMoreBtn from './components/load-more-btn';
import Pagination from './components/paginate';

// refs
import getRefs from './components/get-refs';

// variables
const picturesApiService = new PicturesApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});
const pagination = new Pagination({ selector: '[data-action="pagination"]' });
const refs = getRefs();
const heightFormContainer = refs.formContainer.clientHeight;
let heightGalleryContainer = 0;

refs.searchForm.addEventListener('submit', onSearch);
loadMoreBtn.refs.button.addEventListener('click', fetchPictures);
pagination.refs.paginateContainer.addEventListener('click', onSearchPagination);

function scrollTo() {
  if (heightGalleryContainer === 0) {
    return;
  }

  window.scrollTo({
    top: heightGalleryContainer + heightFormContainer,
    behavior: 'smooth',
  });
}

function onSearch(e) {
  e.preventDefault();

  picturesApiService.query = e.currentTarget.elements.query.value.trim();

  if (picturesApiService.query === '') {
    return info({
      text: 'You must enter query parameters. Try again',
    });
  }
  loadMoreBtn.show();
  pagination.show();
  picturesApiService.resetPage();
  pagination.resetCurrentPage();
  clearPicturesContainer();
  fetchPictures();
  e.currentTarget.elements.query.value = '';
  pagination.updatePageList();
}

function onSearchPagination(e) {
  e.preventDefault();

  picturesApiService.currentPage = e.target.dataset.page;
  pagination.currentPage = e.target.dataset.page;

  clearPicturesContainer();
  fetchPicturesPagination();
  pagination.updatePageList();
}

async function fetchPictures() {
  try {
    loadMoreBtn.disable();
    const hits = await picturesApiService.fetchPictures();
    if (hits.length == 0) {
      loadMoreBtn.hide();
      pagination.hide();
      return info({
        text: 'No country has been found. Please enter a more specific query!',
      });
    }
    appendPicturesMarkup(hits);
    loadMoreBtn.enable();
    scrollTo();
  } catch (error) {
    info({
      text: 'Sorry. we cannot process your request!',
    });
  }
}

async function fetchAllPictures() {
  try {
    loadMoreBtn.show();
    pagination.show();
    loadMoreBtn.disable();
    const hits = await picturesApiService.fetchAllPictures();

    if (hits.length == 0) {
      loadMoreBtn.hide();
      pagination.hide();
      return info({
        text: 'No country has been found. Please enter a more specific query!',
      });
    }
    appendPicturesMarkup(hits);
    appendPaginationMarkup();
    loadMoreBtn.enable();
  } catch (error) {
    info({
      text: 'Sorry. we cannot process your request!',
    });
  }
}

async function fetchPicturesPagination() {
  try {
    loadMoreBtn.disable();
    const hits = await picturesApiService.fetchPicturesPagination();
    if (hits.length == 0) {
      loadMoreBtn.hide();
      pagination.hide();
      return info({
        text: 'No country has been found. Please enter a more specific query!',
      });
    }
    appendPicturesMarkup(hits);

    loadMoreBtn.enable();
  } catch (error) {
    info({
      text: 'Sorry. we cannot process your request!',
    });
  }
}

function appendPicturesMarkup(pictures) {
  heightGalleryContainer = refs.galleryContainer.clientHeight;
  refs.picturesContainer.insertAdjacentHTML('beforeend', galleryTpl(pictures));
}

function clearPicturesContainer() {
  refs.picturesContainer.innerHTML = '';
}

fetchAllPictures();

function appendPaginationMarkup() {
  // pagination.length = 11;
  pagination.updatePageList();
}
