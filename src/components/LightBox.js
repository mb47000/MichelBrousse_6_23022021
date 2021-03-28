class Lightbox {
  static getHtml = () => {
    return `
    <div class="lightbox-modal modal"  id="lightbox">
				<div class="lightbox-modal__wrap">
				<button class="lightbox-modal__close modal-close" data-target="lightbox" aria-label="fermeture de la lightbox"><span aria-hidden="true">X</span><span class="sr-only">fermeture de la lightbox</span></button>
 <a class="lightbox-modal__previous" href aria-label="media précédent"><i class="fas fa-chevron-left"></i></a>
	 <div class="lightbox-modal__content lightbox-modal__img-wrap">
	 </div>
	 <a href="" class="lightbox-modal__next" id="lightbox-next" aria-label="media suivant"><i class="fas fa-chevron-right"></i></a>
	 <div class="lightbox-modal__title-wrap">
		 <p class="lightbox-modal__title"></p>
	 </div>
				</div>
			</div>`;
  };

  static getContent = (media, path) => {
    const type = media.type == "image" ? "img" : "video";
    const typeSrc = media.type == "image" ? media.image : media.video;
    return `<${type}
		 src="../../dist/SamplePhotos/${path}/${typeSrc}"
		 alt="${media.alt.trim()}"
		 class="lightbox-modal__img carousel__image"
		 ${type === "video" ? "controls" : ""}
	 />`;
  };
}

export default Lightbox;
