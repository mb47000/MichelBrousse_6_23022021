class Card {
  static getHtml = (entity) =>
    `<div><a href="/${entity.name.replace(/\s/g, "")}" data-id=${entity.id}>${
      entity.name
    }</a></div>`;
}

export default Card;
