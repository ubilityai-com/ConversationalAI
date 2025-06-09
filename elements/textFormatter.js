class TextFormatter {
    constructor(data, usedVariables) {
        this.data = data;
        this.usedVariables = usedVariables || [];
    }

    process(variables) {
        const inputText = this._replaceVariables(this.data.inputText, variables);
        
        switch (this.data.operation) {
            case 'capitalize':
                return inputText.charAt(0).toUpperCase() + inputText.slice(1);
            case 'lowercase':
                return inputText.toLowerCase();
            case 'uppercase':
                return inputText.toUpperCase();
            case 'titlecase':
                return inputText.replace(/\w\S*/g, (word) => 
                    word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
                );
            case 'length':
                return String(inputText.length);
            case 'find':
                if (!this.data.textToFind) return '-1';
                const searchText = this._replaceVariables(this.data.textToFind, variables);
                return String(inputText.indexOf(searchText));
            default:
                console.warn(`Unknown text formatter operation: ${this.data.operation}`);
                return inputText;
        }
    }

    _replaceVariables(template, variables) {
        if (typeof template !== 'string') return template;
        
        return template.replace(/\$\{(\w+)\}/g, (match, varName) => {
            return this.usedVariables.includes(varName) 
                ? (variables[varName] || '') 
                : match;
        });
    }
}

module.exports = TextFormatter;