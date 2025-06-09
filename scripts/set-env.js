const fs = require('fs');
const path = require('path');

const envPath = path.resolve(__dirname, '../.env');

const envContent = `REACT_APP_VERSION=${process.env.npm_package_version || '1.0.0'}
REACT_APP_BUILD_DATE=${new Date().toISOString()}
`;

fs.writeFileSync(envPath, envContent);
console.log('Environment variables have been set successfully!'); 