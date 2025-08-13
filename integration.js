// create-file.js
const fs = require("fs");
const path = require("path");

const rawName = process.argv[2];
if (!rawName) {
    console.error("❌ Please provide a name.");
    process.exit(1);
}

const Name = rawName.charAt(0).toUpperCase() + rawName.slice(1);
const dirPath = path.join(__dirname, "src", "elements", "integration-elements");

function createIntegrationFile(name) {
    const filePath = path.join(dirPath, `${name}Json.js`);
    const template = `export const ${name}Json = {
  "category": "integration",
  "type": "${name}",
  "label": "${name}",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/${name}/getting_started",
  "description": "${name} integration",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "defaults": {
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
            "//add import",
            `//add import\n${importLine}`
        );
    }

    const componentSection = indexContent.split("//add Component")[1] || "";
    if (!componentSection.includes(`${name}Json`)) {
        indexContent = indexContent.replace(
            "//add Component",
            `//add Component\n    ${name}Json,`
        );
    }

    fs.writeFileSync(indexPath, indexContent, "utf8");
    console.log(`✅ Updated: ${indexPath}`);
}

function updateFlowZoneFile(name) {
    const flowZonePath = path.join(__dirname, "src", "flow-zone.js");
    if (!fs.existsSync(flowZonePath)) {
        console.error(`❌ flow-zone.js not found at ${flowZonePath}`);
        process.exit(1);
    }

    let flowZoneContent = fs.readFileSync(flowZonePath, "utf8");

    // Only check after "// integration nodes" comment
    const afterIntegrationComment = flowZoneContent.split("// integration nodes")[1] || "";
    const nodeLine = `    ${name}: IntegrationNode,`;
    if (!afterIntegrationComment.includes(`${name}: IntegrationNode`)) {
        flowZoneContent = flowZoneContent.replace(
            "// integration nodes",
            `// integration nodes\n${nodeLine}`
        );
        fs.writeFileSync(flowZonePath, flowZoneContent, "utf8");
        console.log(`✅ Updated: ${flowZonePath}`);
    } else {
        console.log(`⚠️ Node already exists in ${flowZonePath}`);
    }
}
function createBuildContentFile(name) {
    const dashName = name
        .replace(/([a-z0-9])([A-Z])/g, "$1-$2") // camelCase → dash-case
        .toLowerCase();
    const lowerName = name.toLowerCase();

    const dirPath = path.join(
        __dirname,
        "src",
        "components",
        "right-side-elements",
        "integration-elements",
        dashName
    );

    const filePath = path.join(dirPath, "build-content.ts");

    const template = `import { getAccvalue } from "../../../../lib/automation-utils";
  import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";
  
  export default function getContent(selectedNode: any) {
      const rightSideData = selectedNode.data.rightSideData;
      const inputs = rightSideData.json;
  
      let jsonToSend = {};
     
      const content = {
          type: "data",
          data: {
              content_json: jsonToSend,
              app: "${lowerName}",
              credential: inputs.cred,
              operation: inputs.operation,
              saveOutputAs: getOutputVariablesByNodeId(selectedNode.id),
          },
      };
      return {
          type: "AppIntegration",
          content: content,
          cred: inputs?.cred,
      };
  }`;

    fs.mkdirSync(dirPath, { recursive: true });

    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, template, "utf8");
        console.log(`✅ Created: ${filePath}`);
    } else {
        console.log(`⚠️ File already exists: ${filePath}`);
    }
}


// Run tasks
createIntegrationFile(Name);
updateIndexFile(Name);
updateFlowZoneFile(Name);
createBuildContentFile(Name)
