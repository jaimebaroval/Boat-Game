class Plane {
    constructor(ctx) {
        this._ctx = ctx
        this.tick = 0

        this.cW = this._ctx.canvas.width
        this.cH = this._ctx.canvas.height

        this._x = this.cW
        this._y = 20

        this._pW = PLANEWIDTH
        this._pH = PLANEHEIGHT


        this._vx = -4

        this.img = new Image()
        this.img.src = './images/plane.png'
        this.img.frameIndex = 0
        this.img.frames = 4

        this.brigade = new Brigade(ctx)


    }

    draw(score) {
        this._ctx.drawImage(
            this.img,
            this.img.frameIndex * this._pW,
            0,
            this._pW,
            this._pH,
            this._x,
            this._y,
            this._pW,
            this._pH
        )

        this._animateSprite()

        // this.brigade.clearParachutes()
        this.brigade.draw(this._x, score)
    }

    move() {
        this._x += this._vx
        if (this._x < 0 - this.img.width / this.img.frames) {
            this._x = this.cW
            this.brigade.parachutesPosition()
        }
    }

    _animateSprite() {
        if (this.tick++ >= 1) {
            this.tick = 0

            if (this.img.frameIndex++ >= (this.img.frames - 1)) {
                this.img.frameIndex = 0
            }
        }
    }

    // planePosition() {
    //     return this._x
    // }

    safeParachute() {
        return this.brigade.parachutesArray
    }

    clearSafeParachutes() {
        return this.brigade
    }

    gameOver() {
        return this.brigade
    }
}