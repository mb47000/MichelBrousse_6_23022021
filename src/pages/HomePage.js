import Card from "../components/Card";

class HomePage {
  constructor(data) {
    this.photographers = data;
  }

  addProps(props) {
    this.props = props;
    return this;
  }

  cards = () => {
    let cards = "";
    for (const photographer in this.photographers) {
      cards += Card.getHtml(this.photographers[photographer]);
    }
    return cards;
  };

  getHtml = () => `<div>Page d'accueil</div>${this.cards()}`;
}

export default HomePage;
