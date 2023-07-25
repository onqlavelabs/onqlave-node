export class Hasher {
    digest(body: any): Promise<string>;
    sign(headers: any, signingKey: any): Promise<string>;
}
export declare function NewHasher(): Hasher;
