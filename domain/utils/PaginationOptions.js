class PaginationOptions {
  constructor(page, limit) {
    this.limit = limit == undefined ? 10 : limit;
    this.page = page == undefined ? 1 : page;
  }
  getLimit() {
    return this.limit;
  }
  getOffset() {
    const offset = (this.page - 1) * this.limit;
    return offset;
  }
}

module.exports = PaginationOptions;
