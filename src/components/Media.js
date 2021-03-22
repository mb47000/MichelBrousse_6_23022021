class Media {
  static getThumbnailPath = (video) => {
    return `${video.substring(0, video.length - 3)}jpg`;
  };

  static getHtml(media, photographerName) {
    let mediaSrc =
      media.type == "image"
        ? `../../dist/SamplePhotos/${photographerName.replace(/\s/g, "")}/${
            media.image
          }`
        : `../../dist/SamplePhotos/${photographerName.replace(/\s/g, "")}/${
            this.getThumbnailPath(media.video)
          }`;

    return `<a class="media-card modal-trigger background-element" data-target="lightbox" data-id=${
      media.id
    } tabIndex="0" href>
						<div class="media-card__upper-body">
							<img
								class="media-card__img"
								src="${mediaSrc}"
								alt="${media.alt.trim()}"
							/>
						</div>
						<div class="media-card__lower-body">
							<p class="media-card__title">${media.alt.trim()}</p>
							<p class="media-card__price">${media.price} €</p>
							<p class="media-card__like">${
                media.likes
              } <i class="like-button fas fa-heart" aria-hidden="true" tabindex="0"></i></p>
						</div>
					</a>`;
  }
}

export default Media;
