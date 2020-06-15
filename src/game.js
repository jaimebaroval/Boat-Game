class Game {
    constructor(ctx) {
        this.ctx = ctx
        this.intervalId = null;
        this.tick = 0

        this.background = new Background(ctx)
        this.boat = new Boat(ctx)
        this.plane = new Plane(ctx)

        this.score = 0

        this.startMusic = new Audio('http://blauquark.com/boat-game/audio/game-pokemon.mp3')
        this.gameOver = new Audio('http://blauquark.com/boat-game/audio/gameover.mp3')
        this.onBoat = new Audio('http://blauquark.com/boat-game/audio/safe.mp3')



        this.safeParachutes = []

    }

    start() {
        this.gameOver.pause()
        this.startMusic.play()
        this.startMusic.loop = true

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

    }

    _clear() {
        this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height)
    }

    _move() {
        this.boat.move()
        this.plane.move()
    }

    _safeParachute() {
        const scoreCount = document.getElementById('score-count')
        const safeParachutes = this.plane.clearSafeParachutes()

        if (this._isOnBoat()) {
            this.score++
            this.onBoat.pause()
            this.onBoat.play()
            safeParachutes.clearSafeParachutes()
            scoreCount.innerText = this.score
        } else {
            safeParachutes.clearParachutes()
            this._gameOver()
        }

    }

    _isOnBoat() {
        const parachutes = this.plane.safeParachute()
        return parachutes.some(parachute => this.boat._isCollition(parachute))

    }

    _musicOn() {
        this.startMusic.play()
    }

    _gameOver() {
        const gameOver = this.plane.gameOver()

        if (gameOver.gameOver()) {
            clearInterval(this._intervalId)
            this.startMusic.pause()
            this.gameOver.play()
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
                // bestScores.filter((item, index) => bestScores.indexOf(item) !== index)
                localStorage.setItem("score", JSON.stringify(this.bestScores));
            }

            document.getElementById('restart').onclick = () => {
                this.gameOver.pause()
                onLoad()
            };

            document.getElementById('hall').onclick = () => {
                hallOfFame()
            };

        }
    }
}