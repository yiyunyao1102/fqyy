/**
 * Procedural sound effects, synthesised with the Web Audio API so the project
 * ships no audio assets — fitting the graybox aesthetic. Every method is
 * fail-safe: if the Web Audio API is unavailable (server-side rendering, tests,
 * a locked-down browser) the calls are silent no-ops rather than throwing.
 */

type AudioContextCtor = typeof AudioContext;

let sharedContext: AudioContext | null = null;
let sharedMaster: GainNode | null = null;
let contextUnavailable = false;

function getContext(): AudioContext | null {
  if (contextUnavailable) {
    return null;
  }
  if (typeof window === "undefined") {
    contextUnavailable = true;
    return null;
  }
  if (!sharedContext) {
    try {
      const Ctor: AudioContextCtor | undefined =
        window.AudioContext ??
        (window as unknown as { webkitAudioContext?: AudioContextCtor }).webkitAudioContext;
      if (!Ctor) {
        contextUnavailable = true;
        return null;
      }
      sharedContext = new Ctor();
      sharedMaster = sharedContext.createGain();
      sharedMaster.gain.value = 0.3;
      sharedMaster.connect(sharedContext.destination);
    } catch {
      contextUnavailable = true;
      return null;
    }
  }
  if (sharedContext.state === "suspended") {
    void sharedContext.resume();
  }
  return sharedContext;
}

interface ToneSpec {
  freq: number;
  type: OscillatorType;
  duration: number;
  gain: number;
  freqEnd?: number;
  delay?: number;
}

interface NoiseSpec {
  duration: number;
  gain: number;
  cutoffStart: number;
  cutoffEnd: number;
}

export class SoundFx {
  private lastHitMs = 0;

  private tone(spec: ToneSpec): void {
    const ctx = getContext();
    if (!ctx || !sharedMaster) {
      return;
    }
    const t0 = ctx.currentTime + (spec.delay ?? 0);
    const osc = ctx.createOscillator();
    osc.type = spec.type;
    osc.frequency.setValueAtTime(spec.freq, t0);
    if (spec.freqEnd) {
      osc.frequency.exponentialRampToValueAtTime(Math.max(1, spec.freqEnd), t0 + spec.duration);
    }
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(spec.gain, t0 + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + spec.duration);
    osc.connect(gain);
    gain.connect(sharedMaster);
    osc.start(t0);
    osc.stop(t0 + spec.duration + 0.02);
  }

  private noise(spec: NoiseSpec): void {
    const ctx = getContext();
    if (!ctx || !sharedMaster) {
      return;
    }
    const t0 = ctx.currentTime;
    const frames = Math.max(1, Math.floor(ctx.sampleRate * spec.duration));
    const buffer = ctx.createBuffer(1, frames, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < frames; i += 1) {
      data[i] = Math.random() * 2 - 1;
    }
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    const filter = ctx.createBiquadFilter();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(spec.cutoffStart, t0);
    filter.frequency.exponentialRampToValueAtTime(Math.max(1, spec.cutoffEnd), t0 + spec.duration);
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(spec.gain, t0);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + spec.duration);
    source.connect(filter);
    filter.connect(gain);
    gain.connect(sharedMaster);
    source.start(t0);
    source.stop(t0 + spec.duration);
  }

  /** A successful hit — throttled so dense combat does not become a buzz. */
  hit(): void {
    const now = typeof performance !== "undefined" ? performance.now() : Date.now();
    if (now - this.lastHitMs < 45) {
      return;
    }
    this.lastHitMs = now;
    this.tone({
      freq: 520 + Math.random() * 60,
      freqEnd: 300,
      type: "triangle",
      duration: 0.06,
      gain: 0.1
    });
  }

  pickup(): void {
    this.tone({ freq: 680, freqEnd: 1020, type: "sine", duration: 0.09, gain: 0.14 });
  }

  rankUp(): void {
    this.tone({ freq: 440, type: "triangle", duration: 0.12, gain: 0.16 });
    this.tone({ freq: 660, type: "triangle", duration: 0.16, gain: 0.16, delay: 0.1 });
  }

  breakthrough(): void {
    this.tone({ freq: 220, freqEnd: 880, type: "sawtooth", duration: 0.4, gain: 0.16 });
    this.tone({ freq: 330, freqEnd: 1320, type: "sine", duration: 0.45, gain: 0.12, delay: 0.04 });
  }

  death(): void {
    this.tone({ freq: 320, freqEnd: 70, type: "sawtooth", duration: 0.5, gain: 0.2 });
  }

  evade(): void {
    this.noise({ duration: 0.14, gain: 0.12, cutoffStart: 1600, cutoffEnd: 480 });
  }
}
