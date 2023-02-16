achievedSuffering = false;
achievedMeditation = false;
achievedLabour = false;
labourClicks = 0;
achievedGoodBehaviour = false;
sufferingWinCon = false;
wincon1 = false;
wincon2 = false;
reachingNirvarna = setTimeout(activateNirvana, 100000);

function activateNirvana() {
  wincon1 = true;
  if (!wincon1 || !wincon2) return;
  console.log("Nirvana activated");
  meditation();
  labour();
  sufferingWinCon = true;
  document.querySelector("#nirvanaSection").style.visibility = "visible";
}

function suffering() {
  if (!sufferingWinCon) return;
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
  setTimeout(sacrificeResultOriginal, 3000);
}

function hints(hint) {
  document.querySelector("#sacrificeSuccess").style.visibility = "hidden";
  switch (hint) {
    case "suffering":
      sacrificeResult.textContent =
        "Only in sacrificing all things will you bless the thing you love.";
      break;
    case "meditation":
      sacrificeResult.textContent =
        "Learning to really be still and let life happen: that stillness becomes a radiance.";
      break;
    case "labour":
      sacrificeResult.textContent =
        "It is only through your own labour that we move on to better things";
      break;
    case "goodBehaviour":
      sacrificeResult.textContent = "All workers deserve a fair wage.";
      break;
  }
  wincon2 = true;
  activateNirvana();
  delaySacrificeResultOriginal();
}

function winTheGame() {
  window.location.href =
    "https://www.youtube.com/watch?v=dQw4w9WgXcQ&ab_channel=RickAstley";
}
