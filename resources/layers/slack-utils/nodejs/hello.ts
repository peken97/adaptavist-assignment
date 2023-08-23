export const generateSlackBlockKitMessage = (joke = "I can't think of a joke right now!") => {
    return {
        response_type: "in_channel",
        "blocks": [
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": "*Chucks Norris Joke*"
                }
            },
            {
                "type": "section",
                "text": {
                    "type": "mrkdwn",
                    "text": `${joke}`
                }
            },

        ]
    }
}