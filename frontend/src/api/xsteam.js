const BASE_URL = import.meta.env.DEV 
    ? 'http://localhost:5000' 
    : 'https://SamD444-xsteam.hf.space';

export const wakeBackend = async () => {
    try {
        await fetch(`${BASE_URL}/stats`);
    } catch (error) {
        // silently ignore wake errors
    }
};

export async function predictSentiment(review) {
    try {
        const response = await fetch(`${BASE_URL}/predict/sentiment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ review }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}

export async function predictHelpfulness(review, playtime_hours, is_early_access) {
    try {
        const response = await fetch(`${BASE_URL}/predict/helpfulness`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                review,
                playtime_hours,
                is_early_access,
            }),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}

export async function getStats() {
    try {
        const response = await fetch(`${BASE_URL}/stats`);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return { data, error: null };
    } catch (error) {
        return { data: null, error: error.message };
    }
}
