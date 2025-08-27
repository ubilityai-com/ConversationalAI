//add import
import { AiAgentJson } from "./AiAgentJson";
import { ApiChainJson } from "./ApiChainJson";
import { BasicLLMJson } from "./BasicLLMJson";
import { CompareDocumentsJson } from "./CompareDocumentsJson";
import { ConditionAgentJson } from "./ConditionAgentJson";
import { ConversationalAgentJson } from "./ConversationalAgentJson";
import { ConversationalRetrievalQaChainJson } from "./ConversationalRetrievalQaChainJson";
import { ConversationChainJson } from "./ConversationChainJson";
import { DataCollectorJson } from "./DataCollectorJson";
import { OpenAIFunctionsAgentJson } from "./OpenAIFunctionsAgentJson";
import { QuestionAndAnswerJson } from "./QuestionAndAnswerJson";
import { ReactAgentJson } from "./ReactAgentJson";
import { SqlDatabaseChainJson } from "./SqlDatabaseChainJson";
import { SummarizationChainJson } from "./SummarizationChainJson";
import { UpsertJson } from "./UpsertJson";
import { WebSearchAgentJson } from "./WebSearchAgentJson";

export const AIElements = [
    //add Component
    DataCollectorJson,
    ReactAgentJson,
    OpenAIFunctionsAgentJson,
    ConversationalAgentJson,
    WebSearchAgentJson,
    ConversationalRetrievalQaChainJson,
    ApiChainJson,
    AiAgentJson,
    CompareDocumentsJson,
    ConditionAgentJson,
    BasicLLMJson,
    ConversationChainJson,
    QuestionAndAnswerJson,
    SqlDatabaseChainJson,
    SummarizationChainJson,
    UpsertJson,
];
