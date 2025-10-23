import { AutomationItem } from "../types/automation-types";
export function getAutomationListValues(apiRes: AutomationItem[]): Record<string, any> {
  const obj: Record<string, any> = {};

  const processValue = (val: any, typeOfValue?: string): any => {
    if (typeOfValue === "integer") return parseInt(val) || val;
    if (typeOfValue === "float") return parseFloat(val);
    if (typeOfValue === "array") return [val];
    return val;
  };

  const mergeOptionFields = (
    options: Record<string, AutomationItem[]> | undefined,
    value: string | undefined,
    accumulator: Record<string, any>
  ) => {
    if (options && value && options[value]) {
      Object.assign(accumulator, getAutomationListValues(options[value]));
    }
  };

  for (const item of apiRes) {
    switch (item.type) {
      // ✅ Dropdown / API
      case "dropdown":
      case "api": {
        if (item.value !== "") {
          if ("credential" in item && item.credential && item.list) {
            obj[item.variableName] =
              item.list.length > 1
                ? item.list.find((c) => c.option === item.value)?.cred ?? ""
                : "";
          } else {
            obj[item.variableName] = processValue(
              item.value,
              "typeOfValue" in item ? item.typeOfValue : undefined
            );
          }
          mergeOptionFields(item.options, item.value, obj);
        }
        break;
      }

      // ✅ Text input / Editor
      case "textfield":
      case "editor": {
        if (item.value?.toString().trim()) {
          obj[item.variableName] = processValue(
            item.value,
            "typeOfValue" in item ? item.typeOfValue : undefined
          );
        }
        break;
      }

      // ✅ Text Formatter
      case "textFormatter": {
        if (item.value?.trim()) {
          obj[item.variableName] = item.value;
        }
        break;
      }

      // ✅ MultiSelect
      case "multiselect": {
        if (Array.isArray(item.value) && item.value.length > 0) {
          obj[item.variableName] = item.value;
        }
        break;
      }

      // ✅ Array
      case "array": {
        if (Array.isArray(item.value) && item.value.length > 0) {
          obj[item.variableName] = item.value;
        }
        break;
      }

      // ✅ JSON
      case "json": {
        if (item.value && Object.keys(item.value).length > 0) {
          obj[item.variableName] = item.value;
        }
        break;
      }

      // ✅ Checkbox
      case "checkbox": {
        obj[item.variableName] =
          item.typeOfValue === "string" ? item.value?.toString() : item.value;
        break;
      }

      // ✅ RadioButton
      case "radiobutton": {
        obj[item.variableName] = item.value;
        mergeOptionFields(item.options, item.value, obj);
        break;
      }

      // ✅ Color
      case "color": {
        if (item.value?.trim()) {
          obj[item.variableName] = item.value;
        }
        break;
      }

      // ✅ Accordion
      case "accordion": {
        if (item.fieldsArray?.[0]) {
          obj[item.variableName] = getAutomationListValues(item.fieldsArray[0]);
        }
        break;
      }

      // ✅ Dynamic
      case "dynamic": {
        const target = item.json ?? item;
        if (Array.isArray(target.fieldsArray)) {
          const arrayData = target.fieldsArray.map((arr) =>
            getAutomationListValues(arr)
          );
          obj[target.variableName] = arrayData;
        } else {
          obj[target.variableName] = target.fieldsArray; // if it's "##AI##" or similar
        }
        break;
      }

      default:
        break;
    }
  }

  return obj;
}


export function selectedOptionKeys(
  apiRes: AutomationItem[],
  fieldsValue: Record<string, any>
): string[] {
  let keys: string[] = [];

  for (const item of apiRes) {
    switch (item.type) {
      case "outputJson":
        // Skip outputJson
        break;

      case "dropdown":
      case "radiobutton": {
        const selectedValue = fieldsValue[item.variableName];
        if (item.options && selectedValue && item.options[selectedValue]) {
          keys = [
            ...keys,
            ...selectedOptionKeys(item.options[selectedValue], fieldsValue),
          ];
        }
        keys.push(item.variableName);
        break;
      }

      case "dynamic": {
        const target = item.json ?? item;
        keys.push(target.variableName);
        break;
      }

      default:
        keys.push(item.variableName);
        break;
    }
  }

  return keys;
}

export function replaceTags(
  inputString: string,
  tagToReplace: string,
  replacementChars: string
): string {
  const pattern = new RegExp(`<${tagToReplace}>(.*?)<\/${tagToReplace}>`, "gs");

  return inputString.replace(pattern, (_, content: string) => {
    const trimmedText = content.trim();
    const spacesCount = content.length - trimmedText.length;
    return `${replacementChars}${trimmedText}${replacementChars}${" ".repeat(
      spacesCount
    )}`;
  });
}

