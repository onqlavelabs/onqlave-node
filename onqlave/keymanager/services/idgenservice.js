const { v4 } = require("uuid");
const {CPRNGService} = require('./cprngservice')
/**
 * @class
 */
class IDService {
	/**
	 *
	 * @param randomService {CPRNGService}
	 */
	constructor(randomService) {
		this.randomService = randomService;
	}

	/**
	 *
	 * @returns {string}
	 */
	newStringID() {
		return v4();
	}

	/**
	 *
	 * @returns {number|number|*}
	 */
	newKeyID() {
		return this.randomService.getRandomUint32();
	}
}

module.exports =  {
	IDService,
};
