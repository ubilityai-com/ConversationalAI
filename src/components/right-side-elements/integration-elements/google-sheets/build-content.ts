import { getAccvalue } from "../../../../lib/automation-utils";
  import { getOutputVariablesByNodeId } from "../../../../lib/variable-utils";
  
  export default function getContent(selectedNode: any) {
      const rightSideData = selectedNode.data.rightSideData;
      const inputs = rightSideData.json;
  
      let jsonToSend = {};

      if (inputs.type === "Document") {
        if (inputs.operation === "CREATE_SPREADSHEET") {
          jsonToSend = {
            properties: {
              title: inputs.title,
              locale: inputs.locale_document_create_spreadsheet.locale,
              autoRecalc:
                inputs.autoRecalc_document_create_spreadsheet.autoRecalc,
            },
          };
          jsonToSend = {
            ...jsonToSend,
            sheets: inputs.sheet_info.map((sheet:any) => {
              return {
                properties: {
                  title: sheet.title_sheet,
                  hidden: sheet.hidden_sheet,
                },
              };
            }),
          };
        } else if (inputs.operation === "DELETE_SPREADSHEET") {
          jsonToSend = {
            ...jsonToSend,
            spreadsheetId: inputs.spreadsheetId,
          };
        }
      } else if (inputs.type === "Sheet Within Document") {
        if (inputs.operation === "CREATE_SHEET") {
          jsonToSend = {
            ...jsonToSend,
            spreadsheetId: inputs.spreadsheetId,
            requests: inputs.sheet_info_create_sheet.map((request:any) => {
              return {
                addSheet: {
                  properties: {
                    sheetId: request.sheetId,
                    title: request.title,
                    hidden: request.hidden,
                    rightToLeft: request.rightToLeft,
                    index: request.index,
                  },
                },
              };
            }),
          };
        } else if (inputs.operation === "REMOVE_SHEET") {
          jsonToSend = {
            ...jsonToSend,
            spreadsheetId: inputs.spreadsheetId,
            requests: inputs.sheet_info_remove_sheet.map((request:any) => {
              return {
                deleteSheet: {
                  sheetId: request.sheetId,
                },
              };
            }),
          };
        } else if (inputs.operation === "READ_ROWS") {
          jsonToSend = {
            spreadsheetId: inputs.spreadsheetId,
            sheetName: inputs.sheetName,
          };
          if (
            inputs.hasOwnProperty("range_sheet_read_rows") &&
            inputs.range_sheet_read_rows.from &&
            inputs.range_sheet_read_rows.to
          ) {
            jsonToSend = {
              ...jsonToSend,
              range:
                inputs.range_sheet_read_rows.from +
                ":" +
                inputs.range_sheet_read_rows.to,
            };
          } else if (
            inputs.hasOwnProperty("range_sheet_read_rows") &&
            inputs.range_sheet_read_rows.from
          ) {
            jsonToSend = {
              ...jsonToSend,
              range: inputs.range_sheet_read_rows.from,
            };
          }
          [
            {
              option: "majorDimension_sheet_read_rows",
              value: "majorDimension",
            },
          ].forEach((f) => {
            if (
              getAccvalue(inputs, f.option) &&
              getAccvalue(inputs, f.option).toString().trim()
            )
              jsonToSend = {
                ...jsonToSend,
                [f.value]: getAccvalue(inputs, f.option),
              };
          });
        } else if (inputs.operation === "UPDATE_ROWS") {
          jsonToSend = {
            spreadsheetId: inputs.spreadsheetId,
            sheetName: inputs.sheetName,
            range: inputs.from_range + ":" + inputs.to_range,
          };
          jsonToSend = {
            ...jsonToSend,
            values: inputs.values_sheet_update_rows.map((row:any) => {
              return row.cell_sheet_update_rows.map((cell:any) => cell.cellData);
            }),
          };
        } else if (inputs.operation === "APPEND_DATA") {
          jsonToSend = {
            spreadsheetId: inputs.spreadsheetId,
            sheetName: inputs.sheetName,
          };
          jsonToSend = {
            ...jsonToSend,
            values: inputs.values_sheet_append_data.map((row:any) => {
              return row.cell_sheet_append_data.map((cell:any) => cell.cellData);
            }),
          };
        } else if (inputs.operation === "DELETE_COLS_OR_ROWS") {
          jsonToSend = {
            spreadsheetId: inputs.spreadsheetId,
            requests: inputs.range_sheet_delete_data.map((request:any) => {
              return {
                deleteDimension: {
                  range: {
                    sheetId: request.sheetId,
                    dimension: request.dimension,
                    startIndex: request.startIndex,
                    endIndex: request.endIndex,
                  },
                },
              };
            }),
          };
        } else if (inputs.operation === "CLEAR_DATA") {
          jsonToSend = {
            spreadsheetId: inputs.spreadsheetId,
            sheetName: inputs.sheetName,
          };
          if (inputs.range === "Range") {
            jsonToSend = {
              ...jsonToSend,
              range:
                inputs.from_range_sheet_clear_data +
                ":" +
                inputs.to_range_sheet_clear_data,
            };
          } else {
            jsonToSend = {
              ...jsonToSend,
              range: inputs.range_sheet_clear_data,
            };
          }
        }
      }
     
      const content = {
          type: "data",
          data: {
              content_json: jsonToSend,
              app: "googleSheet",
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
  }