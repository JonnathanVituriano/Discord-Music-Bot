const {createAudioPlayer, createAudioResource} = require ('@discordjs/voice');

const createPlayer = (stream) => {
    const player = createAudioPlayer();
    const resource = createAudioResource();
    player.play(resource);
    return player;
};

module.exports = {createPlayer};