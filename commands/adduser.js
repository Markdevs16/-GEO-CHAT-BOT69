module.exports = {
    name: "adduser",
    description: "Add a user to the group chat using their UID",
    nashPrefix: false,
    version: "1.0.0",
    role: 0,
    cooldowns: 5,
    async execute(api, event, args) {
        const { threadID, messageID } = event;
        const uid = args[0];

        if (!uid) {
            return api.sendMessage(
                "🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n\n" +
                "⚠️Provide UID to Add.\n\nExample: adduser 1234567890",
                threadID,
                messageID
            );
        }

        api.sendMessage(
            "[ 𝙰𝙳𝙳 𝚄𝚂𝙴𝚁 ]\n\n" +
            "Attempting to add the user...",
            threadID,
            async (err, info) => {
                if (err) return;

                try {
                    await api.addUserToGroup(uid, threadID);
                    api.editMessage(
                        "🎀 𝗚𝗘𝗢 𝗧𝗘𝗖𝗛 𝗔𝗜69 🎀\n\n" +
                        "✅ User Added successfully!",
                        info.messageID
                    );
                } catch (error) {
                    api.sendMessage(
                        "❌ Failed to add user. Please check the UID and try again.",
                        threadID,
                        messageID
                    );
                }
            },
            messageID
        );
    },
};
