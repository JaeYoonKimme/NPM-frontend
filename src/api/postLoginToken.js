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

        const headers = {"Authorization": response.data.access_token}
        const path2 = 'dj-rest-auth/user/';
        const response2 = await axios.get(`https://${API_URL}/${path2}`, {
            headers: headers
        },
        {withCredentials: true});
        console.log(response2.data)


        return headers;
    } catch (error) {
        console.error('postLoginToken Error : ', error.message);
        return false;
    }
}