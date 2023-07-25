export class Client {
    constructor(retrySettings?: RetrySettings, logger?: Console);
    retrySettings: RetrySettings;
    logger: Console;
    post(resource: any, body: any, headers: any): Promise<any>;
}
export class RetrySettings {
    constructor(count?: number, waitTime?: number, maxWaitTime?: number);
    count: number;
    waitTime: number;
    maxWaitTime: number;
    valid(): null;
}
export declare function NewClient(retrySettings?: RetrySettings, logger?: Console): Client;
