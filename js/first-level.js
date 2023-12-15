const itemsSizes = ["small", "medium", "large"];
const imagesAnimations = ["move", "circle", "jump", "shake", "disappear"];

class FirstLevel {
    stage;
    playedStages = [];

    initStage() {
        const stages = levels[0].stages;

        let randIndex = Math.floor(Math.random() * stages.length);
        while (this.playedStages.includes(randIndex)) {
            randIndex = Math.floor(Math.random() * stages.length);
        }

        this.playedStages.push(randIndex);
        this.stage = stages[randIndex];

        return this.stage;
    }

    initGameField() {
        const gameField = document.querySelector("[data-game-field]");
        gameField.innerHTML = `
          <div class="first-level-field"></div>
        `;

        const taskTitleElement = document.querySelector(".level-title");

        taskTitleElement.innerHTML = this.stage.task;

        this.placeImages();
    }

    placeImages() {
        const fieldElement = document.querySelector(".first-level-field");
        levels[0].stages.forEach(({ stage, items }) => {
            items.forEach((imgName) => {
                const img = document.createElement("img");

                const randClassNameIndex = Math.floor(
                    Math.random() * itemsSizes.length
                );
                const sizeClassName = `first-level-animal--${itemsSizes[randClassNameIndex]}`;

                const randAnimationIndex = Math.floor(
                    Math.random() * imagesAnimations.length
                );
                const animationClassName = `first-level-animal--${imagesAnimations[randAnimationIndex]}`;

                img.className = `first-level-animal ${sizeClassName} ${animationClassName}`;

                img.src = `./img/levels/first-level/${imgName}.png`;

                img.style.left = `${
                    Math.random() * fieldElement.clientWidth
                }px`;

                img.style.top = `${
                    Math.random() * fieldElement.clientHeight
                }px`;

                img.style.transform = `rotate(${Math.floor(
                    Math.random() * 360
                )}deg)`;

                if (stage === this.stage.stage) {
                    img.setAttribute("data-img-stage", stage);
                }

                fieldElement.appendChild(img);
            });
        });
    }

    checkComplete() {
        const imgs = document.querySelectorAll(
            `[data-img-stage="${this.stage.stage}"]`
        );

        const visibleImgs = Array.from(imgs).filter(
            (img) => img.style.display !== "none"
        );

        return visibleImgs.length === 0;
    }
}
