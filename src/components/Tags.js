import Render from "../Render";

class Tags {
  constructor(tags, entityList, containerSelector, renderMethod) {
    this.tagList = tags;
    this.entityList = entityList;
    this.containerSelector = containerSelector;
    this.listenerIsOn = false;
    this.renderMethod = renderMethod;
  }

  getHtml = () => {
    let tagHtml = `<ul class="nav__list">`;

    this.tagList.forEach((tag) => {
      tagHtml += `<li class="nav__item"><a class="tag nav__link">${tag}</a></li>`;
    });

    tagHtml += `</ul>`;

    if (!this.listenerIsOn) {
      document.addEventListener("click", (event) =>
        this.tagListener(
          event,
          this.entityList,
          this.containerSelector,
          this.renderMethod
        )
      );
      this.listenerIsOn = true;
    }
    return tagHtml;
  };

  tagListener(event, entityList, containerSelector, renderMethod) {
    let element = event.target;
    let filteredEntity = {};

    if (element.classList.contains("tag")) {
      for (const entity in entityList) {
        let tag = entityList[entity].tags;
        if (tag.includes(element.text)) {
          filteredEntity[entityList[entity].id] = entityList[entity];
        }
      }
      console.log(filteredEntity, containerSelector)
      Render.injectHtml(
        renderMethod(filteredEntity),
        document.querySelector(containerSelector)
      );
    }
  }
}

export default Tags;
