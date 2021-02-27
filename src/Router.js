import Render from "./Render";

class Router {
  constructor() {
    this.currentRoute = window.location.pathname;
    history.pushState(
      { pageID: this.currentRoute },
      this.currentRoute,
      this.currentRoute
    );
  }

  routes = {};

  listenNavigation(querySelector, container) {
    document.querySelectorAll(querySelector).forEach((item) => {
      item.addEventListener("click", (event) =>
        this.redirectOnClick(event, container)
      );
    });

    window.addEventListener("popstate", (event) =>
      this.redirectOnHistoryNavigation(event, container)
    );
  }

  addRoute({ path, page }) {
    this.routes[path] = page;
  }

  pageToLoad() {
    return this.routes[this.currentRoute];
  }

  redirectOnClick(event, container) {
    event.preventDefault();
    let route = event.target.attributes["href"].value;
    let id = event.target.attributes["data-id"]
      ? event.target.attributes["data-id"].value
      : "";
    history.pushState({ route, id }, route, route);
    this.loadPage(container, route, id);
  }

  redirectOnHistoryNavigation(event, container) {
    let route = event.state.route;
    let id = event.state.id;
    this.loadPage(container, route, id);
  }

  loadPage(container, route, id) {
    this.currentRoute = route;
    Render.injectHtml(this.pageToLoad().addProps({ id }).getHtml(), container);
    this.listenNavigation("a", container);
  }
}

export default Router;
