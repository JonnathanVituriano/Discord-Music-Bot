const {joinVoiceChannel, createAudioPLayer, createAudioResource} = require('@discordjs/voice');
const ytdl = require ('ytdl-core');

module.exports = {
    name: 'play',
    description: 'Reproduz uma música do YouTube',
    execute: async (message, agrs) => {
        const voiceChannel = message.member.voice.channel;
        if (!voiceChannel) {
            return message.reply('Você precisa estar em um canal de voz!');
        }

        const songUrl = args[0];
        if (!ytdl.validateURL(songUrl)) {
            return message.reply('Por favor, forneça um link válido do Youtube, ou você é muito gay')
        }

    const connection = joinVoiceChannel({
        channelId: voiceChannel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreato,
    });

    const player = createAudioPlayer();
    const stream = ytdl(songUrl, {filter: 'audioonly'});
    const resource = createAudioPlayer(stream);

    player.play (resource);
    connection.subscribe(player);
    message.reply(`Tocando agora: ${songUrl}`)
    }
}