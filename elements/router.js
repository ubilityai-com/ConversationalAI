class Router {
    constructor(conditions,usedVariables) {
        this.conditions = conditions;
        this.usedVariables = usedVariables || [];
    }

    evaluateCondition(condition, variables) {
        if (!condition.operation) return true; // Else condition
        
        // Get values (support variables or literals)
        let left = this._getValue(condition.firstOperator, variables);
        let right = this._getValue(condition.secondOperator, variables);
        
        // Convert types
        if (condition.dataType === 'number') {
            left = Number(left);
            right = Number(right);
        }

        // Evaluate operations
        switch (condition.operation) {
            case 'equal': return left === right;
            case 'not equal': return left !== right;
            case 'contain': return String(left).includes(String(right));
            case 'does not contain': return !String(left).includes(String(right));
            case 'greaterThan': return left > right;
            case 'greaterThanOrEqual': return left >= right;
            case 'lessThan': return left < right;
            case 'lessThanOrEqual': return left <= right;
            default: return false;
        }
    }

    // replace variables
    _getValue(value, variables) {
        if (typeof value === 'string' && 
            value.startsWith('${') && 
            value.endsWith('}')) {
            
            const varName = value.slice(2, -1);
            
            // Only replace if variable is in usedVariables
            if (this.usedVariables.includes(varName)) {
                return variables[varName] || '';
            }
        }
        return value;
    }

    // seach for the valid condition
    findNextStep(variables) {
        for (const condition of this.conditions) {
            if (this.evaluateCondition(condition, variables)) {
                return condition.next;
            }
        }
        return null; // Shouldn't happen if else condition exists
    }
}

module.exports = Router;