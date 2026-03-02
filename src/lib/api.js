export const API_BASE = import.meta.env.VITE_API_URL || import.meta.env.REACT_APP_API_URL || "http://127.0.0.1:7860"; // Uses HF Space URL in prod

export async function apiRequest(endpoint, method = "GET", body = null, token = null) {
    const headers = {
        "Content-Type": "application/json",
    };

    if (token) {
        // For this demo, we use the email as the token/session identifier
        headers["X-User-Email"] = token;
    }

    const config = {
        method,
        headers,
    };

    if (body) {
        config.body = JSON.stringify(body);
    }

    try {
        const res = await fetch(`${API_BASE}/api${endpoint}`, config);
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || "API Error");
        return data;
    } catch (err) {
        console.error(`API Call Failed [${endpoint}]:`, err);
        throw err;
    }
}
