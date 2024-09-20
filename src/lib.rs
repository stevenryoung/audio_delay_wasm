use wasm_bindgen::prelude::*;
use web_sys::{AudioContext, DelayNode, MediaStream, MediaStreamAudioSourceNode};

#[wasm_bindgen]
pub struct AudioDelay {
    context: AudioContext,
    delay_node: DelayNode,
    source_node: Option<MediaStreamAudioSourceNode>,
}

#[wasm_bindgen]
impl AudioDelay {
    #[wasm_bindgen(constructor)]
    pub fn new() -> Result<AudioDelay, JsValue> {
        let context = AudioContext::new()?;
        let delay_node = context.create_delay_with_max_delay_time(10.0)?;
        delay_node.connect_with_audio_node(&context.destination())?;

        Ok(AudioDelay {
            context,
            delay_node,
            source_node: None,
        })
    }

    #[wasm_bindgen]
    pub fn set_delay(&self, seconds: f64, stream: MediaStream) -> Result<(), JsValue> {
        let delay_node = self.context.create_delay_with_max_delay_time(seconds)?;
        let source = self.context.create_media_stream_source(&stream)?;
        source.connect_with_audio_node(&delay_node)?;
        self.delay_node.connect_with_audio_node(&self.context.destination())?;
        Ok(())
    }

    #[wasm_bindgen]
    pub fn start(&mut self, stream: MediaStream) -> Result<(), JsValue> {
        let source = self.context.create_media_stream_source(&stream)?;
        source.connect_with_audio_node(&self.delay_node)?;
        self.source_node = Some(source);
        Ok(())
    }

    #[wasm_bindgen]
    pub fn stop(&mut self) -> Result<(), JsValue> {
        if let Some(source) = self.source_node.take() {
            source.disconnect()?;
        }
        Ok(())
    }
}