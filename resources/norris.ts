// import * as Axios from 'axios';
/* eslint-disable import/extensions, import/no-absolute-path */
import { generateSlackBlockKitMessage } from './layers/slack-utils/nodejs/hello';

/* eslint-disable import/extensions, import/no-absolute-path */
import { Axios } from './layers/axios/nodejs/axios-utils';

export const handler = async (event) => {
    const CHUCK_NORRIS_API_URL = process.env.API_URL
    if (!CHUCK_NORRIS_API_URL) {
        return {
            statusCode: 500,
        }
    }
    const client = Axios.default.create({});
    try {
        const joke = (await client.get(CHUCK_NORRIS_API_URL)).data?.value
        const blockHitMessage = generateSlackBlockKitMessage(joke)
        return {
            statusCode: 200,
            body: JSON.stringify(blockHitMessage),
        }
    } catch (err) {
        const blockHitMessage = generateSlackBlockKitMessage()
        return {
            statusCode: 200,
            body: JSON.stringify(blockHitMessage),
        }
    }

};
