const API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export async function callGemini(apiKey, systemInstruction, userMessage, jsonMode = true) {
  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents: [{ parts: [{ text: userMessage }] }],
  };
  if (jsonMode) {
    body.generationConfig = { responseMimeType: 'application/json' };
  }
  const resp = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err.slice(0, 200)}`);
  }
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from API');
  if (jsonMode) {
    return JSON.parse(text);
  }
  return text;
}

export async function callGeminiMultiTurn(apiKey, systemInstruction, messages, jsonMode = true) {
  const contents = messages.map(m => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));
  const body = {
    system_instruction: { parts: [{ text: systemInstruction }] },
    contents,
  };
  if (jsonMode) {
    body.generationConfig = { responseMimeType: 'application/json' };
  }
  const resp = await fetch(`${API_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!resp.ok) {
    const err = await resp.text();
    throw new Error(`API error ${resp.status}: ${err.slice(0, 200)}`);
  }
  const data = await resp.json();
  const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) throw new Error('Empty response from API');
  if (jsonMode) return JSON.parse(text);
  return text;
}
