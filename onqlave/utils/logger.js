const {createLogger, format, config, transports} = require("winston");

class Logger {
	constructor(debug) {
		this.debug = debug;
	}

	initLogger() {
		const LEVEL_LOG_DEBUG = "debug";
		const LEVEL_LOG_DEFAULT = "error";
		let level, silent;
		switch (this.debug) {
		case true:
			level = LEVEL_LOG_DEBUG;
			break;
		default:
			level = LEVEL_LOG_DEFAULT;
			break;
		}

		const options = {
			console: {
				level, silent, handleExceptions: true,
				format: format.combine(format.colorize(), format.splat(), format.printf(info => `${new Date().toISOString()} ${info.level} ${info.message}`,),),
			},
		};

		return createLogger({
			levels: config.syslog.levels,
			transports: [new transports.Console(options.console)],
			exitOnError: false,
		});
	}
}

module.exports = {
	Logger,
};