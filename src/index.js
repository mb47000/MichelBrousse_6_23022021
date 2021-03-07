import Router from "./Router";
import Render from "./Render";
import JsonFetcher from "./JsonFetcher";
import HomePage from "./pages/HomePage";
import PhotographerPage from "./pages/PhotographerPage";
import Factory from "./Factory";
import Orm from "./Orm"

const jsonFetcher = new JsonFetcher("./src/data/data.json");
const dataBase = await jsonFetcher.fetchData();
const orm = new Orm(dataBase);
const factory = new Factory();

const photographers = {};
const medias = {};

orm.getData().photographers.forEach((photographer) => {
  photographers[photographer.id] = factory.createPhotographer(photographer);
});

orm.getData().media.forEach((data) => {
  let type = Object.keys(data)[2];
  medias[data.id] = factory.createMedia(data, type);
});

const homePage = new HomePage(photographers);
const photographerPage = new PhotographerPage(photographers);

const container = document.querySelector("body");
const router = new Router(container);
router.addRoute({ path: "/", page: homePage.getPage });
router.addRoute({ path: "/index.html", page: homePage.getPage });
for (const photographer in photographers) {
  let id = photographers[photographer].id;
  router.addRoute({
    path: `/photographer/${id}`,
    page: photographerPage.getPage,
  });
}

Render.injectHtml(router.pageToLoad(), container);

router.listenNavigation("a-navigation");
