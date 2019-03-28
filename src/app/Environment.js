const Environment = () => {
    return {
        REST_API_URL: window.appSettings.REST_API_URL,
        LOGIN_URL: window.appSettings.LOGIN_URL,
        LOG_VALIDATION: window.appSettings.LOG_VALIDATION,
    };
};

export default Environment();
