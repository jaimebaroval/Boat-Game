class Parachute {
    constructor(ctx, parachutesPos) {
        this._ctx = ctx
        this.parachutesPos = parachutesPos
        this.x = 0
        this.y = 0

        this._paraW = PARACHUTEWIDTH
        this._paraH = PARACHUTEHEIGHT

        this.safeMode = '#000000'
        this.safePar = false

        this._img = new Image()
        this._img.src = './images/parachute-sprite.png'
        this._img.frameIndex = 0
        this._img.frames = 4

        this._imgL2 = new Image()
        this._imgL2.src = './images/parachute-sprite-2.png'
        this._imgL2.frameIndex = 0
        this._imgL2.frames = 4



        this.vy = Math.random() * (2 - 1.2) + 1.2
    }

    draw(level) {
        this.x = this.parachutesPos + 65
        if (level === 1) {
            this._ctx.drawImage(
                this._img,
                this._img.frameIndex * this._paraW,
                0,
                this._paraW,
                this._paraH,
                this.x,
                this.y - 70,
                this._paraW,
                this._paraH
            )
        }
        if (level === 2) {
            this._ctx.drawImage(
                this._imgL2,
                this._imgL2.frameIndex * this._paraW,
                0,
                this._paraW,
                this._paraH,
                this.x,
                this.y - 70,
                this._paraW,
                this._paraH
            )
        }

    }

    move() {

        if (this.y < 160) {
            this.y += this.vy * 2
        } else {
            this.y += this.vy / 1.8
        }

        this.aninmateSprite()

    }

    isVisible() {
        // return this.y < this._ctx.canvas.height
        if (this.y < this._ctx.canvas.height) {
            return true
        } else {
            this.gameOver()
        }
    }

    onSafePosition() {
        return this.y < this._ctx.canvas.height - BOATHEIGHT - 50
    }

    parachutePostion() {
        //TODO: Recorer array de parachutes. En Brigade??
    }

    aninmateSprite() {

        if (this.y > 0) {
            this._img.frameIndex = 1
        }
        if (this.y > 40) {
            this._img.frameIndex = 2
        }
        if (this.y > 110) {
            this._img.frameIndex = 3
        }
        if (this.y > 120) {
            this._img.frameIndex = 4
        }
        if (this.y > 130) {
            this._img.frameIndex = 5
        }

    }

    gameOver() {

        return true

        // const gameOver = document.getElementById('game-over')

        // gameOver.innerHTML = '<h1>Game Over</h1>'
        // alert('game over')
    }
}