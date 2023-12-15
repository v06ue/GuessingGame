class ThirdLevel {
    stage;
    playedStages = [];
    task = levels[2].task;
    wordsSets = levels[2].wordsSets;

    initStage() {
        let randIndex = Math.floor(Math.random() * this.wordsSets.length);
        while (this.playedStages.includes(randIndex)) {
            randIndex = Math.floor(Math.random() * this.wordsSets.length);
        }

        this.playedStages.push(randIndex);
        this.stage = this.wordsSets[randIndex];

        return this.stage;
    }

    initGameField() {
        const gameField = document.querySelector("[data-game-field]");
        gameField.innerHTML = `
          <div class="third-level-field">
            <div class="words-wrapper"></div>
            <div class="words-container" data-words-container>
              <span class="words-container-label">Контейнер</span>
            </div>
          </div>
        `;

        const taskTitleElement = document.querySelector(".level-title");

        taskTitleElement.innerHTML = this.task;

        this.placeWords();
    }

    placeWords() {
        const wordsWrapper = document.querySelector(".words-wrapper");

        const correctWords = this.stage.correctWords;
        const fakeWords = this.stage.fakeWords;

        const shuffledWords = [...correctWords, ...fakeWords].sort(
            () => Math.random() - 0.5
        );

        shuffledWords.forEach((word) => {
            const wordElement = document.createElement("div");
            wordElement.innerText = word;
            wordElement.className = "word";
            wordElement.draggable = "true";
            if (correctWords.includes(word)) {
                wordElement.setAttribute("data-correct", "true");
            }
            wordsWrapper.appendChild(wordElement);
        });
    }

    checkComplete() {
        const wordsContainer = document.querySelector("[data-words-container]");
        const correctWords = wordsContainer.querySelectorAll("[data-correct]");
        return correctWords.length === 5;
    }
}
