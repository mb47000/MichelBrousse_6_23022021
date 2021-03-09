class Card {
  static tags = (tags) => {
    let tagHtml = `<ul class="user__categories-list">`;

    tags.forEach((tag) => {
      tagHtml += `<li class="user__categories-item"><a class="tag user__categories-link" value="${tag}">${tag}</a></li>`;
    });

    tagHtml += `</ul>`;
    return tagHtml;
  };

  static getHtml = (entity) =>
    `<div class="card user"><a href="/photographer/${
      entity.id
    }" class="a-navigation" data-id=${entity.id}><a href="/photographer/${
      entity.id
    }" class="a-navigation user__link"><img class="card__avatar user__img" src="./dist/SamplePhotos/PhotographersIDPhotos/${entity.name.replace(
      /\s/g,
      ""
    )}.jpg"></a><h2 class="user__name"><a href="/photographer/${
      entity.id
    }" class="a-navigation">${
      entity.name
    }</a></h2></a><div class="user__infos"><p class="user__infos-location">${
      entity.city
    }</p><p>${entity.tagline}</p><p>${entity.price}€/jour</p></div>
    <div class="user__categories">${this.tags(entity.tags)}
    </div></div>`;
}

export default Card;
