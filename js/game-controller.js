const urlParams = new URLSearchParams(window.location.search);
const username = urlParams.get("username");

const game = new Game();

initGame();

function initGame() {
    const firstLevel = new FirstLevel();
    const secondLevel = new SecondLevel();
    const thirdLevel = new ThirdLevel();

    initFirstLevel(firstLevel, () =>
        initSecondLevel(secondLevel, () => initThirdLevel(thirdLevel))
    );

    // initSecondLevel(secondLevel, () => initThirdLevel());

    // initThirdLevel(thirdLevel);
}

function initFirstLevel(firstLevel, initSecondLevel) {
    let interval = setInterval(() => {
        game.increaseTime();
        game.displayGameParams();
    }, 1000);

    firstLevel.initStage();
    firstLevel.initGameField();

    const images = document.querySelectorAll("[data-img-stage]");

    images.forEach((img) => {
        img.addEventListener("click", (event) => {
            event.target.style.display = "none";

            const isStageCompleted = firstLevel.checkComplete();

            if (isStageCompleted && firstLevel.playedStages.length !== 3) {
                clearInterval(interval);

                game.resetTime();
                game.increaseScore();
                game.displayGameParams();

                game.displayStageResult(false);

                const nextButtonElement =
                    document.querySelector("[data-next-button]");

                nextButtonElement.addEventListener("click", () => {
                    initFirstLevel(firstLevel, initSecondLevel);
                });
            } else if (
                isStageCompleted &&
                firstLevel.playedStages.length === 3
            ) {
                clearInterval(interval);

                game.resetTime();
                game.increaseScore();
                game.displayGameParams();

                game.displayStageResult(true);

                const nextButtonElement =
                    document.querySelector("[data-next-button]");

                nextButtonElement.addEventListener("click", () => {
                    game.increaseLevel();
                    initSecondLevel();
                });
            }
        });
    });
}

function initSecondLevel(secondLevel, initThirdLevel) {
    const interval = setInterval(() => {
        game.increaseTime();
        game.displayGameParams();
    }, 1000);

    secondLevel.initStage();
    secondLevel.initGameField();

    const animalsElements = document.querySelectorAll(".second-level-animal");
    animalsElements.forEach((animal) => {
        animal.addEventListener("dragstart", startDragging);
        animal.addEventListener("dragend", stopDragging);
    });

    const locationsContainers = document.querySelectorAll("[data-location]");
    locationsContainers.forEach((location) => {
        location.addEventListener("dragover", (e) => e.preventDefault());
        location.addEventListener("drop", dropToLocation);
    });

    function dropToLocation(event) {
        event.preventDefault();

        const locationContainer = event.target.closest("div[data-location]");
        const animal = document.querySelector("[data-dragging]");

        if (!locationContainer || !animal) {
            return;
        }

        const locationValue = locationContainer.dataset.location;
        const animalLocationValue = animal.dataset.location;

        if (locationValue !== animalLocationValue) {
            return;
        }

        const clonedAnimal = animal.cloneNode(true);
        clonedAnimal.removeAttribute("data-dragging");

        const leftPosition = event.offsetX - animal.width / 2 + "px";
        const topPosition = event.offsetY - animal.height / 2 + "px";

        clonedAnimal.style.left = leftPosition;
        clonedAnimal.style.top = topPosition;
        clonedAnimal.setAttribute("draggable", "false");

        clonedAnimal.className = `second-level-animal--disabled ${
            animal.className.split(" ")[1]
        }`;

        locationContainer.appendChild(clonedAnimal);

        animal.remove();

        secondLevel.increasePlacedAnimalsCount();

        if (secondLevel.checkComplete()) {
            if (secondLevel.stage === 3) {
                clearInterval(interval);

                game.resetTime();
                game.increaseScore();
                game.displayGameParams();

                game.displayStageResult(true);

                const nextButtonElement =
                    document.querySelector("[data-next-button]");

                nextButtonElement.addEventListener("click", () => {
                    game.increaseLevel();
                    initThirdLevel();
                });
            } else {
                clearInterval(interval);

                game.resetTime();
                game.increaseScore();
                game.displayGameParams();

                game.displayStageResult(false);

                const nextButtonElement =
                    document.querySelector("[data-next-button]");

                nextButtonElement.addEventListener("click", () => {
                    initSecondLevel(secondLevel, initThirdLevel);
                });
            }
        }
    }

    function startDragging(event) {
        const animalElement = event.target;
        animalElement.setAttribute("data-dragging", "true");
    }

    function stopDragging(event) {
        const animalElement = event.target;
        animalElement.removeAttribute("data-dragging");
    }
}

function initThirdLevel(thirdLevel) {
    const interval = setInterval(() => {
        game.increaseTime();
        game.displayGameParams();
    }, 1000);

    thirdLevel.initStage();
    thirdLevel.initGameField();

    const words = document.querySelectorAll(".word");

    words.forEach((word) => {
        word.addEventListener("dragstart", startDragging);
        word.addEventListener("dragend", stopDragging);
    });

    const wordsContainer = document.querySelector("[data-words-container]");
    wordsContainer.addEventListener("dragover", (e) => e.preventDefault());
    wordsContainer.addEventListener("drop", dropToContainer);

    function dropToContainer(event) {
        event.preventDefault();

        const wordsContainer = event.target.closest("[data-words-container]");
        const word = document.querySelector("[data-dragging]");

        if (!wordsContainer || !word || !word.dataset.correct) {
            return;
        }

        const clonedWord = word.cloneNode(true);
        clonedWord.removeAttribute("data-dragging");

        clonedWord.setAttribute("draggable", "false");

        clonedWord.className = "word word--disabled";

        wordsContainer.appendChild(clonedWord);

        word.remove();

        const isStageCompleted = thirdLevel.checkComplete();

        if (isStageCompleted && thirdLevel.playedStages.length !== 3) {
            clearInterval(interval);

            game.resetTime();
            game.increaseScore();
            game.displayGameParams();

            game.displayStageResult(false);

            const nextButtonElement =
                document.querySelector("[data-next-button]");

            nextButtonElement.addEventListener("click", () => {
                initThirdLevel(thirdLevel);
            });
        } else if (isStageCompleted && thirdLevel.playedStages.length === 3) {
            clearInterval(interval);

            game.resetTime();
            game.increaseScore();
            game.displayGameParams();

            const storage = new GameStorage();
            storage.saveResult({
                date: game.startDate,
                duration: game.totalTime,
                score: game.score,
                username,
            });

            game.showGameResult(storage.getResults());
        }
    }

    function startDragging(event) {
        const animalElement = event.target;
        animalElement.setAttribute("data-dragging", "true");
    }

    function stopDragging(event) {
        const animalElement = event.target;
        animalElement.removeAttribute("data-dragging");
    }
}
