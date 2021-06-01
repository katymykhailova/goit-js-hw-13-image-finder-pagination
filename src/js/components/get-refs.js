export default function getRefs() {
  return {
    searchForm: document.querySelector('#search-form'),
    picturesContainer: document.querySelector('.gallery'),
    galleryContainer: document.querySelector('.gallery-container'),
    formContainer: document.querySelector('.form-container'),
    paginateContainer: document.querySelector('.paginate-container'),
    bodyEl: document.body,
  };
}
