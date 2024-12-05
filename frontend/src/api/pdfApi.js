const API_URL = 'http://localhost:3000';

export const pdfApi = async (pdfTexts) => {
  try {
    const response = await fetch(`${API_URL}/api/parse`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ textData: pdfTexts }),
    });

    return await response.json();
  } catch (error) {
    throw error;
  }
};
