export const postLoginToken = async idToken => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "";

    try {
        const response = await fetch(`${API_URL}${path}`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(idToken),
        });
        if (!response.ok) throw new Error("API SERVER DOES NOT WORK");
        return true;
    } catch (error) {
        console.error('postLoginToken Error : ', error.message);
        return false;
    }
}