// Script to generate SHA-256 hash for a password
async function generateHash(password) {
  const encoder = new TextEncoder();
  const data = encoder.encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

// Test passwords
const passwords = [
  'admin',      // For admin@example.com
  'developer',  // For developer@example.com
  'user'        // For user@example.com
];

async function main() {
  console.log('Generating password hashes...\n');
  
  for (const password of passwords) {
    const hash = await generateHash(password);
    console.log(`Password: ${password}`);
    console.log(`Hash: ${hash}\n`);
  }
}

main().catch(console.error);
