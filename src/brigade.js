class Brigade {
    constructor(ctx) {
        this._ctx = ctx

        this.parachutesPos = []
        this.numParachutes = 5

        this.parachutesArray = []
        this.safePosArray = []

        this.gameOverTest = false

        this.parachutesPosition()

        this.jump = new Audio('http://blauquark.com/boat-game/audio/jump.mp3')

    }

    draw(planePos, score) {
        this.planePosition = planePos

        this.parachutesPos.forEach(e => {

            if (Number(this.planePosition) === e) {
                this.parachutesArray.push(new Parachute(this._ctx, this.planePosition))
                this.jump.play()

            }

        })

        this.parachutesArray.forEach(p => {
            if (score < 5) {
                p.draw(1)
            } else {
                p.draw(1)
            }
            p.move()

        })

    }

    clearParachutes() {
        this.gameOver()
        this.parachutesArray = this.parachutesArray.filter(p => p.isVisible())
    }

    clearSafeParachutes() {
        this.parachutesArray = this.parachutesArray.filter(p => p.onSafePosition())
    }

    parachutesPosition() {
        this.parachutesPos = []
        let pos = 0
        for (let p = 0; p < this.numParachutes; p++) {
            pos = Number((Math.random() * 1000 - 100).toFixed(0))
            if (pos % 2 === 0) {
                this.parachutesPos.push(pos)
            } else {
                this.parachutesPos.push(pos + 1)
            }
        }
    }

    onSafePositionPar() {
        this.parachutesArray.forEach(p => {
            if (p.onSafePosition()) {
                p.safeMode = 'transparent'
                p.onSafePos = true
            }

            return p.onSafePos
        })
    }

    gameOver() {
        this.parachutesArray.forEach(p => {
            if (p.y >= CANVASHEIGHT) {
                this.gameOverTest = true
            }
        })

        return this.gameOverTest
    }
}