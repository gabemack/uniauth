const config = require("../config");
const request = require("request");

const fetchToken = (requestToken) => {
    return new Promise((resolve, reject) => {
        let options = {
            'url': 'https://discord.com/api/v6/oauth2/token',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'client_id': config.DISCORD_CLIENT_ID,
                'client_secret': config.DISCORD_CLIENT_SECRET,
                'grant_type': config.DISCORD_GRANT_TYPE,
                'code': requestToken,
                'redirect_uri': config.DISCORD_REDIRECT_URI,
                'scope': config.DISCORD_SCOPE
            }
        };

        request.post(options, (error, response, body) => {
            if (error) {
                return reject(error);
            } else {
                return resolve (JSON.parse(body));
            }

        })
    });
}

module.exports = fetchToken;