"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshAccessToken = void 0;
const googleClient_1 = require("../utils/googleClient");
const refreshAccessToken = async (req, res, next) => {
    if (req.session.refreshToken &&
        googleClient_1.client.credentials?.expiry_date &&
        googleClient_1.client.credentials.expiry_date < Date.now()) {
        try {
            googleClient_1.client.setCredentials({
                refresh_token: req.session.refreshToken,
            });
            const { credentials } = await googleClient_1.client.refreshAccessToken();
            googleClient_1.client.setCredentials(credentials);
        }
        catch (error) {
            console.error('Token refresh error:', error);
        }
    }
    next();
};
exports.refreshAccessToken = refreshAccessToken;
