// Custom build script to ensure TypeScript is installed
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Check if TypeScript is installed
try {
  // Create a dummy file to test TypeScript
  fs.writeFileSync(
    path.join(__dirname, 'test.ts'),
    'const test: string = "test"; console.log(test);'
  );

  console.log('Installing TypeScript and dependencies...');
  execSync('npm install --no-save --legacy-peer-deps typescript@5.0.4 @types/react@18.2.0 @types/react-dom@18.2.0 @types/node@20.0.0 @types/three@0.158.2', { 
    stdio: 'inherit' 
  });

  console.log('Successfully installed TypeScript and type definitions');

  // Compile dummy file to test TypeScript installation
  console.log('Testing TypeScript...');
  execSync('npx tsc --noEmit test.ts', { stdio: 'inherit' });
  console.log('TypeScript is working correctly');

  // Remove test file
  fs.unlinkSync(path.join(__dirname, 'test.ts'));

  // Run the build
  console.log('Running Next.js build...');
  execSync('next build', { stdio: 'inherit' });
  console.log('Build completed successfully');

} catch (error) {
  console.error('Build script failed:', error.message);
  process.exit(1);
} 