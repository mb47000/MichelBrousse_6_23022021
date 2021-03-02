import Photographer from "./Photographer";
import Media from "./Media";

class Factory {
  createPhotographer = (data) => new Photographer(data);
  // createMedia = data => new Media(data);
  createMedia = (data, type) => {
    switch (type) {
      case "image":
        return new Media(data, "image");
      case "video":
        return new Media(data, "video");
      default:
        break;
    }
    console.log(type);
  };
}

export default Factory;
