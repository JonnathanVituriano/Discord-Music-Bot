const prefix = require('../../config/config.json').prefix;

module.exports = {
    name: 'messageCreate',
    execute(message, client) {
        if (!message.content.startsWith(prefix) || message.author.bot) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const commandName = args.shift().toLowerCase();

        const command = 
        client.commands.get(commandName) ||
        
        client.commands.find((cmd) => cmd.aliases && cmd.aliases.includes(commandName));

        if (!command) return;

        try  {
            command.execute(message, args);
        } catch (error) {
            console.error(error);
            message.reply('Houve um erro ao tentar executar este comando.');
        }
    }
}
