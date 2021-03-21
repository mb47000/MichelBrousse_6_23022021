import Card from "../components/Card";
import Tags from "../components/Tags";
import Header from "../components/Header";
import Page from "../classes/Page";
import AnchorContent from "../components/AnchorContent";

class HomePage extends Page {
  #tagListenerStatus = false;
  #scrollListenerStatus = false;

  constructor() {
    super();
    this.photographers = this.orm.getAllPhotographers();
  }

  header = () => Header.getHtml();

  anchorScroll = () => {
    // add event listeners for catch scroll on home page and show button to go content
    if (!this.#scrollListenerStatus) {
      document.addEventListener("scroll", (event) => {
        let scrollPosition = window.scrollY;
        let url = window.location.pathname.split("/");
        let currentPath = url[url.length - 1];
        
        if (currentPath == "/" || currentPath == "") {
          if (scrollPosition > this.lastScrollPosition) {
            document.querySelector(".scroll-to-content").style.display =
              "block";
          } else if (scrollPosition === 0) {
            document.querySelector(".scroll-to-content").style.display = "none";
          }
          this.lastScrollPosition = scrollPosition;
        }
      });

      this.#scrollListenerStatus = true;
    }

    return AnchorContent.getHtml();
  };

   // add event listeners for catch click on tags and call methods for filter photographer by tag
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
          let filterPhotographer = this.orm.getPhotographerByTag(
            event.target.text
          );
          this.render(
            this.cards(filterPhotographer),
            document.querySelector(".cards")
          );
        }
      });

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
    `<main id="app" class="container">${this.header()}<nav aria-label="Photographer categories"  class="nav">${this.tags()}</nav>${this.anchorScroll()}<h1 class="page-title">Nos photographes</h1><section class="section cards" id="main">${this.cards(
      this.photographers
    )}</section></main>`;
}

export default HomePage;
