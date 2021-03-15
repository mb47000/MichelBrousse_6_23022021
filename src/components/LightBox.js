class Lightbox {
  static getHtml = () => {
    return `
    <div class="lightbox-modal modal"  id="lightbox">
				<div class="lightbox-modal__wrap">
				</div>
			</div>`;
  };

  static getContent = (media, path) => {
    const type = media.type == "image" ? "img" : "video";
    const typeSrc = media.type == "image" ? media.image : media.video;
    return `<button class="lightbox-modal__close modal-close" data-target="lightbox">X</button>
 <button class="lightbox-modal__previous"><i class="fas fa-chevron-left"></i></button>
	 <div class="lightbox-modal__content lightbox-modal__img-wrap">${
     media.id
   }<${type}
		 src="../../dist/SamplePhotos/${path}/${typeSrc}"
		 alt=""
		 class="lightbox-modal__img carousel__image"
		 ${type === "video" ? "controls" : ""}
	 />
	 </div>
	 <button href="" class="lightbox-modal__next"><i class="fas fa-chevron-right"></i></button>
	 <div class="lightbox-modal__title-wrap">
		 <p class="lightbox-modal__title">Arc en ciel</p>
	 </div>`;
  };
}

export default Lightbox;
