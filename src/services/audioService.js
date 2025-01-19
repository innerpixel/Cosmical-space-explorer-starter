class AudioService {
  constructor() {
    this.context = null;
    this.masterGain = null;
    this.initialized = false;
    this.categories = null;
    this.activeOscillators = new Map();
    
    // Define sound configurations with cheerful UI sounds
    this.soundConfigs = {
      'ui-hover': { 
        frequency: 2400, 
        duration: 0.08, 
        type: 'sine',
        volume: 0.2,
        secondary: {
          frequency: 3000,
          type: 'triangle',
          volume: 0.1
        }
      },
      'ui-click': { 
        frequency: 2800, 
        duration: 0.12, 
        type: 'sine',
        volume: 0.2,
        secondary: {
          frequency: 3600,
          type: 'triangle',
          volume: 0.1
        }
      },
      'engine-transition-in': { frequency: 400, duration: 0.3, type: 'sawtooth', volume: 0.05 },
      'engine-transition-out': { frequency: 300, duration: 0.3, type: 'sawtooth', volume: 0.05 },
      'ambient-space': { frequency: 100, duration: null, type: 'sine', volume: 0.1 },
      'ambient-computer': { frequency: 200, duration: null, type: 'square', volume: 0.05 }
    };
    
    // Adjust volume constraints
    this.volumeConstraints = {
      engine: { min: 0.03, max: 0.08, default: 0.05 },
      ambient: { min: 0.05, max: 0.2, default: 0.1 },
      ui: { min: 0.2, max: 0.4, default: 0.3 },
      alert: { min: 0.3, max: 0.6, default: 0.4 }
    };
  }

  async initialize() {
    if (this.initialized) return;

    try {
      console.log('Initializing audio service...');
      this.context = new (window.AudioContext || window.webkitAudioContext)();
      
      this.masterGain = this.context.createGain();
      this.masterGain.connect(this.context.destination);
      this.masterGain.gain.value = 0.7; // Set a default master volume
      
      // Initialize sound categories with separate gain nodes
      this.categories = {
        ambient: {
          gain: this.context.createGain(),
          volume: this.volumeConstraints.ambient.default
        },
        ui: {
          gain: this.context.createGain(),
          volume: this.volumeConstraints.ui.default
        },
        engine: {
          gain: this.context.createGain(),
          volume: this.volumeConstraints.engine.default
        },
        alert: {
          gain: this.context.createGain(),
          volume: this.volumeConstraints.alert.default
        }
      };

      // Connect category gain nodes to master
      Object.values(this.categories).forEach(category => {
        category.gain.connect(this.masterGain);
        category.gain.gain.value = category.volume;
      });

      this.initialized = true;
      console.log('Audio service initialized successfully');
    } catch (error) {
      console.error('Failed to initialize audio service:', error);
    }
  }

  async playSound(name, options = {}) {
    if (!this.initialized || !this.soundConfigs[name]) return;

    const config = this.soundConfigs[name];
    const oscillator = this.context.createOscillator();
    const gainNode = this.context.createGain();
    let secondaryOscillator, secondaryGain;

    oscillator.type = config.type;
    oscillator.frequency.setValueAtTime(config.frequency, this.context.currentTime);

    // Create secondary oscillator for UI sounds if configured
    if (config.secondary) {
      secondaryOscillator = this.context.createOscillator();
      secondaryGain = this.context.createGain();
      
      secondaryOscillator.type = config.secondary.type;
      secondaryOscillator.frequency.setValueAtTime(config.secondary.frequency, this.context.currentTime);
      secondaryGain.gain.setValueAtTime(config.secondary.volume, this.context.currentTime);
      
      secondaryOscillator.connect(secondaryGain);
    }

    // Determine category from sound name
    const category = name.split('-')[0];
    if (this.categories[category]) {
      oscillator.connect(gainNode);
      gainNode.connect(this.categories[category].gain);
      if (secondaryGain) {
        secondaryGain.connect(this.categories[category].gain);
      }
    } else {
      oscillator.connect(gainNode);
      gainNode.connect(this.masterGain);
      if (secondaryGain) {
        secondaryGain.connect(this.masterGain);
      }
    }

    // Set initial volume using both the category and sound-specific volumes
    const baseVolume = options.volume || config.volume || 1;
    gainNode.gain.setValueAtTime(baseVolume, this.context.currentTime);

    // Start the oscillators
    oscillator.start();
    if (secondaryOscillator) {
      secondaryOscillator.start();
    }

    // If duration is specified, stop after duration with a fade out
    if (config.duration) {
      const fadeOutDuration = Math.min(0.03, config.duration / 3);
      gainNode.gain.setValueAtTime(baseVolume, this.context.currentTime + config.duration - fadeOutDuration);
      gainNode.gain.exponentialRampToValueAtTime(
        0.001,
        this.context.currentTime + config.duration
      );
      oscillator.stop(this.context.currentTime + config.duration + 0.01);
      
      if (secondaryOscillator) {
        secondaryGain.gain.setValueAtTime(config.secondary.volume, this.context.currentTime + config.duration - fadeOutDuration);
        secondaryGain.gain.exponentialRampToValueAtTime(
          0.001,
          this.context.currentTime + config.duration
        );
        secondaryOscillator.stop(this.context.currentTime + config.duration + 0.01);
      }
    }

    // Store reference if it's a continuous sound
    if (!config.duration) {
      this.activeOscillators.set(name, { 
        oscillator, 
        gainNode,
        secondary: secondaryOscillator ? {
          oscillator: secondaryOscillator,
          gainNode: secondaryGain
        } : null
      });
    }

    return { 
      oscillator, 
      gainNode,
      secondary: secondaryOscillator ? {
        oscillator: secondaryOscillator,
        gainNode: secondaryGain
      } : null
    };
  }

  async playAmbient(name, options = {}) {
    if (this.activeOscillators.has(name)) {
      const { oscillator, gainNode } = this.activeOscillators.get(name);
      // Fade out existing ambient sound
      gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
      setTimeout(() => {
        oscillator.stop();
        gainNode.disconnect();
      }, 500);
      this.activeOscillators.delete(name);
    }

    const sound = await this.playSound(name, options);
    if (sound) {
      // Fade in new ambient sound
      sound.gainNode.gain.setValueAtTime(0.001, this.context.currentTime);
      sound.gainNode.gain.exponentialRampToValueAtTime(
        this.soundConfigs[name].volume,
        this.context.currentTime + 0.5
      );
      this.activeOscillators.set(name, sound);
    }
  }

  stopAllAmbient() {
    this.activeOscillators.forEach(({ oscillator, gainNode, secondary }) => {
      try {
        // Fade out before stopping
        gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
        setTimeout(() => {
          oscillator.stop();
          gainNode.disconnect();
        }, 500);
        
        if (secondary) {
          secondary.gainNode.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.5);
          setTimeout(() => {
            secondary.oscillator.stop();
            secondary.gainNode.disconnect();
          }, 500);
        }
      } catch (e) {
        console.warn('Error stopping oscillator:', e);
      }
    });
    this.activeOscillators.clear();
  }

  setVolume(category, volume) {
    if (category === 'master' && this.masterGain) {
      this.masterGain.gain.value = volume;
    } else if (this.categories[category]) {
      this.categories[category].gain.gain.value = volume;
    }
  }

  muteAll() {
    if (this.masterGain) {
      // Fade out instead of immediate mute
      this.masterGain.gain.exponentialRampToValueAtTime(0.001, this.context.currentTime + 0.1);
    }
  }

  unmuteAll() {
    if (this.masterGain) {
      // Fade in instead of immediate unmute
      this.masterGain.gain.exponentialRampToValueAtTime(0.7, this.context.currentTime + 0.1);
    }
  }
}

export const audioService = new AudioService();
