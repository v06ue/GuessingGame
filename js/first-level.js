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

        const images = [];
        const imgsPlaces = [];

        const randAnswersCount = Math.floor(Math.random() * 3) + 1;

        const shuffledTaskItems = this.shuffle(
            levels[0].stages[this.stage.stage].taskItems
        );
        const shuffledFakeItems = this.shuffle(levels[0].items);

        for (let i = 0; i < randAnswersCount; i++) {
            images.push(shuffledTaskItems[i]);
        }

        const restCount = 12 - images.length;

        for (let i = 0; i < restCount; i++) {
            images.push(shuffledFakeItems[i]);
        }

        images.forEach((imgName, index) => {
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

            let top = Math.random() * fieldElement.clientHeight;
            let left = Math.random() * fieldElement.clientWidth;

            if (imgsPlaces.length > 0) {
                let isPlaced = false;
                while (!isPlaced) {
                    top = Math.random() * fieldElement.clientHeight;
                    left = Math.random() * fieldElement.clientWidth;
                    for (let i = 0; i < imgsPlaces.length; i++) {
                        const point = imgsPlaces[i];
                        if (
                            !(
                                Math.abs(point.top - top) > 150 ||
                                Math.abs(point.left - left) > 150
                            )
                        ) {
                            break;
                        }

                        if (i === imgsPlaces.length - 1) {
                            isPlaced = true;
                        }
                    }
                }
            }

            imgsPlaces.push({ top, left });

            img.style.top = `${top}px`;
            img.style.left = `${left}px`;

            img.style.transform = `rotate(${Math.floor(
                Math.random() * 360
            )}deg)`;

            if (index < randAnswersCount) {
                img.setAttribute("data-img-stage", this.stage.stage);
            }

            fieldElement.appendChild(img);
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

    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }
}
