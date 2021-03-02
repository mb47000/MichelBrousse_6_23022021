import Card from "../components/Card";
import Tags from "../components/Tags";

class HomePage {
  tagListenerStatus = false;

  constructor(data) {
    this.photographers = data;
  }

  addProps(props) {
    this.props = props;
    return this;
  }

  tags = () => {
    if (!this.tagListenerStatus) {
      let tagList = [];
      for (const photographer in this.photographers) {
        let tag = this.photographers[photographer].tags;
        tagList = tagList.concat(tag);
      }

      tagList = [...new Set(tagList)];

      this.photographerTags = new Tags(
        tagList,
        this.photographers,
        ".cards",
        this.cards
      );

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

  getHtml = () =>
    `<h1>Page d'accueil</h1><div>${this.tags()}</div><div class="cards">${this.cards(
      this.photographers
    )}</div>`;
}

export default HomePage;
