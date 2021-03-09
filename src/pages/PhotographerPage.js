import Page from "../classes/Page";

class PhotographerPage extends Page {
  constructor() {
    super();
  }

  getPage = () => {
    let url = window.location.pathname.split("/");
    let id = url[url.length - 1];
    let photographer = this.orm.getPhotographerById(id);

    return `<div>Page d'un photographe ${photographer.name}</div><a href="/" class="a-navigation">home page</a>`;
  };
}

export default PhotographerPage;