export function replaceLink(inputString: string): string {
  const pattern =
    /<a href="([^"]+)"[^>]*>(?:<(?:strong|em|s)>){0,3}([^<]+)(?:<\/(?:strong|em|s)>){0,3}<\/a>/g;
  return inputString.replace(pattern, "<$1|$2>");
}

export function replaceParandBr(inputString: string): string {
  const pattern = /<p>([\s\S]*?)<\/p>|<br>/g;

  return inputString.replace(pattern, (_match, p1?: string) => {
    return p1 ? p1.trim() + "\n" : "\n";
  });
}

export function replaceCodeBlock(inputString: string): string {
  const pattern = /<pre.*?>([\s\S]*?)<\/pre>/g; // replaced (.*?) with ([\s\S]*?)
  return inputString.replace(pattern, "```$1```");
}

export function replaceMultipleOccurrences(
  inputString: string,
  array: any
): string {
  let str = inputString
    .replace(/<br>/g, "\n")
    .replace(/<span[^>]*>(.*?)<\/span>/g, "$1");

  str = replaceParandBr(str);

  array.forEach((opt: any) => {
    if (opt.type === "link") {
      str = replaceLink(str);
    } else if (opt.type === "code-block") {
      str = replaceCodeBlock(str);
    } else if (opt.toSearch && opt.toReplace) {
      str = replaceTags(str, opt.toSearch, opt.toReplace);
    }
  });

  return str;
}
/**
 * Reverts the result of replaceMultipleOccurrences back to its approximate original HTML structure.
 */
function reverseMultipleOccurrences(inputString: string, array: any): string {
  let str = inputString;
  // 1️⃣ Reverse `replaceCodeBlock`: ```code``` => <pre>code</pre>
  const codeBlockPattern = /```([\s\S]*?)```/g;
  str = str.replace(codeBlockPattern, (_match, codeContent) => {
    return `<pre>${codeContent}</pre>`;
  });

  // 2️⃣ Reverse `replaceLink`: <url|text> => <a href="url">text</a>
  const linkPattern = /<([^|]+)\|([^>]+)>/g;
  str = str.replace(linkPattern, (_match, url, text) => {
    return `<a href="${url}">${text}</a>`;
  });

  // 3️⃣ Reverse replaceTags: **text** => <b>text</b>, etc.
  array.forEach((opt: any) => {
    if (opt.toSearch && opt.toReplace) {
      const escapedReplace = opt.toReplace.replace(
        /[-/\\^$*+?.()|[\]{}]/g,
        "\\$&"
      ); // escape special chars
      const tag = opt.toSearch;

      const tagPattern = new RegExp(
        `${escapedReplace}(.*?)${escapedReplace}`,
        "gs"
      );
      str = str.replace(tagPattern, (_match, innerContent) => {
        return `<${tag}>${innerContent}</${tag}>`;
      });
    }
  });

  // 4️⃣ Reverse replaceParandBr and <br> => \n
  str = str.replace(/\n/g, "<br>");

  return str;
}

