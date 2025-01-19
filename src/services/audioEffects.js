// Audio context and state management
let audioContext = null;
let isAudioInitialized = false;
let ambientDrone = null;
let masterGainNode = null;

// Sound categories and their gain nodes
const categories = {
  engine: { gain: null, volume: 0.1, current: 1.0 },
  interface: { gain: null, volume: 0.1, current: 1.0 },
  ambient: { gain: null, volume: 0.1, current: 1.0 },
  voice: { gain: null, volume: 0.2, current: 1.0 }
};

// Suppression levels
const SUPPRESSION_LEVELS = {
  lowest: 1.0,      // 100% - No suppression
  low: 0.7,         // 70%
  medium: 0.4,      // 40%
  high: 0.2,        // 20%
  highest: 0.05     // 5%
};

// Initial volumes (starting at 10% range)
const INITIAL_MASTER_VOLUME = 0.1;    // 10% volume
const AMBIENT_VOLUME = 0.05;          // 5% volume
const EFFECT_VOLUME = 0.1;            // 10% volume
const VOICE_VOLUME = 0.2;             // 20% volume

// Volume presets
const VOLUME_PRESETS = {
  muted: {
    master: 0,
    ambient: 0,
    effects: 0,
    voice: 0
  },
  quiet: {
    master: 0.1,     // 10%
    ambient: 0.05,   // 5%
    effects: 0.1,    // 10%
    voice: 0.2       // 20%
  },
  medium: {
    master: 0.3,     // 30%
    ambient: 0.15,   // 15%
    effects: 0.3,    // 30%
    voice: 0.4       // 40%
  },
  full: {
    master: 0.5,     // 50%
    ambient: 0.25,   // 25%
    effects: 0.5,    // 50%
    voice: 0.6       // 60%
  }
};

const VOLUME_STEP = 0.05; // 5% step

// Initialize audio context and category gain nodes
const initAudioContext = async () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
    masterGainNode = audioContext.createGain();
    masterGainNode.gain.value = INITIAL_MASTER_VOLUME; // 10% master volume
    masterGainNode.connect(audioContext.destination);

    // Initialize gain nodes for each category
    Object.keys(categories).forEach(category => {
      const gainNode = audioContext.createGain();
      gainNode.gain.value = categories[category].volume;
      gainNode.connect(masterGainNode);
      categories[category].gain = gainNode;
    });
  }
  
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  isAudioInitialized = true;
  return audioContext;
};

// Apply suppression to a category
const applySuppression = (category, level) => {
  if (!categories[category] || !SUPPRESSION_LEVELS[level]) {
    console.warn(`Invalid category (${category}) or suppression level (${level})`);
    return false;
  }

  const baseVolume = categories[category].volume;
  const suppression = SUPPRESSION_LEVELS[level];
  const targetVolume = baseVolume * suppression;

  if (categories[category].gain) {
    categories[category].gain.gain.linearRampToValueAtTime(
      targetVolume,
      audioContext.currentTime + 0.5
    );
  }

  return true;
};

// Adjust volume for a category
const adjustCategoryVolume = (category, action) => {
  if (!categories[category]) {
    return {
      success: false,
      message: `Unknown category. Available: ${Object.keys(categories).join(', ')}`
    };
  }

  const cat = categories[category];
  let newMultiplier = cat.current;

  switch (action) {
    case 'increase':
      newMultiplier = Math.min(1.0, cat.current + VOLUME_STEP);
      break;
    case 'decrease':
      newMultiplier = Math.max(0, cat.current - VOLUME_STEP);
      break;
    default:
      return {
        success: false,
        message: 'Invalid action. Use: increase or decrease'
      };
  }

  // Only update if there's a change
  if (newMultiplier !== cat.current) {
    cat.current = newMultiplier;
    if (cat.gain) {
      cat.gain.gain.linearRampToValueAtTime(
        cat.volume * newMultiplier,
        audioContext.currentTime + 0.1
      );
    }
    
    const percentage = Math.round(newMultiplier * 100);
    return {
      success: true,
      message: `${category} volume ${action}d to ${percentage}%`
    };
  }

  return {
    success: false,
    message: `${category} volume already at ${action === 'increase' ? 'maximum' : 'minimum'}`
  };
};

// Alien UI sound effects
const createAlienBlip = async (frequency = 440, duration = 0.1, categoryGain = masterGainNode) => {
  const ctx = await initAudioContext();
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();
  
  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, ctx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(frequency * 2, ctx.currentTime + duration);
  
  gainNode.gain.setValueAtTime(EFFECT_VOLUME, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.1, ctx.currentTime + duration);
  
  oscillator.connect(gainNode);
  gainNode.connect(categoryGain);
  
  oscillator.start();
  oscillator.stop(ctx.currentTime + duration);
};

