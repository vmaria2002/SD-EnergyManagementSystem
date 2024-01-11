export function displayAllCookies() {
    const allCookies = document.cookie;
    const cookieArray = allCookies.split("; ");
    let cookieInfo = "Cookies:\n";

    for (const cookie of cookieArray) {
        const [key, value] = cookie.split("=");
        cookieInfo += `${key}: ${value}\n`;
        console.log(cookieInfo)
    }


}