const btnStart = document.querySelector(".submit");
const enteredCash = document.querySelector(".entryStake");
const reset = document.querySelector(".reset");

class Wallet {
  constructor() {
    let _remainingCash = 500;

    this.matchWonBest = (enteredCash) => {
      _remainingCash = _remainingCash + enteredCash * 10;
    };
    this.matchWonSimple = (enteredCash) => {
      _remainingCash = _remainingCash + enteredCash * 3;
    };
    this.matchLost = (enteredCash) => {
      _remainingCash = _remainingCash - enteredCash;
    };
    this.currentCash = () => _remainingCash;
  }
}
class Stats {
  static matches = 0;
  static wins = 0;
  static loses = 0;
  constructor() {
    this.matches = 0;
    this.wins = 0;
    this.loses = 0;
  }
  statUpdateMatch() {
    this.matches = ++Stats.matches;
    document.querySelector("li:nth-child(1) span").innerHTML = this.matches;
  }
  statUpdateWin() {
    this.wins = ++Stats.wins;
    document.querySelector("li:nth-child(2) span").innerHTML = this.wins;
  }
  statUpdateLost() {
    this.loses = ++Stats.loses;
    document.querySelector("li:nth-child(3) span").innerHTML = this.loses;
  }
}

const pageRefresh = () => {
  window.location.reload();
};
class Game extends Wallet {
  constructor() {
    super();
    const stats = new Stats();
    btnStart.addEventListener("click", (e) => {
      e.preventDefault();
      if (enteredCash.value > 0) {
        this.render(enteredCash.value);
      } else {
        enteredCash.classList.add("wrongValue");
        return;
      }
    });
    this.render = (enteredCash) => {
      let drawnColors = [];
      for (let squareIndex = 1; squareIndex < 4; squareIndex++) {
        this.square = document.querySelector(".rol" + squareIndex);

        this.random = Math.floor(Math.random() * 3);
        drawnColors.push(this.random);
        this.color = this.random;

        if (this.color == 0) {
          this.square.style.backgroundColor = "green";
        }
        if (this.color == 1) {
          this.square.style.backgroundColor = "red";
        }
        if (this.color == 2) {
          this.square.style.backgroundColor = "blue";
        }
      }

      if (
        drawnColors[0] == drawnColors[1] &&
        drawnColors[1] == drawnColors[2]
      ) {
        this.matchWonBest(enteredCash);
        stats.statUpdateMatch();
        stats.statUpdateWin();
      } else if (
        drawnColors[0] != drawnColors[1] &&
        drawnColors[1] != drawnColors[2] &&
        drawnColors[0] != drawnColors[2]
      ) {
        this.matchWonSimple(enteredCash);
        stats.statUpdateMatch();
        stats.statUpdateWin();
      } else {
        this.matchLost(enteredCash);
        stats.statUpdateMatch();
        stats.statUpdateLost();
      }

      document.querySelector(".cashAmount").textContent = this.currentCash();
      if (this.currentCash() < 0) {
        document.querySelector(".cashAmount").style.color = "red";

        document.querySelector(".blurLayer").style.zIndex = "0";
        document.querySelector(".loseSpace").style.display = "block";
      }
    };
  }
}
enteredCash.addEventListener("keyup", () => {
  if (enteredCash.value > 0) {
    enteredCash.classList.remove("wrongValue");
  } else {
    return;
  }
});
reset.addEventListener("click", pageRefresh);

const gameStart = new Game();
