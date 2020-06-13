class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.intervalId = null;
        this.tick = 0

        this.background = new Background(ctx)
        this.boat = new Boat(ctx)
        this.plane = new Plane(ctx)

        this.score = 0



        this.safeParachutes = []

    }

    start() {
        this._intervalId = setInterval(() => {
            this._clear()
            this._draw()
            this._move()
            this._safeParachute()
        }, 1000 / 60)
    }

    _draw() {
        this.background.draw()
        this.boat.draw()
        this.plane.draw(this.score)
        // this.parachute.draw(this.plane.planePosition())

    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    _move() {
        this.boat.move()
        this.plane.move()
        // this.parachute.move()
    }

    _safeParachute() {
        const scoreCount = document.getElementById('score-count')
        const safeParachutes = this.plane.clearSafeParachutes()

        if (this._isOnBoat()) {
            this.score++
            safeParachutes.clearSafeParachutes()
            scoreCount.innerText = this.score
            // return true
        } else {
            safeParachutes.clearParachutes()
            // if (this.plane.gameOver()) {
            // if (this.plane.gameOver()) {
            this._gameOver()
            // }
            // }
        }
        console.log(this.score);


    }

    _isOnBoat() {
        const parachutes = this.plane.safeParachute()
        return parachutes.some(parachute => this.boat._isCollition(parachute))

    }

    // _putArray(parachute) {
    //     if (parachute.safePar) {
    //         this.safeParachutes.push(parachute)
    //     }
    //     this.safeParachutes.filter((item, index) => {
    //         // console.log(item, index, this.safeParachutes.indexOf(item), this.safeParachutes.indexOf(item) === index)
    //         return this.safeParachutes.indexOf(item) === index
    //     })
    // }

    _gameOver() {
        const gameOver = this.plane.gameOver()
        // console.log(this.plane.gameOver());

        if (gameOver.gameOver()) {
            clearInterval(this._intervalId)
            const modalBody = document.getElementById('modal-body')
            const imgModal = document.getElementById('img-modal')
            const buttonRestart = document.getElementById('modal-footer')

            modalBody.style.padding = '0px'
            modalBody.innerHTML = '<img id="img-modal" src="./images/game-over.jpg">'
            buttonRestart.innerHTML = `<button type="button" class="btn btn-primary btn-lg" data-dismiss="modal"
            aria-label="Close" id="restart">RESTART!</button>
            <button type="button" class="btn btn-primary btn-lg" 
             id="hall">TA'S HALL OF FAME</button>
            <p id="score-modal">Saved Iron Hackers: <strong>${this.score}</strong></p>`
            $('#exampleModal').modal('show');

            if (this.score != 0) {
                bestScores.push(this.score)
                localStorage.setItem("score", JSON.stringify(this.bestScores));
            }

            document.getElementById('restart').onclick = () => {
                onLoad()
            };

            document.getElementById('hall').onclick = () => {
                hallOfFame()
            };

        }
    }
}