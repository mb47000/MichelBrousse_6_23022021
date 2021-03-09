import Card from "../components/Card";
import Tags from "../components/Tags";
import Header from "../components/Header";
import Page from "../classes/Page";

class HomePage extends Page {
  #tagListenerStatus = false;

  constructor() {
    super();
    this.photographers = this.orm.getAllPhotographers();
  }

  header = () => Header.getHtml();

  tags = () => {
    if (!this.#tagListenerStatus) {
      let tagList = [];
      for (const photographer in this.photographers) {
        let tag = this.photographers[photographer].tags;
        tagList = tagList.concat(tag);
      }

      tagList = [...new Set(tagList)];

      this.photographerTags = new Tags(tagList);

      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("tag")) {
         let filterPhotographer = this.orm.getPhotographerByTag(event.target.text)
         this.render(this.cards(filterPhotographer), document.querySelector(".cards"))
        }
      })

      this.tagListenerStatus = true;
    }

    return this.photographerTags.getHtml();
  };

  cards = (entity) => {
    let cards = "";
    for (const photographer in entity) {
      cards += Card.getHtml(entity[photographer]);
    }
    return cards;
  };

  getPage = () =>
    `<main class="container">${this.header()}<nav aria-label="Photographer categories"  class="nav">${this.tags()}</nav><h1 class="page-title">Nos photographes</h1><section class="cards section">${this.cards(
      this.photographers
    )}</section></main>`;
}

export default HomePage;
