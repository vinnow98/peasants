achievedSuffering = false;
achievedMeditation = false;
achievedLabour = false;
labourClicks = 0;
achievedGoodBehaviour = false;
reachingNirvarna = setTimeout(activateNirvana, 100000);

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
