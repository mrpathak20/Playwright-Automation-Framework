import type { SyncTestRuntime, TestRuntime } from "./types.js";
export declare const setGlobalTestRuntime: (runtime: TestRuntime) => void;
export declare const getGlobalTestRuntime: () => TestRuntime;
export declare const getGlobalSyncTestRuntime: () => SyncTestRuntime;
export declare const getGlobalSyncTestRuntimeWithAutoconfig: () => SyncTestRuntime;
export declare const getGlobalTestRuntimeWithAutoconfig: () => TestRuntime | Promise<TestRuntime>;
