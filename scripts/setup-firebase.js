#!/usr/bin/env node

/**
 * Firebase Setup Helper
 * 
 * This script helps you format your Firebase service account JSON
 * for use in environment variables.
 * 
 * Usage:
 *   node scripts/setup-firebase.js path/to/service-account.json
 */

const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);

if (args.length === 0) {
    console.log('📋 Firebase Setup Helper\n');
    console.log('Usage: node scripts/setup-firebase.js <path-to-service-account.json>\n');
    console.log('Example:');
    console.log('  node scripts/setup-firebase.js ~/Downloads/firebase-service-account.json\n');
    process.exit(1);
}

const filePath = args[0];

try {
    // Read the service account file
    const absolutePath = path.resolve(filePath);
    const fileContent = fs.readFileSync(absolutePath, 'utf8');

    // Parse to validate JSON
    const serviceAccount = JSON.parse(fileContent);

    // Validate required fields
    const requiredFields = ['type', 'project_id', 'private_key', 'client_email'];
    const missingFields = requiredFields.filter(field => !serviceAccount[field]);

    if (missingFields.length > 0) {
        console.error('❌ Invalid service account file. Missing fields:', missingFields.join(', '));
        process.exit(1);
    }

    // Minify JSON (single line)
    const minified = JSON.stringify(serviceAccount);

    console.log('✅ Service account file validated successfully!\n');
    console.log('📝 Add this to your .env.local file:\n');
    console.log('FIREBASE_SERVICE_ACCOUNT=\'' + minified + '\'\n');
    console.log('📋 Or copy this value to Vercel environment variables:\n');
    console.log(minified + '\n');
    console.log('ℹ️  Project ID:', serviceAccount.project_id);
    console.log('ℹ️  Client Email:', serviceAccount.client_email);

} catch (error) {
    if (error.code === 'ENOENT') {
        console.error('❌ File not found:', filePath);
    } else if (error instanceof SyntaxError) {
        console.error('❌ Invalid JSON file');
    } else {
        console.error('❌ Error:', error.message);
    }
    process.exit(1);
}
