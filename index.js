let totalSlaves = document.querySelector("#totalSlaves");
let totalPeasants = document.querySelector("#totalPeasants");
let totalSoldiers = document.querySelector("#totalSoldiers");
let totalPopulation = document.querySelector(".totalPopulation");
let totalSouls = document.querySelector("#totalSouls");

gold = 100000;
slaves = 300;
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

//nirvanaSection
achievedSuffering = false;
achievedMeditation = false;
achievedLabour = false;
labourClicks = 0;
achievedGoodBehaviour = false;
reachingNirvarna = setTimeout(activateNirvana, 10000);

//until I can find a better way to refresh on var change.... this will have to do
function refresh() {
  totalSlaves.textContent = slaves;
  totalPeasants.textContent = peasants;
  totalSoldiers.textContent = soldiers;
  showPopulation();
}

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
  if (slaves > 50) {
    showPeasants = document.querySelector("#peasantSection");
    showPeasants.style.visibility = "visible";
  }
  if (peasants > 10) {
    showSoldiers = document.querySelector("#soldierSection");
    showSoldiers.style.visibility = "visible";
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
  totalSlaves.textContent = slaves;

  peasants++;
  totalPeasants.textContent = peasants;
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
  totalSoldiers.textContent = soldiers;
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

function activateNirvana() {
  console.log("Nirvana activated");
  meditation();
  labour();
}

function suffering() {
  slaves = 0;
  peasants = 0;
  soldiers = 0;
  refresh();
  document.querySelector("#suffering").style.visibility = "hidden";
  document.querySelector(".suffering").style.opacity = 1;
  achievedSuffering = true;
  reachedNirvana();
}

var meditationTimeout = false;
function meditation() {
  clearTimeout(meditationTimeout);
  meditationTimeout = setTimeout(function () {
    alert("You have meditated sufficiently.");
    achievedMeditation = true;
    document.querySelector(".meditation").style.opacity = 1;
    document.removeEventListener("keydown", meditation);
    document.removeEventListener("mousedown", meditation);
    document.removeEventListener("mousemove", meditation);
    reachedNirvana();
  }, 5000);
  document.addEventListener("keydown", meditation);
  document.addEventListener("mousedown", meditation);
  document.addEventListener("mousemove", meditation);
}

labourTimeout = false;
function labour() {
  document.getElementById("earn1Gold").addEventListener("click", () => {
    labourClicks++;
    console.log(labourClicks);
    clearTimeout(labourTimeout);
    labourTimeout = setTimeout(() => {
      labourClicks = 0;
    }, 2000);
  });
}

function goodBehaviour() {
  if (!slaves && peasants && soldiers && !achievedGoodBehaviour) {
    alert("You have paid all your workers fairly.");
    document.querySelector(".goodBehaviour").style.opacity = 1;
    achievedGoodBehaviour = true;
  }
  reachedNirvana();
}

function reachedNirvana() {
  if (
    achievedGoodBehaviour &&
    achievedLabour &&
    achievedMeditation &&
    achievedSuffering
  ) {
    document.querySelector("#reachedNirvana").disabled = false;
  }
}

function winTheGame() {
  alert("you won");
}
