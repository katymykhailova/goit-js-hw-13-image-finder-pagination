// refs
import getRefs from './get-refs';

// variables
const refs = getRefs();
const heightDocumentElement = document.documentElement.clientHeight;

const arrowTop = document.createElement(`div`);
arrowTop.className = 'arrow-top';
arrowTop.dataset.hidden = true;
refs.bodyEl.appendChild(arrowTop);

arrowTop.addEventListener('click', onArrowTopClick);

window.addEventListener('scroll', showHideArrowTop);

function onArrowTopClick() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}

function showHideArrowTop() {
  arrowTop.dataset.hidden = pageYOffset < document.documentElement.clientHeight;
}