export function parseAutomationListValues(
  apiRes: AutomationItem[],
  fieldValues: Record<string, any>
): Record<string, any> {
  const obj: Record<string, any> = {};

  const processValue = (val: any, typeOfValue?: string): any => {
    if (typeOfValue === "integer") return parseInt(val) || val;
    if (typeOfValue === "float") return parseFloat(val);
    if (typeOfValue === "array") return [val];
    return val;
  };

  const mergeOptionFields = (
    options: Record<string, AutomationItem[]> | undefined,
    value: string | undefined,
    fieldValues: Record<string, any>,
    accumulator: Record<string, any>
  ) => {
    if (options && value && options[value]) {
      Object.assign(
        accumulator,
        parseAutomationListValues(options[value], fieldValues)
      );
    }
  };

  for (const item of apiRes) {
    const valueToSend = fieldValues[item.variableName];

    switch (item.type) {
      case "dropdown":
      case "api": {
        if ((valueToSend !== "") || valueToSend) {
          if ("credential" in item && item.credential && item.list) {
            obj[item.variableName] = valueToSend;
          } else {
            obj[item.variableName] = processValue(
              valueToSend,
              "typeOfValue" in item ? item.typeOfValue : undefined
            );
          }
          mergeOptionFields(item.options, valueToSend, fieldValues, obj);
        }
        break;
      }

      case "textfield":
      case "editor": {
        if (valueToSend?.toString().trim()) {
          obj[item.variableName] = processValue(
            valueToSend,
            "typeOfValue" in item ? item.typeOfValue : undefined
          );
        }
        break;
      }

      case "textFormatter": {
        if (valueToSend?.trim()) {
          obj[item.variableName] = item.custom
            ? replaceMultipleOccurrences(valueToSend, item.formats)
            : valueToSend.replace(/\n/g, "\\n");
        }
        break;
      }

      case "multiselect":
      case "array": {
        if (Array.isArray(valueToSend) && valueToSend.length > 0) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "json": {
        if (valueToSend && Object.keys(valueToSend).length > 0) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "checkbox": {
        obj[item.variableName] =
          "typeOfValue" in item && item.typeOfValue === "string"
            ? valueToSend?.toString()
            : valueToSend;
        break;
      }

      case "radiobutton": {
        obj[item.variableName] = valueToSend;
        mergeOptionFields(item.options, valueToSend, fieldValues, obj);
        break;
      }

      case "color": {
        if (valueToSend?.trim()) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "accordion": {
        if (item.fieldsArray?.[0] && fieldValues[item.variableName]) {
          obj[item.variableName] = parseAutomationListValues(
            item.fieldsArray[0],
            fieldValues[item.variableName]
          );
        }
        break;
      }

      case "dynamic": {
        const target = item.json ?? item;
        const valueArr = fieldValues[target.variableName];
        if (Array.isArray(valueArr)) {
          const arrayData = valueArr.map((arr: Record<string, any>) =>
            parseAutomationListValues(target.structure, arr)
          );
          obj[target.variableName] = arrayData;
        } else {
          obj[target.variableName] = [];
        }
        break;
      }

      default:
        break;
    }
  }

  return obj;
}
export function formatAutomationListValues(
  apiRes: AutomationItem[],
  fieldValues: Record<string, any>
): Record<string, any> {
  const obj: Record<string, any> = {};

  const mergeOptionFields = (
    options: Record<string, AutomationItem[]> | undefined,
    value: string | undefined,
    fieldValues: Record<string, any>,
    accumulator: Record<string, any>
  ) => {
    if (options && value && options[value]) {
      Object.assign(
        accumulator,
        formatAutomationListValues(options[value], fieldValues)
      );
    }
  };

  for (const item of apiRes) {
    const valueToSend = fieldValues[item.variableName];

    switch (item.type) {
      case "dropdown":
      case "api": {
        if ((valueToSend !== "") || valueToSend) {
          if ("credential" in item && item.credential && item.list) {
            obj[item.variableName] = valueToSend;
          } else {
            obj[item.variableName] = valueToSend;
          }
          mergeOptionFields(item.options, valueToSend, fieldValues, obj);
        }
        break;
      }

      case "textfield":
      case "editor": {
        if (valueToSend?.toString().trim()) {
          obj[item.variableName] = valueToSend.toString();
        }
        break;
      }

      case "textFormatter": {
        if (valueToSend?.trim()) {
          obj[item.variableName] = item.custom
            ? reverseMultipleOccurrences(valueToSend, item.formats)
            : valueToSend.replace(/\n/g, "\\n");
        }
        break;
      }

      case "multiselect":
      case "array": {
        if (Array.isArray(valueToSend) && valueToSend.length > 0) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "json": {
        if (valueToSend && Object.keys(valueToSend).length > 0) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "checkbox": {
        obj[item.variableName] =
          "typeOfValue" in item && item.typeOfValue === "string"
            ? valueToSend?.toString()
            : valueToSend;
        break;
      }

      case "radiobutton": {
        obj[item.variableName] = valueToSend;
        mergeOptionFields(item.options, valueToSend, fieldValues, obj);
        break;
      }

      case "color": {
        if (valueToSend?.trim()) {
          obj[item.variableName] = valueToSend;
        }
        break;
      }

      case "accordion": {
        if (item.fieldsArray?.[0] && fieldValues[item.variableName]) {
          obj[item.variableName] = formatAutomationListValues(
            item.fieldsArray[0],
            fieldValues[item.variableName]
          );
        }
        break;
      }

      case "dynamic": {
        const target = item.json ?? item;
        const valueArr = fieldValues[target.variableName];
        if (Array.isArray(valueArr)) {
          const arrayData = valueArr.map((arr: Record<string, any>) =>
            formatAutomationListValues(target.structure, arr)
          );
          obj[target.variableName] = arrayData;
        } else {
          obj[target.variableName] = valueArr;
        }
        break;
      }

      default:
        break;
    }
  }

  return obj;
}

export const getAccvalue = (finaleObj: any, name: string) => {
  if (name.includes(".")) {
    const properties = name.split(".");
    const firstPart = properties[0];
    const secondPart = properties[1];
    return finaleObj[firstPart]
      ? finaleObj[firstPart][secondPart]
        ? finaleObj[firstPart][secondPart] || undefined
        : undefined
      : undefined;
  } else
    return finaleObj[name]
      ? finaleObj[name][name]
        ? finaleObj[name][name] || undefined
        : undefined
      : undefined;
};
export function isJsonString(str: string) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}