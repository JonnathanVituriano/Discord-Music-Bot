const { joinVoiceChannel, createAudioPlayer, createAudioResource, AudioPlayerStatus } = require('@discordjs/voice');
const { exec } = require('youtube-dl-exec');
const ffmpeg = require('ffmpeg-static');

module.exports = {
  name: 'p',
  description: 'Reproduz uma música do YouTube',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;
    if (!voiceChannel) {
      return message.reply('Você precisa estar em um canal de voz!');
    }

    const permissions = voiceChannel.permissionsFor(message.client.user);
    if (!permissions.has('Connect') || !permissions.has('Speak')) {
      return message.reply('Eu preciso de permissões para conectar e falar no canal!');
    }

    const songUrl = args[0];
    if (!songUrl.startsWith('http')) {
      return message.reply('Por favor, forneça um link válido do YouTube.');
    }

    // Conectar ao canal de voz
    const connection = joinVoiceChannel({
      channelId: voiceChannel.id,
      guildId: message.guild.id,
      adapterCreator: message.guild.voiceAdapterCreator,
    });

    // Criar player de áudio
    const player = createAudioPlayer();

    try {
      // Executar youtube-dl para obter o áudio do vídeo
      const stream = exec(songUrl, {
        output: '-',
        format: 'bestaudio[ext=webm]/bestaudio[ext=m4a]', // Corrigido
        limitRate: '100K',
        quiet: true,
        ffmpegLocation: ffmpeg,
    });
    

      const resource = createAudioResource(stream.stdout);

      player.play(resource);
      connection.subscribe(player);

      player.on(AudioPlayerStatus.Playing, () => {
        message.reply(`🎵 Tocando agora: ${songUrl}`);
      });

      player.on('error', (error) => {
        console.error('Erro no player:', error);
        message.reply('Ocorreu um erro ao tentar reproduzir a música.');
      });
    } catch (error) {
      console.error('Erro ao executar youtube-dl:', error);
      message.reply('Não foi possível obter a música do YouTube.');
    }
  },
};
