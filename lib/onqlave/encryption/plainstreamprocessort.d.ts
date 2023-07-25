export class PlainStreamProcessor {
    constructor(stream: any);
    stream: Writable;
    writeHeader(algorithm: any): Promise<any>;
    writePacket(packet: any): Promise<any>;
    writePlainPacket(packet: any): Promise<any>;
}
import { Writable } from "stream";
