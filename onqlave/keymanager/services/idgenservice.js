const { v4 } = require("uuid");

class IDService {
	constructor(randomService) {
		this.randomService = randomService;
	}

	newStringID() {
		return v4();
	}

	newKeyID() {
		return this.randomService.getRandomUint32();
	}
}

module.exports =  {
	IDService,
};
