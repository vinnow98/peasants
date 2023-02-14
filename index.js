let totalSlaves = document.querySelector("#totalSlaves");
let totalPeasants = document.querySelector("#totalPeasants");
let totalSoldiers = document.querySelector("#totalSoldiers");
let totalPopulation = document.querySelector(".totalPopulation");
let totalSouls = document.querySelector("#totalSouls");

gold = 0;
slaves = 0;
costOfSlave = 20;
peasants = 0;
costOfPeasant = 200;
soldiers = 0;
costofSoldier = 2000;
population = 0;
maxPopulation = 200;
showPopulation();
souls = 0;
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
  gold += slaves;
  gold -= peasants;
  gold -= soldiers * 5;
  totalGold();
}, 1100);

//Punishment if negative gold!
setInterval(() => {
  if (gold < 0) {
    if (peasants > 1 || soldiers > 1) {
      console.log("Punishment!!");
      var randomDeath = Math.floor(Math.random() * 2);
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
      alert("you died");
    }
    refresh();
  }
}, 5000);

function totalGold() {
  let totalGold = document.querySelector("#totalGold");
  totalGold.textContent = gold;
  if (gold > 50) {
    showSlaves = document.querySelector("#slaveSection");
    showSlaves.style.visibility = "visible";
  }
}

function earn1Gold() {
  gold++;
  totalGold();
  if (labourClicks == 20 && !achievedLabour) {
    alert("You have laboured well.");
    achievedLabour = true;
    document.querySelector(".labour").style.opacity = 1;
    reachedNirvana();
  }
}

function buySlave() {
  if (gold < costOfSlave) {
    return;
  }
  gold -= costOfSlave;
  totalGold();
  slaves++;
  if (slaves > 50) {
    showPeasants = document.querySelector("#peasantSection");
    showPeasants.style.visibility = "visible";
  }
  refresh();
  showPopulation();
}

function buyPeasant() {
  if (gold < costOfPeasant || slaves < 1) {
    return;
  }
  gold -= costOfPeasant;
  totalGold();
  slaves--;
  refresh();

  peasants++;
  if (peasants > 10) {
    showSoldiers = document.querySelector("#soldierSection");
    showSoldiers.style.visibility = "visible";
    //this starts the first wave of enemies
    countDown(30);
  }
  refresh();
  showPopulation();
  goodBehaviour();
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
  refresh();
  showPopulation();
  goodBehaviour();
}

function showPopulation() {
  population = slaves + peasants + soldiers;
  if (population >= maxPopulation) {
    document.getElementById("buySlave").disabled = true;
    document.getElementById("addPopulation").style.visibility = "visible";
  } else {
    document.getElementById("buySlave").disabled = false;
  }
  totalPopulation.textContent = `${population}/${maxPopulation}`;

  if (population == 300) {
    document.getElementById("suffering").style.visibility = "visible";
  } else {
    document.getElementById("suffering").style.visibility = "hidden";
  }
}

function addPopulation() {
  document.getElementById("addPopulation").disabled = true;
  maxPopulation += 100;
  showPopulation();
}

function sacrifice() {
  if (!soldiers) return;
  soldiers--;
  totalSoldiers.textContent = soldiers;
  souls++;
  showPopulation();
  totalSouls.textContent = souls;
}

