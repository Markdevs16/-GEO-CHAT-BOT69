const axios = require("axios");

async function fetchMixtralResponse(prompt) {
    try {
        const response = await axios.get(`${global.NashBot.END}api/mixtral-8b?q=${encodeURIComponent(prompt)}`);
        if (response.data.status) {
            return response.data.result;
        } else {
            return "Failed to get a valid response from the g3 AI.";
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "g3",
    description: "Talk to G3 AI",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    aliases: ["g3", "g3"],
    execute(api, event, args, prefix) {
        const { threadID, messageID } = event;
        let prompt = args.join(" ");
        if (!prompt) return api.sendMessage("Please enter a prompt for the Mixtral AI.", threadID, messageID);

        api.sendMessage(
            "🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n\n" +
            "💬 Responding...",
            threadID,
            async (err, info) => {
                if (err) return;
                try {
                    const response = await fetchMixtralResponse(prompt);
                    api.editMessage(
                        "🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n\n" +
                        response,
                        info.messageID
                    );
                } catch (g) {
                    api.sendMessage("Error processing your request: " + g.message, threadID);
                }
            },
            messageID
        );
    },
};
