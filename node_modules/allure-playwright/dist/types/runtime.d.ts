import { type AttachmentOptions, type ParameterMode } from "allure-js-commons";
import { type RuntimeMessage } from "allure-js-commons/sdk";
import type { SyncTestRuntime } from "allure-js-commons/sdk/runtime";
import { MessageTestRuntime } from "allure-js-commons/sdk/runtime";
export declare class AllurePlaywrightTestRuntime extends MessageTestRuntime {
    #private;
    private cachedPlaywrightSyncRuntime?;
    get sync(): SyncTestRuntime;
    step(stepName: string, body: () => any): Promise<any>;
    stepDisplayName(name: string): Promise<void>;
    stepParameter(name: string, value: string, mode?: ParameterMode): Promise<void>;
    attachment(name: string, content: Uint8Array | Buffer | string, options: AttachmentOptions): Promise<void>;
    attachmentFromPath(name: string, path: string, options: AttachmentOptions): Promise<void>;
    sendMessageSync(message: RuntimeMessage): void;
    sendMessage(message: RuntimeMessage): Promise<void>;
}
