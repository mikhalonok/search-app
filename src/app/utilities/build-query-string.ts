export function buildQueryString(params: Record<string, any>): string {
  const queryParams = [];

  for (const key in params) {
    if (
      params.hasOwnProperty(key) &&
      params[key] !== undefined &&
      params[key] !== null
    ) {
      queryParams.push(`${key}=${encodeURIComponent(params[key])}`);
    }
  }

  return queryParams.join('&');
}
