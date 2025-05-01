"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleGoogleCallback = exports.logout = exports.redirectToGoogle = void 0;
const googleClient_1 = require("../utils/googleClient");
const redirectToGoogle = (req, res) => {
    const url = googleClient_1.client.generateAuthUrl({
        access_type: 'offline',
        prompt: "consent",
        scope: [
            'https://www.googleapis.com/auth/userinfo.profile',
            'https://www.googleapis.com/auth/userinfo.email'
        ],
        redirect_uri: process.env.GOOGLE_REDIRECT_URI // ✅ Add this
    });
    res.redirect(url);
};
exports.redirectToGoogle = redirectToGoogle;
const logout = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
            return res.status(500).send("Couldn't log out.");
        }
        res.redirect('/');
    });
};
exports.logout = logout;
const handleGoogleCallback = async (req, res) => {
    const code = req.query.code;
    const queryError = req.query.error;
    if (queryError) {
        console.error('Google returned an error in query:', queryError);
        return res.redirect('/auth/google?error=' + queryError);
    }
    if (!code) {
        res.status(400).send('Authorization code is missing');
        return;
    }
    try {
        const { tokens } = await googleClient_1.client.getToken(code);
        req.session.refreshToken = tokens.refresh_token ?? undefined;
        const ticket = await googleClient_1.client.verifyIdToken({
            idToken: tokens.id_token || '',
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const payload = ticket.getPayload();
        req.session.user = {
            name: payload?.name,
            email: payload?.email,
            picture: payload?.picture,
        };
        return res.redirect('/');
    }
    catch (error) {
        console.error('Google Auth Error:', error);
        if (error?.message?.includes('Token used too late')) {
            return res.redirect('/auth/google?error=token_expired');
        }
        res.status(500).send('Internal Server Error');
        return;
    }
};
exports.handleGoogleCallback = handleGoogleCallback;
