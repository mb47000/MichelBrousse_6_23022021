class Tags {
  constructor(tags) {
    this.tagList = tags;
  }

  getHtml() {
    let tagHtml = `<ul class="nav__list">`;
    this.tagList.forEach((tag) => {
      tagHtml += `<li class="nav__item"><a class="tag nav__link">${tag}</a></li>`;
    });
    tagHtml += `</ul>`;
    return tagHtml;
  }
}

export default Tags;
