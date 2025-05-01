"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.twitterCallback = exports.startTwitterAuth = void 0;
const TwitterAuth_1 = require("../utils/TwitterAuth");
const axios_1 = __importDefault(require("axios"));
const startTwitterAuth = (req, res) => {
    const url = (0, TwitterAuth_1.generateTwitterAuthUrl)();
    res.redirect(url);
};
exports.startTwitterAuth = startTwitterAuth;
const twitterCallback = async (req, res, next) => {
    const { code } = req.query;
    if (!code || typeof code !== 'string') {
        res.status(400).send('Code missing');
        return;
    }
    try {
        const tokenData = await (0, TwitterAuth_1.getTwitterAccessToken)(code);
        const accessToken = tokenData.access_token;
        if (!tokenData) {
            return res.redirect("/");
        }
        const userResponse = await axios_1.default.get("https://api.twitter.com/2/users/me", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${accessToken}`,
            },
        });
        const user = userResponse.data;
        req.session.user = {
            name: user.data.name,
            twitterId: user.data.id,
            username: user.data.username,
        };
        res.redirect('/');
    }
    catch (err) {
        console.error(err);
        res.status(500).send('Error during Twitter login');
    }
};
exports.twitterCallback = twitterCallback;
