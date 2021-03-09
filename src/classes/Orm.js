import Factory from "./Factory";

class Orm {
  photographers = {};
  medias = {};

  constructor(data) {
    if (Orm.exists) {
      return Orm.instance;
    }
    this._data = data;
    Orm.instance = this;
    Orm.exists = true;
    this.factory = new Factory();
    this.setPhotographers();
    this.setMedias();
    return this;
  }

  getData() {
    return this._data;
  }

  setData(data) {
    this._data = data;
  }

  setPhotographers() {
    this.getData().photographers.forEach((photographer) => {
      this.photographers[photographer.id] = this.factory.createPhotographer(
        photographer
      );
    });
  }

  getAllPhotographers() {
    return this.photographers;
  }

  getPhotographerById(id) {
    return this.photographers[id];
  }

  getPhotographerByTag(tag) {
    let photographers = this.getAllPhotographers();
    let filteredPhotographers = {};
    for (const entity in photographers) {
      let tags = photographers[entity].tags;
      if (tags.includes(tag)) {
        filteredPhotographers[photographers[entity].id] = photographers[entity];
      }
    }
    return filteredPhotographers;
  }

  setMedias() {
    this.getData().media.forEach((data) => {
      let type = Object.keys(data)[2];
      this.medias[data.id] = this.factory.createMedia(data, type);
    });
  }

  getAllMedia() {
    return this.Media;
  }
}

export default Orm;
