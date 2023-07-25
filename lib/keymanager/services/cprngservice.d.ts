export type Bytes = import('node-forge').Bytes;
/**
 * @class
 * @typedef {import('node-forge').Bytes} Bytes
 */
export class CPRNGService {
    /**
     *
     * @param size {number}
     * @returns {Bytes}
     */
    getRandomBytes(size: number): Bytes;
    /**
     *
     * @returns {number}
     */
    getRandomUint32(): number;
}
