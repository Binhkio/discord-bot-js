const { playEmbed } = require("../../src/components/embed");

module.exports = {
    name: 'start',
    async execute(queue, track) {
        const embed = playEmbed(queue, track);
        
    },
};
