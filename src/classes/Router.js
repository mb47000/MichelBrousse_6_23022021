import Render from "./Render";

class Router {
  constructor(appContainer) {
    this.appContainer = appContainer;
    this.currentRoute = window.location.pathname;
  }

  routes = {};

  // add event listeners for page navigation
  listenNavigation(querySelector) {
    document.addEventListener("click", (event) => {
      if (!event.target.classList.contains("scroll-to-content")) {
        event.preventDefault();
      }

      if (event.target.classList.contains(querySelector)) {
        event.preventDefault();
        this.redirectOnClick(event.target, this.appContainer);
      } else if (event.target.parentNode.classList.contains(querySelector)) {
        event.preventDefault();
        this.redirectOnClick(event.target.parentNode, this.appContainer);
      }
    });

    window.addEventListener("popstate", (event) =>
      this.redirectOnHistoryNavigation(event, this.appContainer)
    );
  }

  addRoute({ path, page }) {
    this.routes[path] = page;
  }

  // Check if the current url are register in the routes array, if is not redirects to 404 error page
  pageToLoad() {
    if (Object.keys(this.routes).includes(this.currentRoute)) {
      return this.routes[this.currentRoute]();
    } else {
      return this.routes["/404"];
    }
  }

  redirectOnClick(element, container) {
    let route = element.attributes["href"].value;
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
