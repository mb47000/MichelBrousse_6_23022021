import Render from "./Render";

class Router {
  constructor(appContainer) {
    this.appContainer = appContainer;
    this.currentRoute = window.location.pathname;
  }

  routes = {};

  listenNavigation(querySelector) {
    document.addEventListener("click", (event) => {
      if(event.target.classList.contains(querySelector)){
        this.redirectOnClick(event, this.appContainer)
    }
    });

    window.addEventListener("popstate", (event) =>
      this.redirectOnHistoryNavigation(event, this.appContainer)
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
    history.pushState({ route }, route, route);
    this.loadPage(container, route);
  }

  redirectOnHistoryNavigation(event, container) {
    let route = window.location.pathname;
    this.loadPage(container, route);
  }

  loadPage(container, route) {
    this.currentRoute = route;
    Render.injectHtml(this.pageToLoad(), container);
  }
}

export default Router;
