export const MongoDbJson = {
  "category": "integration",
  "type": "MongoDb",
  "label": "MongoDb",
  "color": "#53D2E2 ",
  "docsPath": "Connectors/MongoDb/getting_started",
  "description": "MongoDb integration",
  "defaultValid": false,
  "automated": "json",
  "automationConfig": "automated",
  "defaults": {
    "json": [
      {
        "type": "api",
        "label": "Credentials",
        "variableName": "cred",
        "required": true,
        "credential": true,
        "credType": "MongoDB",
        "value": "None",
        "list": [],
        "config": [
          {
            "key": "method",
            "value": "get"
          },
          {
            "key": "headers",
            "obj": [
              {
                "key": "Authorization",
                "dependOn": [
                  {
                    "type": "static",
                    "value": "Bearer "
                  },
                  {
                    "type": "redux",
                    "value": "authentication.authToken"
                  }
                ]
              },
              {
                "key": "content-type",
                "value": "application/json"
              }
            ]
          },
          {
            "key": "url",
            "dependOn": [
              {
                "type": "static",
                "value": process.env.REACT_APP_DNS_URL + "credentials",
              }
            ]
          },
        ],
        "res": {
          "path": "data",
          "keys": {
            "option": {
              "fields": [
                "name"
              ]
            },
            "value": {
              "fields": [
                "name"
              ]
            },
            "type": {
              "fields": ["type"]
            },
          },
        },
        "apiDependsOn": [],
      },
      {
        type: "dropdown",
        label: "Operation",
        value: "Find Documents",
        variableName: "operation",
        errorSpan: "Please choose a operation",
        required: true,
        hasDynamicVariable: false,
        list: [
          {
            option: "Find Documents",
            value: "Find Documents",
          },
          {
            option: "Delete Many Document",
            value: "Delete Many Document",
          },
          {
            option: "Insert Document",
            value: "Insert Document",
          },
          {
            option: "Insert Many Document",
            value: "Insert Many Document",
          },
          {
            option: "Update Documents",
            value: "Update Documents",
          },
          {
            option: "Find One And Update Document",
            value: "Find One And Update Document",
          },
          {
            option: "Find One And Replace Document",
            value: "Find One And Replace Document",
          },
          {
            option: "Aggregate Documents",
            value: "Aggregate Documents",
          },
        ],
        options: {
          "Find Documents": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_FindDocuments",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Query (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "query_FindDocuments",
              value: "{}",
              helperSpan:
                "The query filter to match documents (default is {} to match all documents).",
            },
            {
              type: "dynamic",
              fieldsArray: [],
              title: "Sort",
              variableName: "sort_FindDocuments",
              structure: [
                {
                  type: "row",
                  title: "Sort By",
                  variableName: "fieldCustom",
                  removeButton: true,
                },
                {
                  type: "textfield",
                  label: "Sort Field",
                  value: "",
                  required: true,
                  placeholder: "Fields",
                  variableName: "keyFields",
                  hasDynamicVariable: true,
                },
                {
                  type: "dropdown",
                  label: "Sort Type",
                  value: "ascending",
                  variableName: "valueFields",
                  required: true,
                  hasDynamicVariable: false,
                  list: [
                    {
                      option: "ascending",
                      value: "ascending",
                    },
                    {
                      option: "descending",
                      value: "descending",
                    },
                  ],
                },
              ],
            },
            {
              title: "Additional Fields",
              type: "accordion",
              accTitle: "Limit",
              variableName: "limit_FindDocuments",
              fieldsArray: [
                [
                  {
                    type: "textfield",
                    value: "",
                    variableName: "limit_FindDocuments",
                    rightSideInput: true,
                    placeholder: "Limit",
                    hasDynamicVariable: true,
                    numberField: true,
                    typeOfValue: "integer",
                  },
                ],
              ],
            },
          ],
          "Delete Many Document": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_DeleteManyDocument",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Query (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: false,
              variableName: "query_DeleteManyDocument",
              value: "",
              helperSpan:
                "The query filter to specify which documents to delete.If no query is provided, all documents in the collection will be deleted.",
            },
          ],
          "Insert Document": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_InsertDocument",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Document (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "document_InsertDocument",
              value: "",
              helperSpan: "The document to be inserted.",
            },
          ],
          "Insert Many Document": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_InsertManyDocument",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Documents",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "documents_InsertManyDocument",
              value: "",
              helperSpan:
                "An array containing objects, with each object outlining the fields and values of a document to be inserted.",
            },
          ],
          "Update Documents": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_UpdateDocuments",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Query (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "query_UpdateDocuments",
              value: "",
              helperSpan: "The query filter to find the document to update.",
            },
            {
              title: "Update Documents (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "update_UpdateDocuments",
              value: "",
              helperSpan:
                "To modify documents, use update operators in this queries, such as $set, $inc, $mul, etc. For example:{'$set':{'field':'newValue'}}",
            },
            {
              title: "Additional Fields",
              type: "accordion",
              accTitle: "Upsert",
              variableName: "upsert_UpdateDocuments",
              fieldsArray: [
                [
                  {
                    type: "checkbox",
                    value: false,
                    variableName: "upsert_UpdateDocuments",
                    helperSpan:
                      "If `True`, inserts a new document if no documents match the query criteria; if `False`, only updates existing documents.",
                  },
                ],
              ],
            },
          ],
          "Find One And Update Document": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_FindAndUpdateDocument",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Query (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "query_FindAndUpdateDocument",
              value: "",
              helperSpan: "The query filter to find the document to update.",
            },
            {
              title: "Update Document (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "update_FindAndUpdateDocument",
              value: "",
              helperSpan: "The update document specifying the modifications.",
            },
          ],
          "Find One And Replace Document": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_FindAndReplaceDocument",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Query (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "query_FindAndReplaceDocument",
              value: "",
              helperSpan:
                "A filter document used to find the document to replace.",
            },
            {
              title: "Replace Document (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "replacement_FindAndReplaceDocument",
              value: "",
              helperSpan:
                "Note: The old data will be removed and replaced with the new data.",
            },
          ],
          "Aggregate Documents": [
            {
              type: "textfield",
              label: "Collection",
              required: true,
              variableName: "collectionName_AggregateDocuments",
              value: "",
              placeholder: "Collection",
              hasDynamicVariable: true,
              helperSpan: "The name of the collection.",
            },
            {
              title: "Match Data (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "matchData_AggregateDocuments",
              value: "",
              helperSpan: "The match criteria for the aggregation",
            },
            {
              title: "Group Data (JSON Format)",
              type: "editor",
              showExpandIcon: true,
              defaultLanguage: "json",
              required: true,
              variableName: "groupData_AggregateDocuments",
              value: "",
              helperSpan:
                "The grouping criteria for the aggregation e.g { '_id': '$category', 'totalAmount': { '$sum': '$amount' }",
            },
          ],
        },
      },
    ]
  }
};