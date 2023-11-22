
// Create info
const notes = new Map();
const tabs = new Map();
const notesList = ["A2", "B3", "E2", "E4", "G3", "D3"];

// Add key-value pairs to the hash map
notes.set("A2", "music/A2.png");
notes.set("B3", "music/B3.png");
notes.set("E2", "music/E2.png");
notes.set("E4", "music/E4.png");
notes.set("G3", "music/G3.png");
notes.set("D3", "music/D3.png");

tabs.set("A2", "music/A2TAB.png");
tabs.set("B3", "music/B3TAB.png");
tabs.set("E2", "music/E2TAB.png");
tabs.set("E4", "music/E4TAB.png");
tabs.set("G3", "music/G3TAB.png");
tabs.set("D3", "music/D3TAB.png");

const noteImages = document.querySelectorAll('.note1, .note2, .note3, .note4, .note5, .note6, .note7, .note8, .note9');
const tabImages = document.querySelectorAll('.tab1, .tab2, .tab3, .tab4, .tab5, .tab6, .tab7, .tab8, .tab9');

let pos = -1;
let currentNotes = [];

// Get the start button element
const startButton = document.querySelector('.start-button');

let paused = true;
startButton.addEventListener('click', () => {
    if (paused) {
        startButton.textContent = "End";
        startButton.classList.add("end-button");
        paused = false;
        pos = 0;
        noteImages.forEach((image, index) => {
            let randomNote;
            do {
                randomNote = notesList[Math.floor(Math.random() * notesList.length)];
            } while (index > 0 && randomNote === currentNotes[index - 1]);

            image.src = notes.get(randomNote);
            tabImages[index].src = tabs.get(randomNote);
            currentNotes.push(randomNote);
        });
        noteImages.forEach((image, index) => {
            if (index == pos) {
                image.style.opacity = "1";
                tabImages[index].style.opacity = "1";
            } else {
                image.style.opacity = "0.3";
                tabImages[index].style.opacity = "0.3";
            }
        }
        );


        // search for the html element with id "target-note" and set its text to the current note
        document.getElementById("target-note").innerHTML = "Target note: " + currentNotes[pos];

    } else {
        currentNotes = [];
        pos = -1;
        startButton.textContent = "Start";
        // search for the html element with id "current-note" and set its text to the current note
        document.getElementById("current-note").innerHTML = "";
        // search for the html element with id "target-note" and set its text to the current note
        document.getElementById("target-note").innerHTML = "";
        startButton.style.transform = "scale(1.5)";
        paused = true;
        noteImages.forEach((image) => {
            image.src = "music/blank.png";
            image.style.opacity = "1";
        });
        tabImages.forEach((image) => {
            image.src = "music/blankTAB.png";
            image.style.opacity = "1";
        });
    }
});

function comparePitch() {
    if (currentNote == currentNotes[pos] && !paused) {
        perfecto();
        pos++;
        if (pos == currentNotes.length) {
            pos = 0;
        }
        noteImages.forEach((image, index) => {
            if (index <= pos) {
                image.style.opacity = "1";
                tabImages[index].style.opacity = "1";
            } else {
                image.style.opacity = "0.3";
                tabImages[index].style.opacity = "0.3";
            }
        });
    }
}


function hide() {
    var x = document.getElementById("sliders");
    var y = document.getElementById("jeff");
    if (x.style.display === "none") {
      x.style.display = "flex";
      x.style.width = "25%";
      y.style.width = "75%"
    } else {
      x.style.display = "none";
      x.style.width = "0%";
      y.style.width = "100%"
    }
  }
