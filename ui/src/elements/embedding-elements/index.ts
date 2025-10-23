import { EmbeddingsCohereJson } from "./EmbeddingsCohereJson";
import { EmbeddingsFireworksJson } from "./EmbeddingsFireworksJson";
import { EmbeddingsGoogleGenerativeAIJson } from "./EmbeddingsGoogleGenerativeAIJson";
import { EmbeddingsMistralAIJson } from "./EmbeddingsMistralAIJson";
import { EmbeddingsNomicJson } from "./EmbeddingsNomicJson";
import { EmbeddingsNvidiaJson } from "./EmbeddingsNvidiaJson";
import { EmbeddingsOllamaJson } from "./EmbeddingsOllamaJson";
import { EmbeddingsOpenAIJson } from "./EmbeddingsOpenAIJson";
import { EmbeddingsTogetherAIJson } from "./EmbeddingsTogetherAIJson";
import { EmbeddingsIBMWatsonxJson } from "./EmbeddingsIBMWatsonxJson";

const EmbeddingElements = [
    EmbeddingsOpenAIJson,
    EmbeddingsOllamaJson,
    EmbeddingsGoogleGenerativeAIJson,
    EmbeddingsMistralAIJson,
    EmbeddingsCohereJson,
    EmbeddingsTogetherAIJson,
    EmbeddingsFireworksJson,
    EmbeddingsNvidiaJson,
    EmbeddingsNomicJson,
    EmbeddingsIBMWatsonxJson,
];
export default EmbeddingElements