export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export async function apiFetch(path, options = {}) {
	const url = `${API_BASE_URL}${path}`;
	const resp = await fetch(url, {
		method: options.method || 'GET',
		headers: {
			'Content-Type': 'application/json',
			...(options.headers || {}),
		},
		body: options.body ? JSON.stringify(options.body) : undefined,
		credentials: 'omit',
	});
	if (!resp.ok) {
		const text = await resp.text().catch(() => '');
		throw new Error(`API ${resp.status}: ${text || resp.statusText}`);
	}
	const contentType = resp.headers.get('content-type') || '';
	if (contentType.includes('application/json')) {
		return resp.json();
	}
	return resp.text();
}

export function wsUrl(path) {
  const tenantId = localStorage.getItem('tenant_id')
  const qp = tenantId ? (path.includes('?') ? `&tenant_id=${tenantId}` : `?tenant_id=${tenantId}`) : ''
  return `ws://127.0.0.1:8000${path}${qp}`
}


