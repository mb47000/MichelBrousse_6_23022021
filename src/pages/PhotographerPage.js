import Page from "../classes/Page";
import Header from "../components/Header";

class PhotographerPage extends Page {
  constructor() {
    super();
  }

  getPage = () => {
    let url = window.location.pathname.split("/");
    let id = url[url.length - 1];
    let photographer = this.orm.getPhotographerById(id);

    return `<main class="container">${Header.getHtml()}<section class="section photographer-infos">
    <div class="photographer-infos__details">
      <h1 class="photographer-infos__name">${photographer.name}</h1><span class="photographer-infos__location">
      <p>${photographer.city}, ${photographer.country}</p>
    </span><span class="photographer-infos__catchphrase">
    <p>${photographer.tagline}</p>
  </span>
    </div><div class="photographer-infos__contact-wrap">
    <button class="photographer-infos__contact modal-trigger" data-target="contact">Contactez-moi</button>
  </div>
  <div class="photographer-infos__img">
    <img
      class="user__img"
      src="http://${window.location.hostname}:8080/dist/SamplePhotos/PhotographersIDPhotos/${photographer.name.replace(
        /\s/g,
        ""
      )}.jpg"
      alt=""
    />
  </div></section></main>`;
  };
}

export default PhotographerPage;
