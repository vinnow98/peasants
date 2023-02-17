let totalSlaves = document.querySelector("#totalSlaves");
let totalPeasants = document.querySelector("#totalPeasants");
let totalSoldiers = document.querySelector("#totalSoldiers");
let totalPopulation = document.querySelector(".totalPopulation");
let totalSouls = document.querySelector("#totalSouls");

gold = 0;
wood = 0;
slaves = 0;
costOfSlave = 20;
peasants = 0;
costOfPeasant = 200;
soldiers = 0;
costofSoldier = 1000;
population = 0;
maxPopulation = 100;
showPopulation();
refresh();

//until I can find a better way to refresh on var change.... this will have to do
function refresh() {
  totalSlaves.textContent = slaves;
  totalPeasants.textContent = peasants;
  totalSoldiers.textContent = soldiers;
  showPopulation();
}

//gold per "day"
setInterval(() => {
  gold += slaves * 2;
  wood += peasants;
  gold -= peasants;
  gold -= soldiers * 5;
  totalGold();
  totalWood();
}, 1100);

//Punishment if negative gold!
setInterval(() => {
  if (gold < 0) {
    if (peasants > 1 || soldiers > 1) {
      console.log("Punishment!!");
      let randomDeath = Math.floor(Math.random() * 2);
      if (randomDeath == 0) {
        if (!peasants) {
          soldiers--;
        } else {
          peasants--;
        }
      } else {
        if (!soldiers) {
          peasants--;
        } else {
          soldiers--;
        }
      }
    }
    if (!peasants && !soldiers) {
      slaves--;
    }

    if (gold < -1000) {
      youDied();
    }
    refresh();
  }
}, 5000);

function totalGold() {
  let totalGold = document.querySelector("#totalGold");
  totalGold.textContent = gold;
  if (gold > 100) {
    showSlaves = document.querySelector("#slaveSection");
    showSlaves.style.visibility = "visible";
    //this starts the first wave of enemies
    countDown(90);
  }
}

function earn1Gold() {
  gold++;
  totalGold();
  if (labourClicks == 100 && !achievedLabour) {
    alert("You have laboured well.");
    achievedLabour = true;
    document.querySelector(".labour").style.opacity = 1;
    document
      .getElementById("sacrificeOptions")
      .querySelector(`option[value="labour"]`)
      .remove();
    reachedNirvana();
  }
}

function sell1Wood() {
  if (!wood) return;
  wood -= 1;
  gold += 5;
  totalGold();
  totalWood();
}

function sellAllWood() {
  gold = gold + wood;
  wood = 0;
  totalGold();
  totalWood();
}
function totalWood() {
  document.querySelector("#totalWood").textContent = wood;
}
function buySlave() {
  if (gold < costOfSlave) {
    return;
  }
  gold -= costOfSlave;
  totalGold();
  slaves++;
  document.querySelector("#populationSection").style.visibility = "visible";
  if (slaves > 25) {
    showPeasants = document.querySelector("#peasantSection");
    showPeasants.style.visibility = "visible";
  }
  refresh();
  showPopulation();
}

function buyPeasant() {
  if (gold < costOfPeasant || slaves < 1) return;

  gold -= costOfPeasant;
  totalGold();
  slaves--;
  refresh();
  document.querySelector("#woodSection").style.visibility = "visible";
  peasants++;
  if (peasants > 5) {
    showSoldiers = document.querySelector("#soldierSection");
    showSoldiers.style.visibility = "visible";
  }
  refresh();
  showPopulation();
  goodBehaviour();
}

function buySoldier() {
  if (gold < costofSoldier || peasants < 3) return;

  gold -= costofSoldier;
  totalGold();
  peasants -= 3;
  totalPeasants.textContent = peasants;

  soldiers++;
  refresh();
  showPopulation();
  goodBehaviour();
  if (soldiers > 5) {
    document.querySelector("#sacrificeSection").style.visibility = "visible";
  }
}

function showPopulation() {
  updatePopulation();
  toggleBuyingSlaves();
  updateSufferingWinCon();
}

function updatePopulation() {
  population = slaves + peasants + soldiers;
  totalPopulation.textContent = `${population}/${maxPopulation}`;
}

function toggleBuyingSlaves() {
  if (population >= maxPopulation) {
    document.getElementById("buySlave").disabled = true;
    document.getElementById("addPopulation").style.visibility = "visible";
  } else {
    document.getElementById("buySlave").disabled = false;
  }
}

function updateSufferingWinCon() {
  if (population == 300 && sufferingWinCon == true && timeWinCon == true) {
    document.getElementById("suffering").style.visibility = "visible";
  } else {
    document.getElementById("suffering").style.visibility = "hidden";
  }
}
function addPopulation() {
  if (gold < 1001 || wood < 1001) return;
  maxPopulation += 100;
  gold -= 1000;
  wood -= 1000;
  totalGold();
  totalWood();
  updatePopulation();

  if (maxPopulation == 300) {
    document.getElementById("addPopulation").disabled = true;
  }
}

function youDied() {
  alert("You Died.");
  location.reload();
}