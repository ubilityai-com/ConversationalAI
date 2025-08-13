// create-file.js
const fs = require("fs");
const path = require("path");
const type = process.argv[2];
const rawName = process.argv[3];
// Allowed types
const allowedTypes = ["model", "embedding", "memory", "tool", "outputParser", "vectorStore"];

if (!type || !rawName) {
  console.error("❌ Usage: node script.js <type> <name>");
  console.log("✅ Available types:", allowedTypes.join(", "));
  process.exit(1);
}

// Validate type
if (!allowedTypes.includes(type)) {
  console.error(`❌ Invalid type: "${type}"`);
  console.log("✅ Available types:", allowedTypes.join(", "));
  process.exit(1);
}
if (!rawName) {
    console.error("❌ Please provide a name.");
    process.exit(1);
}

const Name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
const dashName = type
.replace(/([a-z0-9])([A-Z])/g, "$1-$2") // camelCase → dash-case
.toLowerCase();
const dirPath = path.join(__dirname, "src", "elements", `${dashName}-elements`);

function createIntegrationFile(name) {
    const filePath = path.join(dirPath, `${name}Json.js`);
    const template = `export const ${name}Json = {
  "category": "${type}",
  "type": "${name}",
  "label": "${name}",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/${name}/getting_started",
  "description": "${name}",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "rightSideData": {
    "json": []
  }
};`;

    fs.mkdirSync(dirPath, { recursive: true });

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template, "utf8");
        console.log(`✅ Created: ${filePath}`);
    } else {
        console.log(`⚠️ File already exists: ${filePath}`);
    }
}

function updateIndexFile(name) {
    const indexPath = path.join(dirPath, "index.ts");
    if (!fs.existsSync(indexPath)) {
        console.error(`❌ index.ts not found at ${indexPath}`);
        process.exit(1);
    }

    let indexContent = fs.readFileSync(indexPath, "utf8");

    const importLine = `import { ${name}Json } from "./${name}Json";`;
    if (!indexContent.includes(importLine)) {
        indexContent = indexContent.replace(
            "// add import",
            `// add import\n${importLine}`
        );
    }

    const componentSection = indexContent.split("//add Component")[1] || "";
    if (!componentSection.includes(`${name}Json`)) {
        indexContent = indexContent.replace(
            "// add Component",
            `// add Component\n    ${name}Json,`
        );
    }

    fs.writeFileSync(indexPath, indexContent, "utf8");
    console.log(`✅ Updated: ${indexPath}`);
}
function appendFunctionToFile() {
    const dashName = type
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // camelCase → dash-case
    .toLowerCase();
    const filePath = path.join(
        __dirname,
        "src",
        "components",
        "properties",
        "contents",
        `${(dashName)}.ts`
    );
    const functionCode = `  
  export function getContent(selectedNode: any) {
    const ${type} = selectedNode.data.rightSideData.extras.${type}
    const json = ${type}.content.json
    return {};
  }`
    if (!fs.existsSync(filePath)) {
        console.error(`❌ File not found: ${filePath}`);
        process.exit(1);
    }

    let fileContent = fs.readFileSync(filePath, "utf8");

    // Ensure there's a newline before appending
    if (!fileContent.endsWith("\n")) {
        fileContent += "\n";
    }

    fileContent += `\n${functionCode}\n`;

    fs.writeFileSync(filePath, fileContent, "utf8");
    console.log(`✅ Appended function to: ${filePath}`);
}
// Run tasks
createIntegrationFile(Name);
updateIndexFile(Name);
appendFunctionToFile(Name)
