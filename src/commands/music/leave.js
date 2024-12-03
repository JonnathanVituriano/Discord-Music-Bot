const { getVoiceConnection } = require('@discordjs/voice');

module.exports = {
    name: 'leave',
    description: 'Faz o bot sair do canal de voz',
    execute(message) {
        const voiceChannel = message.member.voice.channel;

        if (!voiceChannel) {
            return message.reply('Você precisa estar em um canal de voz!');
        }

        const connection = getVoiceConnection(message.guild.id);

        if (connection) {
            connection.destroy(); // Desconecta o bot do canal
            message.reply('Saí do canal de voz!');
        } else {
            message.reply('Eu não estou em nenhum canal de voz no momento.');
        }
    },
};
