const config = require("../config");
const request = require("request");

const getGoogleToken = (accessCode) => {
    return new Promise((resolve, reject) => {
        let options = {
            'url': 'https://oauth2.googleapis.com/token',
            'headers': {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            form: {
                'client_id': config.GOOGLE_CLIENT_ID,
                'client_secret': config.GOOGLE_CLIENT_SECRET,
                'grant_type': config.GOOGLE_GRANT_TYPE,
                'code': accessCode,
                'redirect_uri': config.GOOGLE_REDIRECT_URI
            }
        };

        request.post(options, (error, response, body) => {
            if (error) {
                reject(error);
            } else {
                resolve(JSON.parse(body));
            }

        });
    });


}

module.exports = getGoogleToken;