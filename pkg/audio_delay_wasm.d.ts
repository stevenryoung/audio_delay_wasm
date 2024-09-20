/* tslint:disable */
/* eslint-disable */
/**
*/
export class AudioDelay {
  free(): void;
/**
*/
  constructor();
/**
* @param {MediaStream} stream
*/
  set_source(stream: MediaStream): void;
/**
* @param {number} seconds
*/
  set_delay(seconds: number): void;
/**
* @param {MediaStream} stream
*/
  start(stream: MediaStream): void;
/**
*/
  stop(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_audiodelay_free: (a: number, b: number) => void;
  readonly audiodelay_new: (a: number) => void;
  readonly audiodelay_set_source: (a: number, b: number, c: number) => void;
  readonly audiodelay_set_delay: (a: number, b: number, c: number) => void;
  readonly audiodelay_start: (a: number, b: number, c: number) => void;
  readonly audiodelay_stop: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {{ module: SyncInitInput }} module - Passing `SyncInitInput` directly is deprecated.
*
* @returns {InitOutput}
*/
export function initSync(module: { module: SyncInitInput } | SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;