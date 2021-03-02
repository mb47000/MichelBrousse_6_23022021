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
    let tagHtml = `<ul>`;

    this.tagList.forEach((tag) => {
      tagHtml += `<li><button class="tag" value="${tag}">${tag}</button></li>`;
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
        console.log("+1")
      for (const entity in entityList) {
        let tag = entityList[entity].tags;
        if (tag.includes(element.value)) {
          filteredEntity[entityList[entity].id] = entityList[entity];
        }
      }

      Render.injectHtml(
        renderMethod(filteredEntity),
        document.querySelector(containerSelector)
      );
    }
  }
}

export default Tags;
