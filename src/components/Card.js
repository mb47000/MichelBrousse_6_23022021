class Card {
  static tags = (tags) => {
    let tagHtml = `<ul>`;

    tags.forEach((tag) => {
      tagHtml += `<li><button class="tag" value="${tag}">${tag}</button></li>`;
    });

    tagHtml += `</ul>`;
    return tagHtml;
  };

  static getHtml = (entity) =>
    `<div class="card"><img class="card__avatar" src="./dist/SamplePhotos/PhotographersIDPhotos/${entity.name.replace(
      /\s/g,
      ""
    )}.jpg"><h2><a href="/${entity.name.replace(/\s/g, "")}" class="a-navigation" data-id=${
      entity.id
    }>${entity.name}</a></h2><div><p>${entity.city}</p><p>${
      entity.tagline
    }</p><p>${entity.price}€/jour</p></div>
    <div>${this.tags(entity.tags)}
    </div>`;
}

export default Card;
