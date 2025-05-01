"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleFacebookCallback = exports.redirectToFacebook = void 0;
const axios_1 = __importDefault(require("axios"));
const facebookAuth_1 = require("../utils/facebookAuth");
const redirectToFacebook = async (req, res, next) => {
    const url = (0, facebookAuth_1.facebookUrl)();
    res.redirect(url);
};
exports.redirectToFacebook = redirectToFacebook;
const handleFacebookCallback = async (req, res, next) => {
    const { code } = req.query;
    try {
        const { data } = await axios_1.default.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${process.env.APP_ID}&client_secret=${process.env.APP_SECRET}&code=${code}&redirect_uri=${process.env.REDIRECT_URI}`);
        const { access_token } = data;
        const { data: profile } = await axios_1.default.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);
        res.redirect('/');
    }
    catch (error) {
        res.redirect('/login');
    }
};
exports.handleFacebookCallback = handleFacebookCallback;
