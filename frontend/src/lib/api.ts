const API_BASE = '/api';

export interface GreetingResponse {
  message: string;
  timestamp: string;
}

export async function fetchGreeting(name?: string): Promise<GreetingResponse> {
  const url = name ? `${API_BASE}/greeting/${encodeURIComponent(name)}` : `${API_BASE}/greeting`;
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('API error');
  }

  return (await res.json()) as GreetingResponse;
}
