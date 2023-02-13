let totalSlaves = document.querySelector("#totalSlaves");
let totalPeasants = document.querySelector("#totalPeasants");
let totalSoldiers = document.querySelector("#totalSoldiers");
let totalPopulation = document.querySelector(".totalPopulation");
let totalSouls = document.querySelector("#totalSouls");

gold = 10000;
slaves = 180;
costOfSlave = 10;
peasants = 10;
costOfPeasant = 100;
soldiers = 5;
costofSoldier = 1000;
population = 0;
maxPopulation = 200;
souls = 0;

totalSlaves.textContent = slaves;
totalPeasants.textContent = peasants;
totalSoldiers.textContent = soldiers;

setInterval(() => {
  gold += slaves;
  gold -= peasants;
  gold -= soldiers * 5;
  totalGold();
}, 1000);

//Punishment if negative gold!
setInterval(() => {
  if (gold < 0) {
    if (peasants > 1 || soldiers > 1) {
      console.log("Punishment!!");
      var randomDeath = Math.floor(Math.random() * 2);
      if (randomDeath == 0) {
        peasants--;
        if (peasants == 0) {
          soldiers--;
        }
      } else {
        soldiers--;
        if (soldiers == 0) {
          peasants--;
        }
      }
    }
    if (peasants == 0 && soldiers == 0) {
      slaves--;
    }
  }
  totalSlaves.textContent = slaves;
  totalPeasants.textContent = peasants;
  totalSoldiers.textContent = soldiers;
}, 5000);

function totalGold() {
  let totalGold = document.querySelector("#totalGold");
  totalGold.textContent = gold;
  if (gold > 50) {
    showSlaves = document.querySelector("#slaveSection");
    showSlaves.style.visibility = "visible";
  }
  if (slaves > 50) {
    showPeasants = document.querySelector("#peasantSection");
    showPeasants.style.visibility = "visible";
  }
  if (peasants > 50) {
    showSoldiers = document.querySelector("#soldierSection");
    showSoldiers.style.visibility = "visible";
  }
}

function earn1Gold() {
  gold++;
  totalGold();
}

function buySlave() {
  if (gold < costOfSlave) {
    return;
  }
  gold -= costOfSlave;
  totalGold();
  slaves++;
  totalSlaves.textContent = slaves;
  showPopulation();
}

function buyPeasant() {
  if (gold < costOfPeasant || slaves < 1) {
    return;
  }
  gold -= costOfPeasant;
  totalGold();
  slaves--;
  totalSlaves.textContent = slaves;

  peasants++;
  totalPeasants.textContent = peasants;
  showPopulation();
}

function buySoldier() {
  if (gold < costofSoldier || peasants < 3) {
    return;
  }
  gold -= costofSoldier;
  totalGold();
  peasants -= 3;
  totalPeasants.textContent = peasants;

  soldiers++;
  totalSoldiers.textContent = soldiers;
  showPopulation();
}

function showPopulation() {
  population = slaves + peasants + soldiers;
  if (population >= maxPopulation) {
    document.getElementById("buySlave").disabled = true;
  } else {
    document.getElementById("buySlave").disabled = false;
  }
  totalPopulation.textContent = `${population}/${maxPopulation}`;
}

function sacrifice() {
  peasants--;
  totalPeasants.textContent = peasants;
  souls++;
  showPopulation();
  totalSouls.textContent = souls;
}
