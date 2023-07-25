export class AlgorithmDeserialiser {
    constructor(version: any, algo: any, key: any);
    version: any;
    algo: any;
    key: any;
    deserialize(buffer: any): any;
    getAlgorithm(): any;
    getKey(): any;
    getVersion(): any;
}
