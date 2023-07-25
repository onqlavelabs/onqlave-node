export class Hasher {
    /**
     *
     * @param body {EncryptionOpenRequest | DecryptionOpenRequest}
     * @returns {string}
     */
    digest(body: EncryptionOpenRequest | DecryptionOpenRequest): string;
    /**
     *
     * @param headers {Object.<string,string>}
     * @param signingKey {string}
     * @returns {string}
     */
    sign(headers: {
        [x: string]: string;
    }, signingKey: string): string;
}
import { EncryptionOpenRequest } from "../contracts/requests/requests";
import { DecryptionOpenRequest } from "../contracts/requests/requests";
export declare function NewHasher(): Hasher;
