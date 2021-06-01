import paginateTpl from '../../template/paginate.hbs';

export default class NewPagination {
  constructor({ selector }) {
    this.refs = this.getRefs(selector);
    this.currentPage = 1;
    this.pageList = [];
    this.firstPage = 1;
    this.lastPage = 7;
    this.maxPage = 42;
    this.length = 9;
  }

  getRefs(selector) {
    const refs = {};
    refs.paginateContainer = document.querySelector(selector);
    return refs;
  }

  updatepageList() {
    this.clearPaginationContainer();
    this.pageList = [];
    if (this.currentPage <= this.length - 3) {
      for (let i = this.firstPage; i <= this.length - 2; i += 1) {
        this.pageList.push(i);
      }
      this.pageList.push('...');
      this.pageList.push(this.maxPage);
    } else if (
      this.currentPage >= this.maxPage - this.length + 4 ||
      this.currentPage == this.maxPage
    ) {
      this.pageList.push(1);
      this.pageList.push('...');
      for (let i = this.maxPage - this.length + 3; i <= this.maxPage; i += 1) {
        this.pageList.push(i);
      }
    } else {
      this.pageList.push(1);
      this.pageList.push('...');
      for (
        let i = this.currentPage - Math.round((this.length - 5) / 2);
        i <= +this.currentPage + Math.round((this.length - 5) / 2);
        i += 1
      ) {
        this.pageList.push(i);
      }
      this.pageList.push('...');
      this.pageList.push(this.maxPage);
    }
    this.appendPaginationMarkup();
  }

  appendPaginationMarkup() {
    this.refs.paginateContainer.insertAdjacentHTML('beforeend', paginateTpl(this.pageList));
    const currentEl = document.querySelector(`[data-page="${this.currentPage}"]`);
    currentEl.parentElement.classList.add('active');
  }

  clearPaginationContainer() {
    this.refs.paginateContainer.innerHTML = '';
  }
}
