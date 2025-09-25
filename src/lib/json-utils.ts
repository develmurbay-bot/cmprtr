// Manual JSON serialization to work around system JSON.stringify issues
export function safeJsonStringify(obj: any): string {
  if (obj === null) return 'null';
  if (obj === undefined) return 'undefined';
  if (typeof obj === 'string') return `"${obj.replace(/"/g, '\\"')}"`;
  if (typeof obj === 'number' || typeof obj === 'boolean') return String(obj);
  
  if (Array.isArray(obj)) {
    const items = obj.map(item => safeJsonStringify(item));
    return `[${items.join(',')}]`;
  }
  
  if (typeof obj === 'object') {
    const pairs: string[] = [];
    for (const [key, value] of Object.entries(obj)) {
      pairs.push(`"${key}":${safeJsonStringify(value)}`);
    }
    return `{${pairs.join(',')}}`;
  }
  
  return 'null';
}
