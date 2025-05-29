//add import
import { ConversationBufferWindowMemoryJson } from "./ConversationBufferWindowMemoryJson";
import { ConversationSummaryBufferMemoryJson } from "./ConversationSummaryBufferMemoryJson";
import { ConversationalBufferMemoryJson } from "./ConversationalBufferMemoryJson";
import { RedisStackMemoryJson } from "./RedisStackMemoryJson";

export const MemoryElements = [
    //add Component
    ConversationSummaryBufferMemoryJson,
    ConversationBufferWindowMemoryJson,
    ConversationalBufferMemoryJson,
    RedisStackMemoryJson,
];
