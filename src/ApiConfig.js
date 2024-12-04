const isRunningOnEmulator = () => {
    return navigator.userAgent.includes('sdk_gphone');
};

const API_CONFIG = {
    BASE_URL: isRunningOnEmulator() ? "http://10.0.2.2:8080/api" : "http://192.168.100.219:8080/api",
    USERS: "/users",
    MESSAGES: "/messages"
};

export default API_CONFIG;