class Media {
    constructor({id, photographerId, image = null, video = null, tags, likes, date, price}, type) {
        this.type = type
        this.id = id;
        this.photographerId = photographerId;
        this.image = image;
        this.video = video;
        this.tags = tags;
        this.likes = likes;
        this.date = date;
        this.price = price;
    }
}

export default Media;