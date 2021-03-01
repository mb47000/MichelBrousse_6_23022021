import Photographer from './Photographer';

class Factory {
    createPhotographer = data => new Photographer(data);
}

export default Factory;