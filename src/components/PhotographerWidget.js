class PhotographerWidget {
    static getHtml = (likes, price) => {
        return (`<div class="photographer-widget">
        <span class="photographer-widget__likes-wrap">
            <p class="photographer-widget__likes-count">${likes}<i class="fas fa-heart photographer-widget__likes-button" aria-hidden="true" tabindex="0"></i></p>
        </span>
        <span class="photographer-widget__price-wrap">${price}€ / jour</span>
    </div>`)
    }
}

export default PhotographerWidget;