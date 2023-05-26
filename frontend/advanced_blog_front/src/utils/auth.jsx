import Cookies from "js-cookie";

export default async function get_access_token(base_url, refresh_token) {
    console.log('refresh token ', refresh_token)
    const refresh_url = base_url + 'account/api/v1/token/refresh/'
    const response = await fetch(refresh_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({"refresh": refresh_token})
    })
    if (response.status === 200) {
        const data = await response.json()
        const expireAccess = new Date();
        expireAccess.setTime(expireAccess.getTime() + 5 * 60 * 1000);
        Cookies.set('Access_token', data['access'], {expires: expireAccess});
    }
}
