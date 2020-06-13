class Background {
    constructor(ctx) {
        this._ctx = ctx

        this._cW = CANVASWIDTH
        this._cH = CANVASHEIGHT

        this.img = new Image()
        this.img.src = './images/background.jpg'

    }

    draw() {
        this._ctx.drawImage(this.img, 0, 0)
    }
}