export function generateId(prefix = 'id') { return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`; }


