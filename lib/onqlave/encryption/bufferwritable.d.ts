export class BufferWritable extends Writable {
    constructor();
    _buffer: Buffer;
    _write(chunk: any, encoding: any, callback: any): void;
    buffer(): Buffer;
}
import { Writable } from "stream";
