class Configuration {
    constructor(credential, retrySettings, arxURL, debug) {
        this.credential = credential;
        this.retrySettings = retrySettings;
        this.debug = debug;
        this.extractArxURL(arxURL);

    }

    extractArxURL(arxURL) {
        const index = arxURL.lastIndexOf("/");
        this.arxUrl = arxURL.substring(0, index);
        this.arxId = arxURL.substring(index + 1);
    }
}

const INVALID_ARX = "invalid_arx";
module.exports = {
    Configuration, INVALID_ARX,
}