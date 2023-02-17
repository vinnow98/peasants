let countDownState = false;
//this makes it easier to increase the difficulty of soldiers overtime.
let minSoldiers = 1;
let maxSoldiers = 3;

//random gives me a random number of soldiers

let enemySoldierCount = null;

function randomGeneratedNumber(min, max) {
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
}
function countDown(num) {
  if (countDownState) return;
  document.getElementById("enemySoldiers").style.visibility = "visible";
  countDownState = true;
  enemySoldierCount = randomGeneratedNumber(minSoldiers, maxSoldiers);
  document.querySelector("#noOfSoldiers").textContent = enemySoldierCount;
  timer = setInterval(() => {
    num--;
    document.querySelector("#countDown").textContent = num;

    if (num == 0) {
      fight();
      clearInterval(timer);
    }
  }, 1000);
}

function fight() {
  let timer = setInterval(() => {
    soldiers--;
    enemySoldierCount--;
    document.querySelector("#noOfSoldiers").textContent = enemySoldierCount;
    refresh();
    if (enemySoldierCount == 0) {
      clearInterval(timer);
      minSoldiers++;
      maxSoldiers++;
      countDownState = false;
      countDown(randomGeneratedNumber(45, 65));
    } else if (soldiers < 0) {
      clearInterval(timer);
      youDied();
    }
  }, 500);
}
