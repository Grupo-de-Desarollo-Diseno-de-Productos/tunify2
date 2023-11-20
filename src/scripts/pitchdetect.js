function pitchi() {
  console.log("Pitch detection started!");
  document.addEventListener('DOMContentLoaded', () => {
    // Check for Web Audio API support
    const AudioContext = getAudioContext();
    console.log(AudioContext);
    if (!AudioContext) {
      alert('Web Audio API is not supported in this browser');
      return;
    }

    const audioContext = new AudioContext();

    // Request access to the microphone
    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        // Create an audio input from the microphone
        const microphone = audioContext.createMediaStreamSource(stream);

        // Create a pitch detector using the 'pitchfinder' library
        const pitchDetector = new Pitchfinder.YIN({ sampleRate: audioContext.sampleRate });

        // Connect the microphone to the pitch detector
        microphone.connect(audioContext.destination);

        // Process the audio stream
        const processAudio = () => {
          const bufferLength = 2048; // Adjust this based on your needs
          const audioBuffer = new Float32Array(bufferLength);

          const analyser = audioContext.createAnalyser();
          microphone.connect(analyser);
          analyser.getFloatTimeDomainData(audioBuffer);

          const pitch = pitchDetector.findPitch(audioBuffer);
          const note = pitch ? getNoteName(pitch) : 'No note detected';

          console.log('Detected note:', note);

          // You can perform further actions with the detected note here

          requestAnimationFrame(processAudio);
        };

        // Start processing the audio stream
        processAudio();
      })
      .catch((error) => {
        console.error('Error accessing the microphone:', error);
      });

    // Helper function to get the note name from the frequency
    const getNoteName = (frequency) => {
      const noteNames = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

      const noteIndex = Math.round(12 * Math.log2(frequency / 440) + 9);
      const octave = Math.floor(noteIndex / 12);
      const noteName = noteNames[noteIndex % 12];

      return `${noteName}${octave}`;
    };
  });
}