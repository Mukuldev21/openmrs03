const { execSync } = require('child_process');

// Capture arguments passed to the script
// In context of 'npm run test "Module 3"', this captures arguments appended by npm
const args = process.argv.slice(2);
const grepPattern = args.join(' ').trim();

// Base Playwright command
let command = 'npx playwright test --project="OpenMRS E2E Test"';

// If arguments are provided (e.g. "Module 3"), append them as a grep filtering flag
if (grepPattern) {
    console.log(`\n> Detected Filter: Running tests matching "${grepPattern}"...\n`);
    // Wrap in quotes to handle spaces safely
    command += ` -g "${grepPattern}"`;
}

console.log(`> Executing: ${command}`);

try {
    // Execute the command synchronously, inheriting stdio to show real-time output
    execSync(command, { stdio: 'inherit', env: process.env });
} catch (error) {
    // Exit with failure code if test fails
    process.exit(1);
}
