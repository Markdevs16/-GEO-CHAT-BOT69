const axios = require('axios');

async function gptConvoAPI(ask, id) {
    try {
        const response = await axios.get(`https://gpt4withcustommodel.onrender.com/gpt?query=${encodeURIComponent(ask)}&model=gpt-4`);
        
        if (response.data && response.data.response) {
            return response.data.response;
        } else {
            return "Unexpected API response format. Please check the API or contact support.";
        }
    } catch (error) {
        console.error("Error fetching data:", error.message);
        return "Failed to fetch data. Please try again later.";
    }
}

module.exports = {
    name: "g4",
    description: "Interact with GPT-3 conversational AI",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID, senderID } = event;
        const message = args.join(" ");

        if (!message) return api.sendMessage("Please provide your question.\n\nExample: G4 What is the solar system?", threadID, messageID);

        api.sendMessage(
            "💬 Responding...",
            threadID,
            async (err, info) => {
                if (err) return;
                try {
                    if (event.type === "message_reply" && event.messageReply.attachments && event.messageReply.attachments[0]) {
                        const attachment = event.messageReply.attachments[0];

                        if (attachment.type === "photo") {
                            const imageURL = attachment.url;
                            const geminiUrl = `https://deku-rest-api.gleeze.com/gemini?prompt=${encodeURIComponent(message)}&imgurl=${encodeURIComponent(imageURL)}`;
                            const geminiResponse = await axios.get(geminiUrl);
                            const { vision } = geminiResponse.data;
                            if (vision) {
                                return api.editMessage(
                                    `🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n━━━━━━━━━━━━━━━━━━\n${vision}\n━━━━━━━━━━━━━━━━━━`,
                                    info.messageID
                                );
                            } else {
                                return api.sendMessage("🤖 Failed to recognize the image.", threadID, messageID);
                            }
                        }
                    }

                    const response = await gptConvoAPI(message, senderID);
                    api.editMessage(
                        `🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n━━━━━━━━━━━━━━━━━━\n${response}\n━━━━━━━━━━━━━━━━━━`,
                        info.messageID,
                        threadID,
                        messageID
                    );
                } catch (error) {
                    api.sendMessage("An error occurred while processing your request.", threadID, messageID);
                }
            },
            messageID
        );
    },
};
