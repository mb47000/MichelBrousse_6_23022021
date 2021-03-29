import Photographer from "../entity/Photographer";
import Media from "../entity/Media";

class Factory {
  createPhotographer = (data) => new Photographer(data);
  
  createMedia = (data, type) => {
    switch (type) {
      case "image":
        return new Media(data, type);
      case "video":
        return new Media(data, type);
      default:
        break;
    }
  };
}

export default Factory;
