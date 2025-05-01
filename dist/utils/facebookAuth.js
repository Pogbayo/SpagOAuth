"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.facebookUrl = void 0;
const facebookUrl = () => {
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email`;
    return url;
};
exports.facebookUrl = facebookUrl;
