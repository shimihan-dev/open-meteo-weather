const fs = require('fs');
const path = require('path');

const packageJson = require('../package.json');
const buildDate = new Date().toISOString();

const envContent = `REACT_APP_VERSION=${packageJson.version}
REACT_APP_BUILD_DATE=${buildDate}
`;

fs.writeFileSync(path.join(__dirname, '../.env'), envContent); 