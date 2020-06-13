let bestScores = []

window.onload = () => {

    $('#exampleModal').modal('show');

    document.getElementById('start-button').onclick = () => {
        onLoad()
    };
}

function onLoad() {
    const scoreCount = document.getElementById('score-count')
    // const scoreLocal = document.getElementById('score-local')
    scoreCount.innerText = '0'

    let scoreLocalItem = localStorage.getItem("score");
    // if (scoreLocalItem != null) {
    //     // bestScores.push(scoreLocalItem)
    //     scoreLocal.innerText = bestScores
    // }

    const canvas = document.getElementById("canvas")
    const ctx = canvas.getContext("2d")

    const game = new Game(ctx)

    game.start()


}

function hallOfFame() {
    const modalBody = document.getElementById('modal-body')

    modalBody.innerHTML = ''
    modalBody.style.height = '800px'
    modalBody.style.backgroundImage = 'url(./images/hall-of-fame.jpg)'
    modalBody.style.padding = '280px 40px 0'

    bestScores.sort(function (a, b) {
        return b - a;
    });

    bestScores.forEach((b, idx) => {
        let bestScoreRow = document.createElement('p.scoreListClass')
        bestScoreRow.classList.add('score-list')
        bestScoreRow.innerHTML = `<p class="score-pos"><strong>${idx + 1}</strong> <span class="score-list">............................................................. ${b}</span></p>`
        modalBody.appendChild(bestScoreRow)
    })
}



