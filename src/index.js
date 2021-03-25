import Router from "./classes/Router";
import Render from "./classes/Render";
import JsonFetcher from "./classes/JsonFetcher";
import HomePage from "./pages/HomePage";
import PhotographerPage from "./pages/PhotographerPage";
import Orm from "./classes/Orm"

const jsonFetcher = new JsonFetcher("../src/data/data.json");
const orm = new Orm(await jsonFetcher.fetchData());

const homePage = new HomePage();
const photographerPage = new PhotographerPage();

const appContainer = document.querySelector("body");
const router = new Router(appContainer);

router.addRoute({ path: "/MichelBrousse_6_23022021/", page: homePage.getPage });
router.addRoute({ path: "/MichelBrousse_6_23022021/index.html", page: homePage.getPage });
router.addRoute({ path: "/MichelBrousse_6_23022021/404", page: "<h1>page 404</h1>" });

const photographers = orm.getAllPhotographers();

for (const photographer in photographers) {
  let id = photographers[photographer].id;
  router.addRoute({
    path: `/MichelBrousse_6_23022021/photographer/${id}`,
    page: photographerPage.getPage,
  });
}

Render.injectHtml(router.pageToLoad(), appContainer);

router.listenNavigation("a-navigation");
