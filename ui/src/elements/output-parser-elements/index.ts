// add import
import { customListOutputParserJson } from "./CustomListOutputParserJson";
import { StructuredOutputParserJson } from "./StructuredOutputParserJson";

const OutputParserElements = [
    // add Component
    StructuredOutputParserJson,
    customListOutputParserJson
];
export default OutputParserElements