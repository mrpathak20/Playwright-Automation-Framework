import type { RuntimeMessage } from "../types.js";
import { MessageTestRuntime } from "./MessageTestRuntime.js";
export declare class MessageHolderTestRuntime extends MessageTestRuntime {
    private messagesHolder;
    sendMessage(message: RuntimeMessage): Promise<void>;
    sendMessageSync(message: RuntimeMessage): void;
    messages(): RuntimeMessage[];
}
