class Pagination {
  paginationOptions(page, limit) {
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    return {
      startIndex,
      endIndex,
    };
  }
  async paginate(data, page, limit) {
    const { startIndex, endIndex } = this.paginationOptions(page, limit);
    return data.slice(startIndex, endIndex);
  }
}

module.exports = Pagination;
