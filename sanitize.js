const xss = require('xss');


exports.sanitize = (obj) => {
// shallow sanitize of string fields to reduce stored XSS
const out = {};
for (const k in obj) {
if (typeof obj[k] === 'string') out[k] = xss(obj[k]);
else out[k] = obj[k];
}
return out;
};