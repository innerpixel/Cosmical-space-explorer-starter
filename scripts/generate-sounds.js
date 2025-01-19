const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

// Create sounds directory if it doesn't exist
const soundsDir = path.join(__dirname, '../public/sounds');
if (!fs.existsSync(soundsDir)) {
    fs.mkdirSync(soundsDir, { recursive: true });
}

// Generate a simple WAV file with sox
function generateSound(name, freq, duration, type = 'sine') {
    const outputPath = path.join(soundsDir, `${name}.wav`);
    const command = `sox -n -r 44100 -c 1 "${outputPath}" synth ${duration} ${type} ${freq} fade 0.1 ${duration} 0.1`;
    
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                console.error(`Error generating ${name}:`, error);
                reject(error);
            } else {
                console.log(`Generated ${name}`);
                resolve();
            }
        });
    });
}

async function generateAllSounds() {
    try {
        // UI Sounds
        await generateSound('ui-click', 800, 0.1);
        await generateSound('ui-hover', 600, 0.1);
        
        // Transition Sounds
        await generateSound('transition-in', 200, 0.3, 'sawtooth');
        await generateSound('transition-out', 150, 0.3, 'sawtooth');
        
        // Ambient Sounds
        await generateSound('space-ambient', 50, 2, 'sine');
        await generateSound('computer-ambient', 100, 2, 'square');
        
        console.log('All sounds generated successfully!');
    } catch (error) {
        console.error('Error generating sounds:', error);
    }
}

generateAllSounds();
