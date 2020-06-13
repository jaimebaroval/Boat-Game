class Boat {
    constructor(ctx) {
        this._ctx = ctx
        this._tick = 0

        this.x = 0
        this.y = PARACHUTEHEIGHT

        this._bW = BOATWIDTH
        this._bH = BOATHEIGHT

        this.cW = CANVASWIDTH
        this.cH = CANVASHEIGHT

        this._img = new Image()
        this._img.src = "./images/sprite-boat.png"
        this._img.frameIndex = 1
        this._img.frames = 2

        this.ax = 0

        this.vel = 5

        this.actions = {
            right: false,
            left: false,
            up: false,
            down: false
        }

        this._setListeners()
    }

    draw() {

        this._ctx.drawImage(
            this._img,
            this._img.frameIndex * this._bW,
            0,
            this._bW,
            this._bH,
            this.x,
            this.cH - this._bH,
            this._bW,
            this._bH
        )
    }

    move() {

        this.x += this.ax
        this._setActions()

        if (this.x <= 0) {
            this.x = 0
        }
        if (this.x >= CANVASWIDTH - BOATWIDTH) {
            this.x = CANVASWIDTH - BOATWIDTH
        }
        // console.log(this.x, this.x + this._bW);
    }

    _setListeners() {
        document.addEventListener('keydown', e => {
            this._switchActions(e.keyCode, true)
        })

        document.addEventListener('keyup', e => {
            this._switchActions(e.keyCode, false)

        })
    }

    _switchActions(key, action) {
        switch (key) {
            case UP:
                this.actions.up = action
                break;
            case LEFT:
                this.actions.left = action
                this._img.frameIndex = 0
                break;
            case RIGHT:
                this.actions.right = action
                this._img.frameIndex = 1
                break;
        }
    }

    _setActions() {
        if (this.actions.right) {
            this.ax = this.vel
        } else if (this.actions.left) {
            this.ax = -this.vel
        } else {
            this.ax = 0
        }
    }

    _isCollition(parachute) {
        const colX = this.x + this._bW - 30 > parachute.x && this.x - 40 < parachute.x
        const colY = this.cH - BOATHEIGHT - 50 < parachute.y && this.cH - BOATHEIGHT - 50 < parachute.y

        // console.log(this.cH < parachute.y);

        return colX && colY

    }
}