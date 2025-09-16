export const getHostDeviceModel = () => {
    const ua = navigator.userAgent;
    let os = "Unknown OS";
    let browser = "Unknown Browser";

    // Detect OS
    if (ua.indexOf("Win") !== -1) os = "Windows PC";
    if (ua.indexOf("Mac") !== -1) os = "MacBook/iMac";
    if (ua.indexOf("Linux") !== -1) os = "Linux PC";
    if (ua.indexOf("Android") !== -1) os = "Android Device";
    if (ua.indexOf("like Mac") !== -1 && ua.indexOf("iPad") !== -1) os = "iPad";
    if (ua.indexOf("like Mac") !== -1 && ua.indexOf("iPhone") !== -1) os = "iPhone";

    // Detect Browser
    if (ua.indexOf("Firefox") > -1) {
        browser = "Firefox";
    } else if (ua.indexOf("SamsungBrowser") > -1) {
        browser = "Samsung Internet";
    } else if (ua.indexOf("Opera") > -1 || ua.indexOf("OPR") > -1) {
        browser = "Opera";
    } else if (ua.indexOf("Trident") > -1) {
        browser = "Internet Explorer";
    } else if (ua.indexOf("Edge") > -1) {
        browser = "Edge";
    } else if (ua.indexOf("Chrome") > -1) {
        browser = "Chrome";
    } else if (ua.indexOf("Safari") > -1) {
        browser = "Safari";
    }

    return `${os} (${browser})`;
};