"""Original 144 BPM toy-box / handheld score. All sounds synthesized locally."""
from array import array
from pathlib import Path
import math
import random
import wave

ROOT = Path(__file__).resolve().parents[1]
SR = 48000
N = SR * 30
music = array('f', [0]) * N
sfx = array('f', [0]) * N
rng = random.Random(3032026)
BEAT = 60 / 144

def note(target, midi, start, length, level, kind='toy'):
    offset = round(start * SR)
    count = min(round(length * SR), N - offset)
    hz = 440 * 2 ** ((midi - 69) / 12)
    for i in range(max(0, count)):
        t = i / SR
        a = 2 * math.pi * hz * t
        if kind == 'toy':
            v = math.sin(a) + .28 * math.sin(a * 2) * math.exp(-t * 14) + .14 * math.sin(a * 3) * math.exp(-t * 20)
        elif kind == 'pulse':
            v = .7 * math.sin(a) + .23 * math.sin(a * 3) + .10 * math.sin(a * 5)
        elif kind == 'triangle':
            v = 4 * abs((hz * t) % 1 - .5) - 1
        else:
            v = math.sin(a)
        env = min(t / .006, 1) * min((length - t) / .035, 1) * math.exp(-t / (length * .7))
        target[offset + i] += level * v * env

def glide(start, length, low, high, level):
    offset = round(start * SR)
    phase = 0
    for i in range(round(length * SR)):
        t = i / SR
        # Small pitch steps evoke low-resolution game hardware.
        q = round(t / length * 18) / 18
        hz = low * (high / low) ** q
        phase += 2 * math.pi * hz / SR
        env = math.sin(math.pi * t / length) ** .7
        sfx[offset + i] += level * (math.sin(phase) + .17 * math.sin(phase * 3)) * env

chords = [[48,52,55,59],[53,57,60,64],[45,48,52,55],
          [43,47,50,55],[53,57,60,64],[48,52,55,60]]
melodies = [
    [72,79,76,81,79,74,76,72,74,79,76,72],
    [77,81,84,81,79,77,74,77,81,79,77,76],
    [76,72,81,79,76,79,84,81,79,76,74,72],
    [74,79,83,86,83,79,76,74,71,74,79,83],
    [81,84,81,77,79,81,84,86,84,81,79,77],
    [79,76,72,76,81,79,76,74,72,76,79,84],
]
for section, chord in enumerate(chords):
    start = section * 5
    for beat in range(12):
        # Oom-pah bass with a light offbeat chord: playful, not relentless.
        note(music, chord[0] + (7 if beat % 2 else 0), start + beat * BEAT, .16, .13, 'triangle')
        for midi in chord[1:]:
            note(music, midi + 12, start + (beat + .5) * BEAT, .10, .024, 'pulse')
        midi = melodies[section][beat]
        note(music, midi, start + beat * BEAT, .19 if beat % 3 else .28, .15, 'toy')
        if beat in [1,4,7,10]:
            note(music, midi + (2 if beat % 2 else -2), start + (beat + .65) * BEAT, .10, .09, 'pulse')
        pos = round((start + beat * BEAT) * SR)
        for j in range(1100):
            if pos + j < N:
                music[pos + j] += (rng.random() * 2 - 1) * .014 * math.exp(-j / 220)

# Five distinct, original transition gestures, matching the five visual games.
glide(4.42, .24, 260, 880, .13)
for i, m in enumerate([72,79,84]):
    note(sfx, m, 4.73 + i * .15, .18, .18, 'pulse')
for i, m in enumerate([86,93,98]):
    note(sfx, m, 9.62 + i * .10, .22, .17, 'toy')
for i, m in enumerate([60,64,67,72,76,79]):
    note(sfx, m, 14.53 + i * .115, .16, .14, 'pulse')
glide(19.56, .32, 740, 170, .15)
glide(19.96, .24, 180, 510, .13)
for i, m in enumerate([72,76,81,86,91]):
    note(sfx, m, 24.58 + i * .12, .28, .15, 'toy')
for i, m in enumerate([72,76,79,84]):
    note(music, m, 28.8 + i * .13, .6, .10, 'toy')

voice_windows = []
for i in range(6):
    with wave.open(str(ROOT / f'public/voiceover/{i+1:02}.wav')) as w:
        start = round((i * 5 + .65) * 30) / 30
        voice_windows.append((start, start + w.getnframes() / w.getframerate()))

def write(target, name, duck=False):
    peak = max(abs(v) for v in target) or 1
    gain = (.44 if duck else .28) / peak
    pcm = array('h')
    for i, value in enumerate(target):
        t = i / SR
        level = 1
        if duck:
            for start, end in voice_windows:
                if start - .14 <= t <= end + .16:
                    if t < start:
                        level = min(level, 1 - .72 * (t - start + .14) / .14)
                    elif t <= end:
                        level = min(level, .28)
                    else:
                        level = min(level, .28 + .72 * (t - end) / .16)
        fade = min(t / .06, 1) * max(0, min((30 - t) / .5, 1))
        for delay in [7200, 10560]:
            echo = target[i-delay] * .11 if i >= delay else 0
            sample = math.tanh((value + echo) * gain * level * fade)
            pcm.append(round(sample * 32767))
    path = ROOT / 'public/pixel-story' / name
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
        w.writeframes(pcm.tobytes())
    print(path)

write(music, 'playful-music.wav', True)
write(sfx, 'playful-sfx.wav')