// Ambient background sound
const createAmbientDrone = async () => {
  if (!isAudioInitialized) {
    console.warn('Audio not initialized yet. Waiting for user interaction.');
    return null;
  }

  if (ambientDrone) {
    ambientDrone.stop();
  }

  const ctx = await initAudioContext();
  const oscillators = [];
  const gainNodes = [];
  
  const frequencies = [55, 110, 165, 220];
  frequencies.forEach(freq => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Start with very low volume
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(AMBIENT_VOLUME, ctx.currentTime + 3);
    
    osc.connect(gain);
    gain.connect(categories.ambient.gain);
    
    oscillators.push(osc);
    gainNodes.push(gain);
    
    osc.start();
  });

  ambientDrone = {
    stop: () => {
      gainNodes.forEach(gain => {
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 2);
      });
      setTimeout(() => {
        oscillators.forEach(osc => osc.stop());
      }, 2000);
    },
    setVolume: (volume) => {
      gainNodes.forEach(gain => {
        gain.gain.linearRampToValueAtTime(volume * AMBIENT_VOLUME, ctx.currentTime + 1);
      });
    }
  };
  
  return ambientDrone;
};

// Record and playback alien voice effect
const createAlienVoiceEffect = async (stream) => {
  const ctx = await initAudioContext();
  const source = ctx.createMediaStreamSource(stream);
  
  // Create effect nodes
  const inputGain = ctx.createGain();
  const pitchShift = ctx.createBiquadFilter();
  const delay = ctx.createDelay();
  const feedback = ctx.createGain();
  const outputGain = ctx.createGain();
  
  // Set initial volumes
  inputGain.gain.value = VOICE_VOLUME;
  outputGain.gain.value = VOICE_VOLUME;
  
  // Configure effects
  pitchShift.type = 'highshelf';
  pitchShift.frequency.value = 1000;
  pitchShift.gain.value = 15;
  
  delay.delayTime.value = 0.2;
  feedback.gain.value = 0.3;
  
  // Connect nodes
  source.connect(inputGain);
  inputGain.connect(pitchShift);
  pitchShift.connect(delay);
  delay.connect(feedback);
  feedback.connect(delay);
  delay.connect(outputGain);
  outputGain.connect(categories.voice.gain);
  
  return {
    disconnect: () => {
      source.disconnect();
      inputGain.disconnect();
      delay.disconnect();
      feedback.disconnect();
      outputGain.disconnect();
    },
    setVolume: (volume) => {
      outputGain.gain.linearRampToValueAtTime(volume * VOICE_VOLUME, ctx.currentTime + 0.1);
    }
  };
};

// Volume control
const setMasterVolume = (volume) => {
  if (masterGainNode) {
    masterGainNode.gain.linearRampToValueAtTime(volume, audioContext.currentTime + 0.1);
  }
};

// Apply volume preset
const applyVolumePreset = (presetName) => {
  const preset = VOLUME_PRESETS[presetName];
  if (!preset) return;

  setMasterVolume(preset.master);
  if (ambientDrone) {
    ambientDrone.setVolume(preset.ambient);
  }
};

// Command parser for sound control
const parseAndExecuteSoundCommand = (command) => {
  const parts = command.toLowerCase().split(' ').filter(part => part.trim() !== '');
  
  if (parts.length !== 4 || parts[0] !== 'sound') {
    return {
      success: false,
      message: 'Invalid command format. Use: sound category action level'
    };
  }

  const [_, category, action, level] = parts;

  // Handle volume adjustments
  if (action === 'volume') {
    if (!['increase', 'decrease'].includes(level)) {
      return {
        success: false,
        message: 'Invalid volume action. Use: increase or decrease'
      };
    }
    return adjustCategoryVolume(category, level);
  }

  // Handle suppression levels
  if (action === 'suppression') {
    if (!SUPPRESSION_LEVELS[level]) {
      return {
        success: false,
        message: `Unknown level. Available: ${Object.keys(SUPPRESSION_LEVELS).join(', ')}`
      };
    }
    
    const success = applySuppression(category, level);
    if (success) {
      categories[category].current = SUPPRESSION_LEVELS[level];
    }
    return {
      success,
      message: success 
        ? `Applied ${level} suppression to ${category} sounds`
        : 'Failed to apply suppression'
    };
  }

  return {
    success: false,
    message: 'Unknown action. Available: suppression, volume'
  };
};

export const audioEffects = {
  init: initAudioContext,
  setMasterVolume,
  parseAndExecuteSoundCommand,
  categories: Object.keys(categories),
  suppressionLevels: Object.keys(SUPPRESSION_LEVELS),
  playButtonClick: async () => {
    if (!isAudioInitialized) await initAudioContext();
    return createAlienBlip(880, 0.05, categories.interface.gain);
  },
  playToggleOn: async () => {
    if (!isAudioInitialized) await initAudioContext();
    return createAlienBlip(440, 0.1, categories.interface.gain);
  },
  playToggleOff: async () => {
    if (!isAudioInitialized) await initAudioContext();
    return createAlienBlip(220, 0.1, categories.interface.gain);
  },
  playError: async () => {
    if (!isAudioInitialized) await initAudioContext();
    return createAlienBlip(110, 0.3, categories.interface.gain);
  },
  createAmbientDrone,
  createAlienVoiceEffect
};
