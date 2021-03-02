import Router from "./Router";
import Render from "./Render";
import JsonFetcher from "./JsonFetcher";
import HomePage from "./pages/HomePage";
import PhotographerPage from "./pages/PhotographerPage";
import Factory from "./Factory";

const jsonFetcher = new JsonFetcher("./src/data/data.json");
const store = await jsonFetcher.fetchData();

const factory = new Factory();

const photographers = {};
const medias = {}

store.photographers.forEach(photographer => {
    photographers[photographer.id] = factory.createPhotographer(photographer);
});

store.media.forEach(data => {
    let type = Object.keys(data)[2];
    medias[data.id] = factory.createMedia(data, type);
});

const homePage = new HomePage(photographers);
const photographerPage = new PhotographerPage(photographers);

const router = new Router();
router.addRoute({ path: "/", page: homePage });

for (const photographer in photographers) {
   let name = photographers[photographer].name.replace(/\s/g, '');
    router.addRoute({ path: `/${name}`, page: photographerPage });
}

const container = document.querySelector("body");

Render.injectHtml(router.pageToLoad().getHtml(), container);

router.listenNavigation("a", container,);
