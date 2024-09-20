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
        let delay_node = context.create_delay_with_max_delay_time(120.0)?;
        delay_node.connect_with_audio_node(&context.destination())?;

        Ok(AudioDelay {
            context,
            delay_node,
            source_node: None,
        })
    }

    pub fn set_source(&mut self, stream: MediaStream) -> Result<(), JsValue> {
        let source_node = self.context.create_media_stream_source(&stream)?;
        source_node.connect_with_audio_node(&self.delay_node)?;
        self.source_node = Some(source_node);
        Ok(())
    }

    #[wasm_bindgen]
    pub fn set_delay(&self, seconds: f32) -> Result<(), JsValue> {
        let _ = self.context.resume()?;
        self.delay_node.delay_time().set_value(seconds);
        Ok(())
    }

    #[wasm_bindgen]
    pub fn start(&mut self, stream: MediaStream) -> Result<(), JsValue> {
        let _ = self.context.resume()?;
        self.set_source(stream)?;
        Ok(())
    }

    #[wasm_bindgen]
    pub fn stop(&mut self) -> Result<(), JsValue> {
        if let Some(ref source_node) = self.source_node {
            source_node.disconnect()?;
        }
        self.delay_node.disconnect()?;
        Ok(())
    }
}