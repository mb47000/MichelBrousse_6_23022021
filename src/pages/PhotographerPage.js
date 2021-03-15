import Page from "../classes/Page";
import Header from "../components/Header";
import Media from "../components/Media";
import Lightbox from "../components/Lightbox";
import PhotographerWidget from "../components/PhotographerWidget";

class PhotographerPage extends Page {
  #lightBoxListenerStatus = false;
  #dropDownListenerStatus = false;
  #likeListenerStatus = false;

  constructor() {
    super();
  }

  like = () => {
    if (!this.#likeListenerStatus){
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-button")) {
          this.medias[event.target.parentNode.parentNode.parentNode.getAttribute("data-id")].likes++
          event.target.previousSibling.data = `${++event.target.previousSibling.data} `;
          ++document.querySelector('.photographer-widget__likes-count').firstChild.data
        }
      })
      this.#likeListenerStatus = true;
    }
  }

  dropDownInit = () => {
    if (!this.#dropDownListenerStatus) {
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("dropdown-button")) {
          const dropdownLi = document.getElementsByClassName(
            "dropdown-content"
          );
          const dropdownContent = document.getElementById("sortMediaList");
          dropdownContent.style.display = "block			";
          for (let content of dropdownLi) {
            content.tabIndex = "0";
          }
          dropdownLi[1].focus();
        }

        if (event.target.classList.contains("dropdown-content")) {
          const dropdownContent = document.getElementById("sortMediaList");
          const dropdownButton = document.getElementById("sortMediaButton");
          dropdownButton.innerHTML = event.target.innerHTML;
          dropdownContent.prepend(event.target.parentNode);
          dropdownContent.style.display = "none";
          dropdownContent.tabIndex = "-1";
          this.mediasFilter(event.target.innerHTML);
          this.render(
            this.mediasCards(this.mediasKeys, this.photographer.name),
            document.querySelector(".photographer-medias__grid")
          );
        }
      });
      this.#dropDownListenerStatus = true;
    }
  };

  mediasFilter = (filter) => {
    switch (filter) {
      case "Popularité":
        this.mediasKeys.sort(
          (a, b) =>
            parseInt(this.medias[b].likes) -
            parseInt(this.medias[a].likes)
        );
        break;
      case "Date":
        this.mediasKeys.sort(
          (a, b) =>
            new Date(this.medias[b].date.replace(/-/g, "/")) -
            new Date(this.medias[a].date.replace(/-/g, "/"))
        );
        break;
      case "Titre":
        this.mediasKeys.sort((a, b) => {
          if (
            this.medias[a][this.medias[a].type] <
            this.medias[b][this.medias[b].type]
          ) {
            return -1;
          }
          if (
            this.medias[a][this.medias[a].type] >
            this.medias[b][this.medias[b].type]
          ) {
            return 1;
          }
          return 0;
        });
        break;
    }
  }

  lightBoxInit = () => {
    if (!this.#lightBoxListenerStatus) {
      document.addEventListener("click", (event) => {
        if (
          event.target.parentNode.parentNode.classList.contains("modal-trigger")
        ) {
          let target = event.target.parentNode.parentNode;
          this.currentKey = this.mediasKeys.indexOf(
            target.getAttribute("data-id")
          );
          this.render(
            Lightbox.getContent(
              this.medias[target.getAttribute("data-id")],
              this.photographer.name.replace(/\s/g, "")
            ),
            document.querySelector(".lightbox-modal__wrap")
          );
          document.querySelector("#lightbox").style.display = "flex";
        }

        if (event.target.classList.contains("modal-close")) {
          document.getElementById("lightbox").style.display = "none";
        }

        if (
          event.target.classList.contains("lightbox-modal__previous") ||
          event.target.parentNode.classList.contains("lightbox-modal__previous")
        ) {
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

        if (
          event.target.classList.contains("lightbox-modal__next") ||
          event.target.parentNode.classList.contains("lightbox-modal__next")
        ) {
          console.log("next", this.mediasKeys, this.currentKey);
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

  widget = () => {
    let totalLikes = 0;

    for (const media in this.medias) {
      totalLikes += this.medias[media].likes;
    }

    return PhotographerWidget.getHtml(totalLikes, this.photographer.price)
  }

  mediasCards = (photographerMedias, photographerName) => {
    this.lightBoxInit();
    let mediaCards = "";

    photographerMedias.forEach((media) => {
      mediaCards += Media.getHtml(this.medias[media], photographerName);
    });
    return mediaCards;
  };

  getPage = () => {
    let url = window.location.pathname.split("/");
    let id = url[url.length - 1];
    this.photographer = this.orm.getPhotographerById(id);
    this.medias = this.orm.getMediasByPhotographerId(id);
    this.mediasKeys = Object.keys(this.medias);
    this.mediasFilter('Popularité');
    this.like();
    this.dropDownInit();

    return `<main class="container">${Header.getHtml()}<section class="section photographer-infos">
    <div class="photographer-infos__details">
      <h1 class="photographer-infos__name">${
        this.photographer.name
      }</h1><span class="photographer-infos__location">
      <p>${this.photographer.city}, ${this.photographer.country}</p>
    </span><span class="photographer-infos__catchphrase">
    <p>${this.photographer.tagline}</p>
  </span>
    </div><div class="photographer-infos__contact-wrap">
    <button class="photographer-infos__contact modal-trigger" data-target="contact">Contactez-moi</button>
  </div>
  <div class="photographer-infos__img">
    <img
      class="user__img"
      src="../../dist/SamplePhotos/PhotographersIDPhotos/${this.photographer.name.replace(
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
					<button id="sortMediaButton" class="photographer-medias__sort-button dropdown-button background-element" aria-haspopup="listbox" aria-labelledby="sortMediasLabel">
						Popularité
					</button>
					<ul id="sortMediaList" class="photographer-medias__sort-list dropdown-content" tabindex="-1" role="listbox" aria-labelledby="exp_elem">
						<li class="photographer-medias__sort-option" role="option">
							<a href="" class="photographer-medias__sort-option-link dropdown-content">Popularité</a>
						</li>
						<li class="photographer-medias__sort-option" role="option">
							<a href="" class="photographer-medias__sort-option-link dropdown-content">Date</a>
						</li><li class="photographer-medias__sort-option" role="option">
							<a href="" class="photographer-medias__sort-option-link dropdown-content">Titre</a>
						</li>
					</ul>
				</div><div class="photographer-medias__grid">${this.mediasCards(
          this.mediasKeys,
          this.photographer.name
        )}</div></section>${Lightbox.getHtml()}${this.widget()}</main>`;
  };
}

export default PhotographerPage;
