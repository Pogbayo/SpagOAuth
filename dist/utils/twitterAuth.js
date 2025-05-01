"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTwitterAccessToken = exports.generateTwitterAuthUrl = void 0;
const axios_1 = __importDefault(require("axios"));
const querystring_1 = __importDefault(require("querystring"));
const generateTwitterAuthUrl = () => {
    const params = {
        response_type: 'code',
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: process.env.TWITTER_REDIRECT_URI,
        scope: 'tweet.read users.read offline.access',
        state: 'random_string',
        code_challenge: 'challenge',
        code_challenge_method: 'plain',
    };
    return `https://twitter.com/i/oauth2/authorize?${querystring_1.default.stringify(params)}`;
};
exports.generateTwitterAuthUrl = generateTwitterAuthUrl;
const getTwitterAccessToken = async (code) => {
    const body = {
        code,
        grant_type: 'authorization_code',
        client_id: process.env.TWITTER_CLIENT_ID,
        redirect_uri: process.env.TWITTER_REDIRECT_URI,
        code_verifier: 'challenge',
    };
    try {
        const response = await axios_1.default.post('https://api.twitter.com/2/oauth2/token', querystring_1.default.stringify(body), {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: 'Basic ' + Buffer.from(`${process.env.TWITTER_CLIENT_ID}:${process.env.TWITTER_CLIENT_SECRET}`).toString('base64'),
            },
        });
        // console.log("This is the response",response.data)
        return response.data;
    }
    catch (err) {
        console.error('Error getting Twitter access token:', err);
        throw new Error('Failed to retrieve access token from Twitter');
    }
};
exports.getTwitterAccessToken = getTwitterAccessToken;
