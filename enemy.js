let countDownState = false;
//this makes it easier to increase the difficulty of soldiers overtime.
let minSoldiers = 1;
let maxSoldiers = 3;

//random gives me a random number of soldiers

let enemySoldierCount = 0;

function randomGeneratedNumber(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}
function countDown(num, enemy) {
  if (countDownState) return;
  countDownState = true;
  document.getElementById("enemySoldiers").style.visibility = "visible";
  document.querySelector("#noOfSoldiers").textContent = enemy;
  enemySoldierCount = enemy;
  countDownTimer = setInterval(() => {
    num--;
    pauseButton.disabled = false;
    document.querySelector("#countDown").textContent = num;
    //this is for the pause function
    pauseTimer = num;

    if (num == 0) {
      pauseButton.disabled = true;
      fight();
      clearInterval(countDownTimer);
    }
  }, 1000);
  if (!intervalIds.includes(countDownTimer)) {
    intervalIds.push(countDownTimer);
  }
}

function fight() {
  let fightTimer = setInterval(() => {
    soldiers--;
    enemySoldierCount--;
    document.querySelector("#noOfSoldiers").textContent = enemySoldierCount;
    refresh();
    if (soldiers < 0) {
      clearInterval(fightTimer);
      youDied();
    } else if (enemySoldierCount == 0) {
      clearInterval(fightTimer);
      minSoldiers++;
      maxSoldiers++;
      countDownState = false;
      countDown(
        randomGeneratedNumber(45, 65),
        randomGeneratedNumber(minSoldiers, maxSoldiers)
      );
    }
  }, 500);
}
