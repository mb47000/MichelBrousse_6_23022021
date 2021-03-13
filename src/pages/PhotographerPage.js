import Page from "../classes/Page";
import Header from "../components/Header";
import Media from "../components/Media";
import Lightbox from "../components/Lightbox";

class PhotographerPage extends Page {
  #lightBoxListenerStatus = false;

  constructor() {
    super();
  }

  lightBoxInit = () => {
    let mediasFilter = this.medias;
    this.mediasKeys = Object.keys(mediasFilter);
    if (!this.#lightBoxListenerStatus) {
      document.addEventListener("click", (event) => {
        if (
          event.target.parentNode.parentNode.classList.contains("modal-trigger")
        ) {
          let target = event.target.parentNode.parentNode;
          this.currentKey = this.mediasKeys.indexOf(target.getAttribute("data-id"));
          this.render(
            Lightbox.getContent(
              mediasFilter[target.getAttribute("data-id")],
              this.photographer.name.replace(/\s/g, "")
            ),
            document.querySelector(".lightbox-modal__wrap")
          );
          document.querySelector("#lightbox").style.display = "flex";
        }

        if (event.target.classList.contains("modal-close")) {
          document.getElementById("lightbox").style.display = "none";
        }

        if (event.target.classList.contains("lightbox-modal__previous") || event.target.parentNode.classList.contains("lightbox-modal__previous")) {
         if (this.currentKey > 0) {
          this.render(
            Lightbox.getContent(
              this.medias[this.mediasKeys[--this.currentKey]],
              this.photographer.name.replace(/\s/g, "")
            ),
            document.querySelector(".lightbox-modal__wrap")
          );
         }
        }

        if (event.target.classList.contains("lightbox-modal__next") || event.target.parentNode.classList.contains("lightbox-modal__next")) {
          console.log("next")
          if (this.currentKey < this.mediasKeys.length - 1) {
            this.render(
              Lightbox.getContent(
                this.medias[this.mediasKeys[++this.currentKey]],
                this.photographer.name.replace(/\s/g, "")
              ),
              document.querySelector(".lightbox-modal__wrap")
            );
          }
         }
      });
    }
  };

  mediasCards = (photographerMedias, photographerName) => {
    this.lightBoxInit();

    let mediaCards = "";
    for (const media in photographerMedias) {
      if (photographerMedias[media].type == "image") {
        mediaCards += Media.getHtml(
          photographerMedias[media],
          photographerName
        );
      }
    }
    return mediaCards;
  };

  getPage = () => {
    let url = window.location.pathname.split("/");
    let id = url[url.length - 1];
    this.id = id;
    this.photographer = this.orm.getPhotographerById(id);
    let photographer = this.orm.getPhotographerById(id);
    let medias = this.orm.getMediasByPhotographerId(id);
    this.medias = medias;

    return `<main class="container">${Header.getHtml()}<section class="section photographer-infos">
    <div class="photographer-infos__details">
      <h1 class="photographer-infos__name">${
        photographer.name
      }</h1><span class="photographer-infos__location">
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
      src="../../dist/SamplePhotos/PhotographersIDPhotos/${photographer.name.replace(
        /\s/g,
        ""
      )}.jpg"
      alt=""
    />
  </div></section><section class="section photographer-medias">
  <div class="photographer-medias__sort-wrap">
    <span id="sortMediasLabel" class="photographer-medias__sort-label">
      Trier par
    </span>
    <button
      id="sortMediaButton"
      class="photographer-medias__sort-button"
      aria-haspopup="listbox"
      aria-labelledby="sortMediasLabel"
    >
      Popularité
    </button>
    <ul
      id="sortMediaList"
      class="photographer-medias__sort-list"
      tabindex="-1"
      role="listbox"
      aria-labelledby="exp_elem"
    >
      <li class="photographer-medias__sort-option" role="option">
        Popularité
      </li>
      <li class="photographer-medias__sort-option" role="option">Date</li>
      <li class="photographer-medias__sort-option" role="option">
        Titre
      </li>
    </ul>
  </div><div class="photographer-medias__grid">${this.mediasCards(
    medias,
    photographer.name
  )}</div></section>${Lightbox.getHtml()}</main>`;
  };
}

export default PhotographerPage;
