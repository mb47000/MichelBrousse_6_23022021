import Page from "../classes/Page";
import Header from "../components/Header";
import Media from "../components/Media";
import Lightbox from "../components/Lightbox";
import PhotographerWidget from "../components/PhotographerWidget";
import Form from "../components/Form";

class PhotographerPage extends Page {
  #lightBoxListenerStatus = false;
  #dropDownListenerStatus = false;
  #likeListenerStatus = false;
  #formListenerStatus = false;

  constructor() {
    super();
  }

  like = () => {
    if (!this.#likeListenerStatus) {

      // add like to media, increments object likes and show likes. 
      const addLike = (event) => {
        this.medias[
          event.target.parentNode.parentNode.parentNode.getAttribute("data-id")
        ].likes++;
        event.target.previousSibling.data = `${++event.target.previousSibling
          .data} `;
        ++document.querySelector(".photographer-widget__likes-count").firstChild
          .data;
      };

      document.addEventListener("keydown", (event) => {
        if (
          event.key === "Enter" &&
          event.target.classList.contains("like-button")
        ) {
          addLike(event);
        }
      });

      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("like-button")) {
          event.preventDefault();
          addLike(event);
        }
      });
      this.#likeListenerStatus = true;
    }
  };

  dropDownInit = () => {
    if (!this.#dropDownListenerStatus) {
      document.addEventListener("keydown", (event) => {
        // close dropdown when keydown on escape
        if (
          event.key === "Escape" &&
          event.target.classList.contains("dropdown-content")
        ) {
          const dropdownContent = document.getElementById("sortMediaList");
          const dropdownButton = document.getElementById("sortMediaButton");
          dropdownContent.style.display = "none";
          dropdownContent.tabIndex = "-1";
          dropdownButton.setAttribute("aria-expanded", "false");
          dropdownButton.focus();
        }
      });

      // open dropdown for filter media on click on filter button
      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("dropdown-button")) {
          const dropdownButton = document.getElementById("sortMediaButton");
          const dropdownLi = document.getElementsByClassName(
            "dropdown-content"
          );
          const dropdownContent = document.getElementById("sortMediaList");
          dropdownContent.style.display = "block";
          for (let content of dropdownLi) {
            content.tabIndex = "0";
          }
          dropdownButton.setAttribute("aria-expanded", "true");
          dropdownLi[1].focus();
        }

        // on click, filter media by the choice taken
        if (event.target.classList.contains("dropdown-content")) {
          event.preventDefault();
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
          dropdownButton.setAttribute("aria-expanded", "false");
          dropdownButton.focus();
        }
      });
      this.#dropDownListenerStatus = true;
    }
  };

  photographerTags = () => {
    let tagHtml = ``;
    this.photographer.tags.forEach((tag) => {
      tagHtml += `<li class="photographer-infos__categories-item"><a class="photographer-infos__categories-link background-element" lang="en">${tag}</a></li>`;
    });
    return tagHtml;
  };

  mediasFilter = (filter) => {
    switch (filter) {
      case "Popularité":
        this.mediasKeys.sort(
          (a, b) =>
            parseInt(this.medias[b].likes) - parseInt(this.medias[a].likes)
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
  };

  lightBoxInit = () => {
    // show next media in the lightbox
    const nextMedia = () => {
      if (this.currentKey < this.mediasKeys.length - 1) {
        let title = document.querySelector(".lightbox-modal__title");

        this.render(
          Lightbox.getContent(
            this.medias[this.mediasKeys[++this.currentKey]],
            this.photographer.name.replace(/\s/g, "")
          ),
          document.querySelector(".lightbox-modal__content")
        );
        title.innerHTML = this.medias[this.mediasKeys[this.currentKey]].alt;
      }
    };

    // show media media in the lightbox
    const previousMedia = () => {
      if (this.currentKey > 0) {
        let title = document.querySelector(".lightbox-modal__title");
        this.render(
          Lightbox.getContent(
            this.medias[this.mediasKeys[--this.currentKey]],
            this.photographer.name.replace(/\s/g, "")
          ),
          document.querySelector(".lightbox-modal__content")
        );
        title.innerHTML = this.medias[this.mediasKeys[this.currentKey]].alt;
      }
    };

    if (!this.#lightBoxListenerStatus) {
      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.lightBoxOpen == true) {
          const backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          let targetId = document.querySelector(
            `[data-id="${this.mediasKeys[this.currentKey]}"]`
          );
          document.getElementById("lightbox").style.display = "none";
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "0");
          }
          document.body.style.overflowY = "scroll";
          this.lightBoxOpen = false;
          targetId.focus();
        }
        if (event.key === "ArrowRight" && this.lightBoxOpen == true) {
          nextMedia();
        }
        if (event.key === "ArrowLeft" && this.lightBoxOpen == true) {
          previousMedia();
        }
      });

      document.addEventListener("click", (event) => {
        if (
          event.target.parentNode.parentNode.classList.contains(
            "modal-trigger"
          ) ||
          event.target.classList.contains("modal-trigger")
        ) {
          event.preventDefault();
          let target = event.target.parentNode.parentNode;
          target = target.classList.contains("modal-trigger")
            ? event.target.parentNode.parentNode
            : event.target;
          this.currentKey = this.mediasKeys.indexOf(
            target.getAttribute("data-id")
          );
          let backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "-1");
          }
          document.body.style.overflowY = "hidden";
          let title = document.querySelector(".lightbox-modal__title");
          title.innerHTML = this.medias[target.getAttribute("data-id")].alt;
          this.render(
            Lightbox.getContent(
              this.medias[target.getAttribute("data-id")],
              this.photographer.name.replace(/\s/g, "")
            ),
            document.querySelector(".lightbox-modal__content")
          );
          let nextButton = document.getElementById("lightbox-next");
          document.querySelector("#lightbox").style.display = "flex";
          this.lightBoxOpen = true;
          nextButton.focus();
        }

        if (event.target.classList.contains("modal-close")) {
          const backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          let targetId = document.querySelector(
            `[data-id="${this.mediasKeys[this.currentKey]}"]`
          );
          document.getElementById("lightbox").style.display = "none";
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "0");
          }
          document.body.style.overflowY = "scroll";
          this.lightBoxOpen = false;
          targetId.focus();
        }

        if (
          event.target.classList.contains("lightbox-modal__previous") ||
          event.target.parentNode.classList.contains("lightbox-modal__previous")
        ) {
          event.preventDefault();
          previousMedia();
        }

        if (
          event.target.classList.contains("lightbox-modal__next") ||
          event.target.parentNode.classList.contains("lightbox-modal__next")
        ) {
          event.preventDefault();
          nextMedia();
        }
      });
      this.#lightBoxListenerStatus = true;
    }
  };

  formInit = () => {
    if (!this.#formListenerStatus) {
      document.addEventListener("submit", (event) => {
        let form = document.querySelector('#formContact')
        let data = new FormData(form);
        for (let [key, value] of data) {
          console.log(key,':', value)
        }
        event.preventDefault();
      })

      document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && this.formOpen == true) {
         
          const backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          document.getElementById("form").style.display = "none";
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "0");
          }
          const formButton = document.getElementById("formButton");

          document.body.style.overflowY = "scroll";
          this.formOpen = false;
          formButton.focus();
        }
      });

      document.addEventListener("click", (event) => {
        if (event.target.classList.contains("photographer-infos__contact")) {
          document.querySelector("#form").style.display = "flex";
          let backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "-1");
          }
          document.body.style.overflowY = "hidden";
          this.formOpen = true;
          let form = document.getElementById("firstName");
          form.focus();
        }

        if (event.target.parentNode.classList.contains("form-close")) {
          event.preventDefault();
          document.getElementById("form").style.display = "none";
          const backgroundElements = document.getElementsByClassName(
            "background-element"
          );
          for (let element of backgroundElements) {
            element.setAttribute("tabindex", "0");
          }
          const formButton = document.getElementById("formButton");

          document.body.style.overflowY = "scroll";
          this.formOpen = false;
          formButton.focus();
        }
      });
      this.#formListenerStatus = true;
    }
  };

  widget = () => {
    let totalLikes = 0;

    for (const media in this.medias) {
      totalLikes += this.medias[media].likes;
    }

    return PhotographerWidget.getHtml(totalLikes, this.photographer.price);
  };

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
    this.mediasFilter("Popularité");
    this.like();
    this.dropDownInit();
    this.formInit();
    document.title = `${this.photographer.name} - Fisheye`;

    return `<main class="container">${Header.getHtml()}
    <section class="section photographer-infos" aria-label=”carte des informations du photographe”>
      <div class="photographer-infos__details">
        <h1 class="photographer-infos__name">${this.photographer.name}</h1>
        <span class="photographer-infos__location"><p>${
          this.photographer.city
        }, ${this.photographer.country}</p></span>
        <span class="photographer-infos__catchphrase"><p>${
          this.photographer.tagline
        }</p></span>
        <div class="photographer-infos__categories">
					<ul class="photographer-infos__categories-list">
						${this.photographerTags()}	
					</ul>
				</div>
      </div>
    <div class="photographer-infos__contact-wrap">
    <button id="formButton" class="photographer-infos__contact background-element" data-target="contact"><span class="sr-only">Formulaire</span>Contactez-moi</button>
  </div>
  <div class="photographer-infos__img">
    <img
      class="user__img"
      src="../../dist/SamplePhotos/PhotographersIDPhotos/${this.photographer.name.replace(
        /\s/g,
        ""
      )}.jpg"
      alt="${this.photographer.name}"
    />
  </div></section><section class="section photographer-medias">
  <div class="photographer-medias__sort-wrap">
					<span id="sortMediasLabel" class="photographer-medias__sort-label">
						Trier par <span class="sr-only">popularité ou date ou titre</span>
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
        )}</div></section>${Lightbox.getHtml()}${Form.getHtml(
      this.photographer.name
    )}${this.widget()}</main>`;
  };
}

export default PhotographerPage;
