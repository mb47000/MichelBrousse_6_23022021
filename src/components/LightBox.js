class Lightbox {
  static getHtml = () => {
    return `
    <div class="lightbox-modal"  id="lightbox">
				<div class="lightbox-modal__wrap">
				</div>
			</div>`;
  };

  static getContent =(media, path) => (
    `<button class="lightbox-modal__close modal-close" data-target="lightbox">X</button>
 <button class="lightbox-modal__previous"><i class="fas fa-chevron-left"></i></button>
	 <div class="lightbox-modal__content">${media.id}<img
		 src="../../dist/SamplePhotos/${path}/${media.image}"
		 alt=""
		 class="lightbox-modal__img"
	 />
	 </div>
	 <button href="" class="lightbox-modal__next"><i class="fas fa-chevron-right"></i></button>
	 <div class="lightbox-modal__title-wrap">
		 <p class="lightbox-modal__title">Arc en ciel</p>
	 </div>`)
}

export default Lightbox;
