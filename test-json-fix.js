// Manual JSON serialization to work around system JSON.stringify issues
function safeJsonStringify(obj) {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return `"${obj.replace(/"/g, '\\"')}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  
  if (Array.isArray(obj)) {
    const items = obj.map(item => safeJsonStringify(item));
    return `[${items.join(',')}]`;
  }
  
  if (typeof obj === 'object') {
    const pairs = [];
    for (const [key, value] of Object.entries(obj)) {
      pairs.push(`"${key}":${safeJsonStringify(value)}`);
    }
    return `{${pairs.join(',')}}`;
  }
  
  return 'null';
}

const testData = {
  success: true,
  settings: [
    { key: 'company_name', value: 'Konveksi Murbay' },
    { key: 'company_tagline', value: 'Jagonya konveksi' }
  ],
  message: 'Settings retrieved successfully'
};

console.log('Manual JSON stringify result:');
console.log(safeJsonStringify(testData));

console.log('\nBuilt-in JSON.stringify result:');
console.log(JSON.stringify(testData));
