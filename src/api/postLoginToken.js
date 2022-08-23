import axios from "axios";

export const postLoginToken = async token => {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = "dj-rest-auth/google/";

    try {
       const response = await axios.post(
        `https://${API_URL}/${path}`,
        {
            "access_token": token,
        },
        {withCredentials: true}
       )

        if (response.status !== 200) throw new Error("API SERVER DOES NOT WORK");
        return true;
    } catch (error) {
        console.error('postLoginToken Error : ', error.message);
        return false;
    }
}