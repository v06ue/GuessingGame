class GameStorage {
    saveResult({ date, duration, username, score }) {
        const results = this.getResults();

        results.push({
            date,
            score,
            username,
            duration,
        });

        localStorage.setItem("quest-rating", JSON.stringify(results));
    }

    getResults() {
        return JSON.parse(localStorage.getItem("quest-rating")) ?? [];
    }

    displayResults() {
        const tbodyElement = document.querySelector("tbody");

        const results = this.getResults();

        const sortedResults = results.sort((a, b) => a.duration - b.duration);

        sortedResults.forEach(({ date, score, duration, username }, index) => {
            const resultElement = `
            <tr>
              <td>${index + 1}</td>
              <td>${username}</td>
              <td>${date}</td>
              <td>${duration}</td>
              <td>${score}</td>
              </tr>
            `;

            tbodyElement.innerHTML += resultElement;
        });
    }
}
