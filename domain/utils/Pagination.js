const PaginationOptions = require("./PaginationOptions");

class Pagination {
  constructor(page, limit) {
    this.paginationOptions = new PaginationOptions(page, limit);
  }
  paginate(data) {
    let offset = this.paginationOptions.getOffset();
    let limit = this.paginationOptions.getLimit();
    return {
      paginatedCollections: data.slice(offset, limit),
      offset: offset,
      limit: limit,
    };
  }
}

module.exports = Pagination;
