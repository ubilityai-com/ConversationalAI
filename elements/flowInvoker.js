// elements/flowInvoker.js

class FlowInvoker {
    constructor(data, usedVariables) {
        this.data = data;
        this.usedVariables = usedVariables || [];
        this.maxRetries = 30;        // Max 30 retries = 60 seconds
        this.retryDelay = 2000;      // 2 seconds between retries
    }

    async makeRequest(variables) {
        const url = this.data.url
        let body = null;

        if (this.data.body) {
            body = this._replaceVariablesInObject(this.data.body, variables);
        }

        // Make initial request
        const initialResponse = await this._makeHttpRequest(url, body);

        // Check if we need to poll for final result 
        if (typeof initialResponse === 'string' && (initialResponse.startsWith("https://"))) {
            return this._pollForResult(initialResponse);
        }
        // error case
        else{
            return initialResponse
        }

    }

    async _pollForResult(resultUrl) {
        let retries = 0;

        while (retries < this.maxRetries) {
            await new Promise(resolve => setTimeout(resolve, this.retryDelay));

            try {
                const response = await this._makeHttpRequest(resultUrl);

                // Check if we still need to wait
                if (typeof response === 'string' &&
                    response.includes('Processing...')) {
                    retries++;
                    continue;
                }

                // We have the final result
                return response;
            } catch (error) {
                console.error(`Polling attempt ${retries + 1} failed:`, error);
                retries++;
            }
        }

        throw new Error('Max polling attempts reached without final result');
    }

    async _makeHttpRequest(url, body = null) {
        // Prepare headers
        const headers = {};

        // Handle authentication
        if (this.data.authentication) {
            switch (this.data.authentication.type) {
                case 'Bearer':
                    headers['Authorization'] = `Bearer ${this._replaceVariables(
                        this.data.authentication.token
                    )}`;
                    break;
                case 'Basic':
                    const username = this._replaceVariables(
                        this.data.authentication.username
                    );
                    const password = this._replaceVariables(
                        this.data.authentication.password
                    );
                    const credentials = Buffer.from(
                        `${username}:${password}`
                    ).toString('base64');
                    headers['Authorization'] = `Basic ${credentials}`;
                    break;
            }
        }
        // Prepare request options (if body is null the the request type is GET)
        const options = {
            method: body ? 'POST' : 'GET',
            headers
        };

        // Add body if exists
        if (body) {
            options.body = JSON.stringify(body);
            headers['Content-Type'] = 'application/json';
        }

        // Make the request
        try {
            const response = await fetch(url, options);

            if (!response.ok) {
                const text = await response.text();
                throw new Error(`HTTP error! status=${response.status}, body=${text}`);
            }

            // should return the (/api/webhook/result) url
            return await response.text();
        } catch (error) {
            console.error('HTTP request failed:', error);
            throw error;
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

    _replaceVariablesInObject(obj, variables) {
        // Recursively replace variables in object properties
        if (typeof obj === 'object' && obj !== null) {
            const newObj = Array.isArray(obj) ? [] : {};
            for (const key in obj) {
                newObj[key] = this._replaceVariablesInObject(obj[key], variables);
            }
            return newObj;
        } else if (typeof obj === 'string') {
            return this._replaceVariables(obj, variables);
        }
        return obj;
    }
}

module.exports = FlowInvoker;