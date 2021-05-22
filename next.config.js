const path = require('path');

module.exports = {
    webpack(config) {
        config.resolve.alias['@'] = path.join(__dirname, 'src');

        return config;
    },
    env: {
        API_KEY: process.env.API_KEY,
        AUTH_DOMAIN: process.env.AUTH_DOMAIN,
        PROJECT_ID: process.env.PROJECT_ID,
        STORAGE_BUCKET: process.env.STORAGE_BUCKET,
        MESSAGING_SENDER_ID: process.env.MESSAGING_SENDERID,
        APP_ID: process.env.APP_ID,
    }
}