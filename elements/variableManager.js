// elements/variableManager.js
class VariableManager {
    constructor(data, usedVariables) {
        this.data = data;
        this.usedVariables = usedVariables || [];
    }

    process(variables) {
        // Replace variables in the newValue
        const newValue = this._replaceVariables(this.data.newValue, variables);
        
        return {
            variable: this.data.variable,
            value: newValue
        };
    }

    _replaceVariables(template, variables) {
        if (typeof template === 'string') {
            return template.replace(/\$\{(\w+)\}/g, (match, varName) => {
                return this.usedVariables.includes(varName) 
                    ? (variables[varName] || '') 
                    : match;
            });
        }
        return template;
    }
}

module.exports = VariableManager;