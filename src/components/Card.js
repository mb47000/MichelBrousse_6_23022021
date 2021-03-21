class Card {
  static tags = (tags) => {
    let tagHtml = `<ul class="user__categories-list">`;

    tags.forEach((tag) => {
      tagHtml += `<li class="user__categories-item"><a class="tag user__categories-link" lang="en" href><span class="sr-only">tag</span>${tag}</a></li>`;
    });

    tagHtml += `</ul>`;
    return tagHtml;
  };

  static getHtml = (entity) =>
    `<div class="user"><a href="/photographer/${
      entity.id
    }" class="a-navigation user__link" data-id=${entity.id}><img class="user__img" src="./dist/SamplePhotos/PhotographersIDPhotos/${entity.name.replace(
      /\s/g,
      ""
    )}.jpg" alt="Portrait de ${entity.name}"><h2 class="user__name">${
      entity.name
    }</h2></a><div class="user__infos"><span class="user__infos-location"><p>${
      entity.city
    }</p></span><span class="user__infos-catchphrase"><p>${entity.tagline}</p></span><span class="user__infos-price"><p>${entity.price}€/jour</p></span></div>
    <div class="user__categories">${this.tags(entity.tags)}
    </div></div>`;
}

export default Card;
