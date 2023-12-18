const animalSizes = ["small", "medium", "large"];
const animalsAnimations = ["move", "circle", "jump", "shake", "disappear"];

class SecondLevel {
    stage = 0;
    currentLocationsIndex = [];
    playedLocationsIndex = [];
    locations = levels[1].locations;
    task = levels[1].task;
    placedAnimalsCount = 0;

    increasePlacedAnimalsCount() {
        this.placedAnimalsCount++;
    }

    initStage() {
        this.currentLocationsIndex = [];
        this.placedAnimalsCount = 0;

        let randIndex = Math.floor(Math.random() * this.locations.length);
        while (this.currentLocationsIndex.length !== 2) {
            if (!this.playedLocationsIndex.includes(randIndex)) {
                this.currentLocationsIndex.push(randIndex);
                this.playedLocationsIndex.push(randIndex);
            }
            randIndex = Math.floor(Math.random() * this.locations.length);
        }

        this.stage++;
    }

    initGameField() {
        const taskTitleElement = document.querySelector(".level-title");

        taskTitleElement.innerHTML = this.task;

        const gameField = document.querySelector("[data-game-field]");

        gameField.innerHTML = `
          <div class="second-level-field">
            <div class="locations-wrapper">
              <div class="location" data-location="${
                  this.currentLocationsIndex[0]
              }">
                <img class="location-img" src="./img/levels/second-level/${
                    this.locations[this.currentLocationsIndex[0]].locationSrc
                }" alt="location" />
              </div>
              <div class="location" data-location="${
                  this.currentLocationsIndex[1]
              }">
                <img class="location-img" src="./img/levels/second-level/${
                    this.locations[this.currentLocationsIndex[1]].locationSrc
                }" alt="location" />
              </div>
            </div>
          </div>
        `;

        this.placeImages();
    }

    placeImages() {
        const fieldElement = document.querySelector(".second-level-field");

        this.currentLocationsIndex.forEach((locationIndex) => {
            this.locations[locationIndex].animals.forEach((animalSrc) => {
                const randClassNameIndex = Math.floor(
                    Math.random() * itemsSizes.length
                );
                const sizeClassName = `second-level-animal--${animalSizes[randClassNameIndex]}`;

                const randAnimationIndex = Math.floor(
                    Math.random() * animalsAnimations.length
                );
                const animationClassName = `second-level-animal--${animalsAnimations[randAnimationIndex]}`;

                const img = document.createElement("img");

                img.src = `./img/levels/second-level/${animalSrc}`;

                img.className = `second-level-animal ${sizeClassName} ${animationClassName}`;

                img.draggable = "true";

                img.style.left = `${
                    Math.random() * fieldElement.clientWidth
                }px`;
                img.style.top = `${
                    Math.random() * fieldElement.clientHeight
                }px`;

                img.setAttribute("data-location", locationIndex);

                fieldElement.appendChild(img);
            });
        });
    }

    checkComplete() {
        return this.placedAnimalsCount === 6;
    }
}
