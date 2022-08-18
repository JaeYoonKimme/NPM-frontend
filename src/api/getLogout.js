import axios from "axios";

axios.defaults.withCredentials = true;

export const getLogout = async (setIsLogin) => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = 'dj-rest-auth/logout/';
  
    try {
        const response = await axios.get(`http://${API_URL}/${path}`, {
            headers: {
                "Content-Type": "application/json"
            },
        },
        {withCredentials: true});

        if (response.status !== 200) throw new Error('Not Logined');
        return true
    } catch (e) {
      console.error('getUserInfo Error: ', e.message);
      return false;
    }
  };