export class BufferEncryptedStreamProcessor {
    constructor(cipherStream: any);
    cipherStream: Readable;
    _buffer: Buffer;
    readHeader(): Promise<AlgorithmDeserialiser>;
    readPacket(): Promise<any>;
    readNBytes(n: any): Promise<any>;
}
export class EncryptedStreamProcessor {
    _buffer: any;
    readHeader(chunk: any): AlgorithmDeserialiser;
    readPacket(chunk: any): any;
}
import { Readable } from "stream";
import { AlgorithmDeserialiser } from "./algorithmdeserialiser";
