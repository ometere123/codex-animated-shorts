"""Original technical test cue: 0.5-second pulse clock matching the march beat.
Not narration, and not the unverified full bridge soundtrack.
"""
import sys, wave
import numpy as np
from scipy.signal import butter, sosfilt
sr = 48000
x = np.zeros(sr*4)
for t in np.arange(0,4,0.5):
    u = np.arange(int(sr*0.1))/sr
    pulse = 0.25*np.sin(2*np.pi*440*u)*np.exp(-u*45)
    a = round(t*sr)
    x[a:a+len(pulse)] += pulse
x = sosfilt(butter(2, 5000, fs=sr, output='sos'), x)
with wave.open(sys.argv[1], 'wb') as w:
    w.setparams((2,2,sr,0,'NONE','not compressed'))
    w.writeframes((np.repeat(x[:,None],2,axis=1)*32767).astype('<i2').tobytes())
