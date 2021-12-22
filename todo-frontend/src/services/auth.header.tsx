export default function authenticationHeader() {
    const accessToken = sessionStorage.getItem("accessToken");

    if (accessToken) {
        const token = JSON.parse(accessToken);
        return { Authorization: `Bearer ${token}` };
    } else {
        return {};
    }
}