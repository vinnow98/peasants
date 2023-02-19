achievedSuffering = false;
achievedMeditation = false;
achievedLabour = false;
labourClicks = 0;
achievedGoodBehaviour = false;
sufferingWinCon = false;
goodBehaviourWinCon = false;
labourWinCon = false;
meditationWinCon = false;
timeWinCon = false;
setTimeout(timeToWin, 600000);

function timeToWin() {
  console.log("timeToWin activated");
  timeWinCon = true;
  activateNirvana();
}

function activateNirvana() {
  if (
    (sufferingWinCon ||
      goodBehaviourWinCon ||
      labourWinCon ||
      meditationWinCon) &&
    timeWinCon == true
  ) {
    console.log("Nirvana activated");
    labour();
    goodBehaviour();
    meditation();
    document.querySelector("#nirvanaSection").style.visibility = "visible";
  }
}

function suffering() {
  slaves = 0;
  peasants = 0;
  soldiers = 0;
  refresh();
  document.querySelector(".suffering").style.opacity = 1;
  achievedSuffering = true;
  document
    .getElementById("sacrificeOptions")
    .querySelector(`option[value="suffering"]`)
    .remove();
  reachedNirvana();
}

var meditationTimeout = false;
function meditation() {
  if (!timeWinCon) return;
  clearTimeout(meditationTimeout);
  meditationTimeout = setTimeout(function () {
    alert("You have meditated sufficiently.");
    achievedMeditation = true;
    document.querySelector(".meditation").style.opacity = 1;
    document.removeEventListener("keydown", meditation);
    document.removeEventListener("mousedown", meditation);
    document.removeEventListener("mousemove", meditation);
    document
      .getElementById("sacrificeOptions")
      .querySelector(`option[value="meditation"]`)
      .remove();
    reachedNirvana();
  }, 60000);
  document.addEventListener("keydown", meditation);
  document.addEventListener("mousedown", meditation);
  document.addEventListener("mousemove", meditation);
}

labourTimeout = false;
function labour() {
  if (!timeWinCon) return;
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
  if (
    !slaves &&
    peasants &&
    soldiers &&
    !achievedGoodBehaviour &&
    goodBehaviourWinCon &&
    timeWinCon
  ) {
    alert("You have paid all your workers fairly.");
    document.querySelector(".goodBehaviour").style.opacity = 1;
    document
      .getElementById("sacrificeOptions")
      .querySelector(`option[value="goodBehaviour"]`)
      .remove();
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
sacrificeResult = document.querySelector("#sacrificeResult");
let originalTextCooldown = false;
let originalText = sacrificeResult.textContent;

function sacrifice() {
  if (!soldiers || originalTextCooldown == true) return;
  sacrificeResult.textContent = "......";
  originalTextCooldown = true;
  soldiers--;
  refresh();
  showPopulation();
  setTimeout(() => {
    var random = Math.floor(Math.random() * 5) + 1;
    switch (random) {
      case 1:
        sacrificeResult.textContent =
          "They saw the truth... but could not bring themselves to tell it to you.";
        break;
      case 2:
        sacrificeResult.textContent = "They failed.";
        break;
      case 3:
        sacrificeResult.textContent = `Samantabhadra's voice boomed: "You dare to speak to me?"`;
        break;
      case 4:
        sacrificeResult.textContent =
          "The soldier took this opportunity to defect.";

        break;
      case 5:
        sacrificeResult.textContent = "";
        document.querySelector("#sacrificeSuccess").style.visibility =
          "visible";
        document.getElementById("sacrificeOptions").selectedIndex = 0;
    }
    if (random <= 4) {
      delaySacrificeResultOriginal();
    }
  }, 3000);
}

function sacrificeResultOriginal() {
  sacrificeResult.textContent = originalText;
  originalTextCooldown = false;
}

function delaySacrificeResultOriginal() {
  setTimeout(sacrificeResultOriginal, 5000);
}

let firstHintSuffering = false;
let firstHintMeditation = false;
let firstHintLabour = false;
let firstHintGoodBehaviour = false;

function hints(hint) {
  document.querySelector("#sacrificeSuccess").style.visibility = "hidden";
  switch (hint) {
    case "suffering":
      if (!firstHintSuffering) {
        sacrificeResult.textContent =
          "Only in sacrificing all things will you bless the thing you love.";
        document
          .getElementById("sacrificeOptions")
          .querySelector(`option[value="suffering"]`).textContent =
          "Suffering(2)";
        firstHintSuffering = true;
        sufferingWinCon = true;
        break;
      } else {
        sacrificeResult.textContent =
          "To experience suffering, sacrifice a population of 300";
        timeWinCon = true;
        break;
      }

    case "meditation":
      if (!firstHintMeditation) {
        sacrificeResult.textContent =
          "Learning to really be still and let life happen: that stillness becomes a radiance.";
        document
          .getElementById("sacrificeOptions")
          .querySelector(`option[value="meditation"]`).textContent =
          "Meditation(2)";
        firstHintMeditation = true;
        meditationWinCon = true;
        meditation();
        break;
      } else {
        sacrificeResult.textContent = "Do not touch anything for 1 minute.";
        timeWinCon = true;
        break;
      }
    case "labour":
      if (!firstHintLabour) {
        sacrificeResult.textContent =
          "It is only through your own labour that we move on to better things.";
        document
          .getElementById("sacrificeOptions")
          .querySelector(`option[value="labour"]`).textContent = "Labour(2)";
        firstHintLabour = true;
        labourWinCon = true;
        labour();
        break;
      } else {
        sacrificeResult.textContent = "Click 'Earn 1 gold' 100 times in a row.";
        timeWinCon = true;
        break;
      }
    case "goodBehaviour":
      if (!firstHintGoodBehaviour) {
        sacrificeResult.textContent = "All workers deserve a fair wage.";
        document
          .getElementById("sacrificeOptions")
          .querySelector(`option[value="goodBehaviour"]`).textContent =
          "Good Behaviour(2)";
        firstHintGoodBehaviour = true;
        goodBehaviourWinCon = true;
        break;
      } else {
        sacrificeResult.textContent =
          "Do not own any slaves while owning peasants and soldiers.";
        timeWinCon = true;
        break;
      }
  }
  activateNirvana();
  delaySacrificeResultOriginal();
}

function winTheGame() {
  window.location.href =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
}
