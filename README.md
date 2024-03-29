### UniAuth
UniAuth lets you restrict access to your Discord server using Google OAuth. Originally created for University High School's Discord server.
<hr>

### Installation
 - Register an application on [Discord](https://discord.com/developers/applications)
   - Add a bot user to the application
   - Add the redirect URI to the application, `/oauth/redirect`
 - Register a project on [Google](https://console.developers.google.com/)
   - Create [OAuth credentials](https://console.developers.google.com/apis/credentials), and add the redirect URI `/google/redirect`
 - Setup the config file
   - Rename the file from `config.example.js` to `config.js`
   - Set your guild ID, and an array of role IDs that you want added to users upon authentication
 - Configure your Discord server
   - The bot user needs permission to create invites, manage roles, and should be placed higher than the roles you want to assign users.
   
### Contributing
Please do. If you run into any problems please open an issue.