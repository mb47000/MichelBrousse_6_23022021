class Lightbox {
  static getHtml = () => {
    return `
    <div class="lightbox-modal modal"  id="lightbox">
				<div class="lightbox-modal__wrap">
				<button class="lightbox-modal__close modal-close" data-target="lightbox">X</button>
 <a class="lightbox-modal__previous" href><i class="fas fa-chevron-left"></i></a>
	 <div class="lightbox-modal__content lightbox-modal__img-wrap">
	 </div>
	 <a href="" class="lightbox-modal__next"><i class="fas fa-chevron-right"></i></a>
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
