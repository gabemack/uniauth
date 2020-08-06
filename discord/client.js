const discord = require("discord.js");
const config = require("../config");
const client = new discord.Client();


const addUserToGuild = (accessToken, userID, nick, roles) => {
    return new Promise((resolve, reject) => {
        // Get guild object
        let server = client.guilds.cache.get(config.DISCORD_GUILD_ID);

        // Check if user is already in the Discord guild
        if (server.members.cache.has(userID)) {
            let guildUser = server.members.cache.get(userID);
            let reason = "User already in guild";
            guildUser.setNickname(nick, reason).then(mem => {
                guildUser.roles.add(config.DISCORD_ROLES, reason).then(member => {
                    resolve("Your roles and name have been updated in the Discord server!");
                }).catch(err => reject(err));
            }).catch(err => reject(err));
        } else {
            // Add user to guild, set roles and nickname
            server.addMember(userID, {
                accessToken: accessToken,
                nick: nick,
                roles: roles
            }).then(body => {
                resolve("You have been added to the Discord server!");
            }).catch(err => reject(err));
        }
    });
}

client.login(config.DISCORD_BOT_TOKEN);

client.on("ready", () => {
    console.log(`Connected to Discord using ${client.user.username}#${client.user.discriminator}`);
});

module.exports = addUserToGuild;