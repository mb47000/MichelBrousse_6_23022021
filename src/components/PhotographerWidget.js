class PhotographerWidget {
    static getHtml = (likes, price) => {
        return (`<div class="photographer-widget" aria-label=”Widget photographe”>
        <span class="photographer-widget__likes-wrap">
            <p class="photographer-widget__likes-count">${likes} <span class="sr-only">j'aime</span><span class="fas fa-heart photographer-widget__likes-button" aria-hidden="true"></span></p>
        </span>
        <span class="photographer-widget__price-wrap">${price}€ / jour</span>
    </div>`)
    }
}

export default PhotographerWidget;