"use strict";
const reportAcudits = [];
fetch('https://api.open-meteo.com/v1/forecast?latitude=41.39&longitude=2.16&hourly=temperature_2m&current_weather=true').then(response => response.json()).then(data => {
    const temperature = document.getElementById("temperature");
    temperature.innerHTML = data.current_weather.temperature + " °C";
    if (data.current_weather.weathercode < 10) {
        const result = document.getElementById("sun");
        result.style.display = "block";
    }
    else if (data.current_weather.weathercode > 10 && data.current_weather.weathercode < 90) {
        const result = document.getElementById("rain");
        result.style.display = "block";
    }
    else {
        const result = document.getElementById("wind");
        result.style.display = "block";
    }
});
function createjoke() {
    const container = document.getElementById("container");
    changeclass();
    function changeclass() {
        if (container.className == "container") {
            container.className = "container1";
        }
        else if (container.className == "container1") {
            container.className = "container2";
        }
        else if (container.className == "container2") {
            container.className = "container";
        }
    }
    const displayScore1 = document.getElementById("score1");
    displayScore1.style.display = "inline-block";
    const displayScore2 = document.getElementById("score2");
    displayScore2.style.display = "inline-block";
    const displayScore3 = document.getElementById("score3");
    displayScore3.style.display = "inline-block";
    let x = Math.floor(Math.random() * 11);
    let joke = "";
    if (x <= 5) {
        fetch('https://icanhazdadjoke.com/', {
            headers: {
                'Accept': 'application/json'
            }
        })
            .then(response => response.json()).then(data => {
            const randomJoke = document.getElementById("randomjoke");
            randomJoke.innerHTML = data.joke;
            joke = data.joke;
            return joke;
            ;
        });
    }
    else if (x > 5) {
        fetch('https://api.chucknorris.io/jokes/random')
            .then(response => response.json()).then(data => {
            const randomJoke = document.getElementById("randomjoke");
            randomJoke.innerHTML = data.value;
            joke = data.value;
            return joke;
        });
    }
    let scoreValue = 0;
    let clicked = false;
    const score1 = document.getElementById("score1");
    score1.addEventListener('click', () => {
        let score = document.getElementById("score1").value;
        scoreValue = parseInt(score);
        clicked = false;
        addArray(scoreValue, clicked, joke);
    });
    const score2 = document.getElementById("score2");
    score2.addEventListener('click', () => {
        let score = document.getElementById("score2").value;
        scoreValue = parseInt(score);
        clicked = false;
        addArray(scoreValue, clicked, joke);
    });
    const score3 = document.getElementById("score3");
    score3.addEventListener('click', () => {
        let score = document.getElementById("score3").value;
        scoreValue = parseInt(score);
        clicked = false;
        addArray(scoreValue, clicked, joke);
    });
    const button = document.getElementById("button");
    button.addEventListener('click', () => {
        clicked = true;
        addArray(scoreValue, clicked, joke);
    });
}
function addArray(scoreValue, clicked, joke) {
    let joker = joke;
    let lastValue = scoreValue;
    const d = new Date();
    let dateToday = d.toISOString();
    if (reportAcudits.filter(element => element.joke == joke).length > 0) {
        return reportAcudits;
    }
    if (clicked == true && lastValue > 0) {
        const rating = {
            joke: joker,
            score: lastValue,
            date: dateToday
        };
        reportAcudits.push(rating);
        console.log(reportAcudits);
        return reportAcudits;
    }
}
