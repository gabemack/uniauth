const config = require("../config");
const request = require("request");

const getDiscordUser = (accessToken) => {
    return new Promise((resolve, reject) => {
        let options = {
            'url': 'https://discord.com/api/v6/users/@me',
            'headers': {
                'Authorization': 'Bearer ' + accessToken,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }
        request.get(options, (error, response, body) => {
            if (error) {
                return reject(error);
            } else {
                return resolve(JSON.parse(body));
            }
        });
    });
}

module.exports = getDiscordUser;