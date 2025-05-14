declare module 'scheduler/tracing' {
  export interface InteractionsRef {
    current: Set<any>;
  }

  export interface Interaction {
    __count: number;
    id: number;
    name: string;
    timestamp: number;
  }

  export interface Subscriber {
    onInteractionTraced: (interaction: Interaction) => void;
    onInteractionScheduled: (interaction: Interaction, threadID: number) => void;
    onWorkStarted: (interactions: Set<Interaction>, threadID: number) => void;
    onWorkStopped: (interactions: Set<Interaction>, threadID: number) => void;
    onWorkCanceled: (interactions: Set<Interaction>, threadID: number) => void;
  }

  export function unstable_clear(callback: Function): any;
  export function unstable_getCurrent(): Interaction | null;
  export function unstable_getThreadID(): number;
  export function unstable_trace(name: string, timestamp: number, callback: Function, threadID?: number): any;
  export function unstable_wrap(callback: Function, threadID?: number): Function;
  export function unstable_subscribe(subscriber: Subscriber): () => void;
  export function unstable_track(name: string, timestamp: number, callback: Function, threadID?: number): any;
} 