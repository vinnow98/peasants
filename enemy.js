let countDownState = false;
//this makes it easier to increase the difficulty of soldiers overtime.
let minSoldiers = 1;
let maxSoldiers = 3;

//random gives me a random number of soldiers
let randomGeneratedEnemies = () => {
  var random =
    Math.floor(Math.random() * (maxSoldiers - minSoldiers + 1)) + minSoldiers;
  return random;
};
let enemySoldierCount = randomGeneratedEnemies();

let nextEnemyAttack = () => {
  var random = Math.floor(Math.random() * (120 - 60 + 1)) + 30;
  return random;
};

function countDown(num) {
  if (countDownState) return;
  countDownState = true;
  enemySoldierCount = randomGeneratedEnemies();
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
  console.log(enemySoldierCount);
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
      countDown(nextEnemyAttack());
    } else if (soldiers < 0) {
      alert("you died");
      clearInterval(timer);
    }
  }, 500);
}
