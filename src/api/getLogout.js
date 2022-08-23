import axios from "axios";

axios.defaults.withCredentials = true;

export const getLogout = async () => {
    const API_URL = process.env.API_URL;
    const path = 'dj-rest-auth/logout/';
  
    try {
        const response = await axios.get(`http://${API_URL}/${path}`, {
            headers: {
                "Content-Type": "application/json"
            },
        },
        {withCredentials: true});

        if (response.status !== 200) throw new Error('Not Logined');
    } catch (e) {
      console.error('getLogout Error: ', e.message);
      return false;
    }
  };