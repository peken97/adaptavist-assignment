import * as AWS from 'aws-sdk';
import * as Axios from 'axios';


export const handler = async (event) => {
    const client = Axios.default.create({});

    const res = await client.get("https://api.chucknorris.io/jokes/random")

    return {
        statusCode: 200,
        body: JSON.stringify({
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
                        "text": `${res.data.value}`
                    }
                },

            ]
        }
        ),
    }
};
