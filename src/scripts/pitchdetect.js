/**
 * 
 * PITCH DETECT
 * 
 */


// An array of strings that represents the names of musical notes
var noteStrings = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Variables for audio processing
let mic, soundFile, fft, audioContext, amplitude;

// URL of the machine learning model used to detect pitch
const model_url = 'https://cdn.jsdelivr.net/gh/ml5js/ml5-data-and-models/models/pitch-detection/crepe/';

// Ratio between the frequency of a note and the frequency of the note one semitone lower
const keyRatio = 0.58;

// Array of note names in the chromatic scale
const scalege = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Name of the current note being played
let currentNote = '';

// Sets up the audio input stream and starts the pitch detection process
function setup() {
  audioContext = getAudioContext();
  mic = new p5.AudioIn();
  mic.start(startPitch);
  amplitude = new p5.Amplitude();
  amplitude.setInput(mic);
}

// Callback function that is called when the machine learning model has finished loading
function modelLoaded() {
  getPitch();
}

// Recursive function that uses the machine learning model to detect the pitch of the audio input stream
async function getPitch() {
  pitch.getPitch(function (err, frequency) {
    if (frequency && parseFloat(pitch.results.confidence) > 0.825) {
      let midiNum = freqToMidi(frequency);
      let note = noteStrings[midiNum % 12];
      let octave = Math.floor(midiNum / 12) - 1;
      currentNote = note + octave;
      console.log("note: " + currentNote + " goal: " + currentNotes[pos]);
      console.log("Confidance " + pitch.results.confidence);
      if (!paused) {
        // search for the html element with id "current-note" and set its text to the current note
        document.getElementById("current-note").innerHTML = "Current note: " + currentNote;

        // search for the html element with id "target-note" and set its text to the current note
        document.getElementById("target-note").innerHTML = "Target note: " + currentNotes[pos];
      }
      comparePitch();
    }
    getPitch();
  })
}

// Initializes the machine learning model and starts the pitch detection process
function startPitch() {
  pitch = ml5.pitchDetection(model_url, audioContext, mic.stream, modelLoaded);
}

// Utility function that returns a promise that resolves after a specified number of milliseconds
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function comparePitch() {

  if (currentNote == currentNotes[pos] && !paused) {
    pos++;
    if (pos == currentNotes.length) {
      pos = 0;
    }
    noteImages.forEach((image, index) => {
      if (index <= pos) {
        image.style.opacity = "1";
        image.style.filter = "hue-rotate(90deg)";
        // make the image geenish


        tabImages[index].style.opacity = "1";
      } else {
        image.style.opacity = "0.25";
        tabImages[index].style.opacity = "0.25";
      }
    });
  }
}