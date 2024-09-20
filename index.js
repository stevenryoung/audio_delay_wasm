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
    // const stream = await navigator.mediaDevices.getDisplayMedia({ 
    //     video: true, 
    //     audio: true,
    // });

    function updateDelay() {
        const delay = parseFloat(delaySlider.value);
        audioDelay.set_delay(delay);
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
        const stream = await navigator.mediaDevices.getDisplayMedia({ 
            video: true, 
            audio: true,
        });
        const audioTracks = stream.getAudioTracks();
        if (audioTracks.length > 0) {
            const audioStream = new MediaStream([audioTracks[0]]);
            audioDelay.start(audioStream);
        } else {
            console.error('No audio track found in the captured stream.');
        }
    } catch (err) {
        console.error('Error accessing tab audio:', err);
    }
}

function stopAudio() {
    audioDelay.stop();
}

run();