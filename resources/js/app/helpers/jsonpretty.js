export const jsonPretty = {
    replacer: function(match, pIndent, pKey, pVal, pEnd) {
        let key = '<span class=json-key>';
        let val = '<span class=json-value>';
        let str = '<span class=json-string>';
        let r = pIndent || '';
        if (pKey)
            r = r + key + pKey.replace(/[": ]/g, '') + '</span>: ';
        if (pVal)
            r = r + (pVal[0] === '"' ? str : val) + pVal + '</span>';
        return r + (pEnd || '');
    },
    prettyPrint: function(obj) {
        // jsonPretty.clear(obj);
        //
        let jsonLine = /^( *)("[\w]+": )?("[^"]*"|[\w.+-]*)?([,[{])?$/mg;
        return JSON.stringify(obj, null, 3)
            .replace(/&/g, '&amp;').replace(/\\"/g, '&quot;')
            .replace(/</g, '&lt;').replace(/>/g, '&gt;')
            .replace(jsonLine, jsonPretty.replacer);
    },
    clear: function (obj) {
        if (typeof obj === 'object' && obj !== null) {
            let props = Object.getOwnPropertyNames(obj);
            for (let p in props) {
                if (props[p].match(/^\$/)) {
                    delete obj[props[p]];
                    continue;
                }
                if (Array.isArray(obj[props[p]])) {
                    for (let k in obj[props[p]]) {
                        jsonPretty.clear(obj[props[p]][k]);
                    }
                } else if (typeof obj[props[p]] === 'object') {
                    jsonPretty.clear(obj[props[p]]);
                }
            }
        }
    }
};

export default jsonPretty;
