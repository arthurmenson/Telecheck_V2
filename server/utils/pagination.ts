export function paginate<T>(items: T[], page = 1, limit = 20) {
  const start = (page - 1) * limit;
  const data = items.slice(start, start + limit);
  const total = items.length;
  return { data, pagination: { page, limit, total, totalPages: Math.ceil(total / limit) } };
}


