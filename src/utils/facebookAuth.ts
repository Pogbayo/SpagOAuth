
export const facebookUrl = ()=>{
    const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${process.env.APP_ID}&redirect_uri=${process.env.REDIRECT_URI}&scope=email`;
    return url;
}