export class Connection {
    constructor(configuration: any, hasher: any, logger?: Console);
    client: {
        retrySettings: {
            count: number;
            waitTime: number;
            maxWaitTime: number;
            valid(): null;
        };
        logger: Console;
        post(resource: any, body: any, headers: any): Promise<any>;
    };
    hasher: any;
    logger: Console;
    configuration: any;
    post(resource: any, body: any): Promise<any>;
}
export class Configuration {
    constructor(credential: any, retry: any, arxUrl: any, arxId: any);
    credential: any;
    retry: any;
    arxUrl: any;
    arxId: any;
}
export class Credential {
    constructor(accessKey: any, signingKey: any);
    accessKey: any;
    signingKey: any;
}
export declare function NewConnection(configuration: any, hasher: any, logger?: Console): Connection;
