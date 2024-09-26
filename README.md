# Audio Delay WASM
Browser based solution for delaying audio stream. Example usage is to delay a stream from a radio station sports broadcast to sync with a video of the game.

See demo at [https://stevenryoung.com/audio_delay_wasm/](https://stevenryoung.com/audio_delay_wasm/)

# Build and run locally
To build and run locally, you will need to have `webasm-pack` installed. You can install it with `cargo` by running `cargo install webasm-pack`. You will also need to have `python3` installed to run a local server. Once you have these installed, run the following commands in the root directory of the project:

```
webasm-pack build --target web
python3 -m http.server
```

Then navigate to [http://localhost:8000](http://localhost:8000)

# Acknowledgements
Made using Gitlab Duo and Github Copilot AI code assistants.

# License
See LICENSE file
