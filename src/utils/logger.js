// src/features/common/logger.js
const LOG_KEY = 'mandala_logs';
let logCount = 0;

export const logger = {
    log(tag, message, data = null, screen = 'GLOBAL') {
        logCount++;
        const timestamp = new Date().toLocaleTimeString();
        const logLine = `[${timestamp}] [${tag}] [${screen}] #${logCount} ${message}`;

        // Console
        console.log(logLine);
        if (data) console.log('  ' + JSON.stringify(data, null, 2));
        console.log('');

        // Build log entry
        const dataStr = data ? `\n  ${JSON.stringify(data, null, 2)}` : '';
        const entry = logLine + dataStr + '\n\n';

        // Append to localStorage
        const existing = localStorage.getItem(LOG_KEY) || '';
        localStorage.setItem(LOG_KEY, existing + entry);
    },

    getLogs() {
        return localStorage.getItem(LOG_KEY) || 'No logs yet';
    },

    clear() {
        localStorage.removeItem(LOG_KEY);
        logCount = 0;
        console.clear();
        console.log('🗑️ Logs cleared');
    }
};
