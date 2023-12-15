class Game {
    level = 0;
    score = 0;
    time = 0;
    totalTime = 0;
    startDate = new Date().toLocaleDateString();

    increaseTime() {
        this.time++;
    }

    resetTime() {
        this.totalTime += this.time;
        this.time = 0;
    }

    increaseLevel() {
        this.level++;
    }

    increaseScore() {
        if (this.level === 0) {
            this.score += 2;
        }
        if (this.level === 1) {
            this.score += 5;
        }
        if (this.level === 2) {
            this.score += 10;
        }
    }

    displayGameParams() {
        const scoreContainer = document.querySelector("[data-score]");
        const timeContainer = document.querySelector("[data-time]");

        scoreContainer.innerHTML = this.score;
        timeContainer.innerHTML = this.time;
    }

    displayStageResult(isLevelFinished) {
        const gameFieldElement = document.querySelector("[data-game-field]");

        if (isLevelFinished) {
            gameFieldElement.innerHTML = `
              <div class="alert">
                <div class="stage-result-title">Уровень пройден</div>
                <button class="next-level-button" type="button" data-next-button>К следующему уровню</button>
                </div>
                `;
        } else {
            gameFieldElement.innerHTML = `
              <div class="alert">
                <div class="stage-result-title">Этап пройден</div>
                <button class="next-level-button" type="button" data-next-button>К следующему этапу</button>
              </div>
            `;
        }
    }

    showGameResult() {
        const pageContainer = document.querySelector(".page");

        pageContainer.innerHTML = `
        <div class="game-result-container">
            <div class="game-result-alert">
                <h2 class="game-result-title">Игра завершена</h2>
                <div class="game-result-wrapper">
                    <div class="game-result-text">
                        Время прохождения: <span data-result-time>${this.totalTime} сек</span>
                    </div>
                    <div class="game-result-text">
                        Количество очков: <span data-result-score>${this.score}</span>
                    </div>
                </div>
            </div>
            <a class="next-level-button rating-link" href="./rating.html">Рейтинг игроков</a>
            <a class="start-link rating-start-link" href="./index">Пройти заново</a>
            <div></div>
        </div>
        `;
    }
}
