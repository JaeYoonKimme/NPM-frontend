import axios from "axios";

axios.defaults.withCredentials = true;

export const getUserInfo = async () => {
    const API_URL = process.env.REACT_APP_API_URL;
    var info = ""
    try {
        const path = 'dj-rest-auth/user/';
        const response = await axios.get(`http://${API_URL}/${path}`, {
            headers: {
                "Content-Type": "application/json"
            },
        },
        {withCredentials: true});

        if (response.status !== 200) throw new Error('Not Logined');

        info = response.data;
    } catch (e) {
      console.error('getUserInfo Error: ', e.message);
      return false;
    }

    try {
        const path = 'api/social_account_profile';
        const response = await axios.get(`http://${API_URL}/${path}/${info.pk}`, {
            headers: {
                "Content-Type": "application/json"
            },
        },
        {withCredentials: true});

        if (response.status !== 200) throw new Error('No social user exist with given pk');
        Object.assign(info,response.data)
    } catch (e) {
      console.error('getUserInfo Error: ', e.message);
      return false;
    }
    return info
  };