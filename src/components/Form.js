class Form {
  static getHtml = (name) => {
    return `
      <div class="contact-modal modal"  id="form">
                  <div class="contact-modal__wrap">
                  <a href="" class="form-close" data-target="contact">
						<i class="fas fa-times contact-modal__close form-close"></i>
					</a>
					<div class="contact-form">
						<h1 class="contact-form__title">Contactez- moi<br />${name}</h1>
						<form action="" class="contact-form__form" id="formContact">
							<label for="firstName" class="contact-form__label">
								Prénom
								<input
									type="text"
									name="firstName"
									id="firstName"
									class="contact-form__input"
								/>
							</label>
							<label for="lastName" class="contact-form__label">
								Nom
								<input
									type="text"
									name="lastName"
									id="lastName"
									class="contact-form__input"
								/>
							</label>
							<label for="email" class="contact-form__label">
								Email
								<input
									type="email"
									name="email"
									id="email"
									class="contact-form__input"
								/>
							</label>
							<label for="message" class="contact-form__label">
								Votre message
								<textarea
									name="message"
									id="message"
									class="contact-form__textarea"
								></textarea>
							</label>
							<button type="submit" class="contact-form__submit">Envoyer</button>
						</form>
					</div>
                  </div>
              </div>`;
  };
}

export default Form;
