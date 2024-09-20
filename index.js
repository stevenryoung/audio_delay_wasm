import init, { AudioDelay } from './pkg/audio_delay_wasm.js';

let audioDelay;

async function run() {
    await init();
    audioDelay = new AudioDelay();

    const startButton = document.getElementById('startButton');
    const stopButton = document.getElementById('stopButton');
    const delaySlider = document.getElementById('delaySlider');
    // const volumeSlider = document.getElementById('volumeSlider');
    const delayValue = document.getElementById('delayValue');
    // const volumeValue = document.getElementById('volumeValue');

    startButton.addEventListener('click', startAudio);
    stopButton.addEventListener('click', stopAudio);
    delaySlider.addEventListener('input', updateDelay);
    // volumeSlider.addEventListener('input', updateVolume);
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    function updateDelay() {
        const delay = parseFloat(delaySlider.value);
        audioDelay.set_delay(delay, stream);
        delayValue.textContent = delay.toFixed(1);
    }

    // function updateVolume() {
    //     const volume = parseFloat(volumeSlider.value);
    //     audioDelay.set_volume(volume);
    //     volumeValue.textContent = volume.toFixed(1);
    // }
}

async function startAudio() {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        audioDelay.start(stream);
    } catch (err) {
        console.error('Error accessing microphone:', err);
    }
}

function stopAudio() {
    audioDelay.stop();
}

run();