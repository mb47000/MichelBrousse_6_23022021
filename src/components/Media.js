class Media {
  static getHtml(media, photographerName) {
    let mediaSrc = media.type == 'image' ? `../../dist/SamplePhotos/${photographerName.replace(/\s/g,"")}/${media.image}` : 'https://via.placeholder.com/150';

    return `<div class="media-card modal-trigger" data-target="lightbox" data-id=${media.id} tabIndex="0">
						<div class="media-card__upper-body">
							<img
								class="media-card__img"
								src="${mediaSrc}"
								alt=""
							/>
						</div>
						<div class="media-card__lower-body">
							<p class="media-card__title">${mediaSrc}</p>
							<p class="media-card__price">${media.price} €</p>
							<p class="media-card__like">${media.likes} <i class="fas fa-heart"></i></p>
						</div>
					</div>`;
  }
}

export default Media;