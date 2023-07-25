/**
 * @class
 */
export class IDService {
    /**
     *
     * @param randomService {CPRNGService}
     */
    constructor(randomService: CPRNGService);
    randomService: CPRNGService;
    /**
     *
     * @returns {string}
     */
    newStringID(): string;
    /**
     *
     * @returns {number|number|*}
     */
    newKeyID(): number | number | any;
}
import { CPRNGService } from "./cprngservice";
