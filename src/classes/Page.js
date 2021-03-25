import Orm from "./Orm"
import Render from "./Render"
class Page {
    constructor() {
        this.orm = new Orm();
        this.render = Render.injectHtml
    }
}

export default Page;