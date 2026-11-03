// Âm thanh tổng hợp bằng WebAudio (không cần tệp âm thanh).
import { load, DEFAULT_SETTINGS, Settings } from './storage';

let ctx: AudioContext | null = null;

function tone(freq: number, dur: number, type: OscillatorType, gain: number, delay = 0) {
  try {
    if (!load<Settings>('settings', DEFAULT_SETTINGS).sound) return;
    ctx ??= new AudioContext();
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur);
  } catch {
    /* trình duyệt không hỗ trợ */
  }
}

export const sounds = {
  move: () => tone(420, 0.08, 'triangle', 0.25),
  capture: () => {
    tone(300, 0.07, 'square', 0.12);
    tone(180, 0.1, 'triangle', 0.25, 0.03);
  },
  check: () => {
    tone(660, 0.09, 'sawtooth', 0.1);
    tone(880, 0.12, 'triangle', 0.15, 0.08);
  },
  end: () => {
    tone(523, 0.15, 'triangle', 0.2);
    tone(659, 0.15, 'triangle', 0.2, 0.15);
    tone(784, 0.3, 'triangle', 0.2, 0.3);
  },
  error: () => tone(140, 0.15, 'square', 0.1),
};

export function playMoveSound(san: string) {
  if (san.includes('#')) sounds.end();
  else if (san.includes('+')) sounds.check();
  else if (san.includes('x')) sounds.capture();
  else sounds.move();
}
