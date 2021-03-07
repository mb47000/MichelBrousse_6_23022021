class PhotographerPage {
  constructor(photographers) {
    this.photographers = photographers;
  }

  getPage = () => {
    let url = window.location.pathname.split("/");
    let id = url[url.length - 1];

    return `<div>Page d'un photographe ${this.photographers[id].name}</div><a href="/" class="a-navigation">home page</a>`;
  };

  addProps = (props) => {
    this.props = props;
    return this;
  };
}

export default PhotographerPage;
