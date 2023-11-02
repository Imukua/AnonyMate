import axios from "axios";

let refresh = false;

axios.interceptors.response.use(resp => resp, async error => {
    if (error.response.status === 401 && !refresh) {
        refresh = true;

        console.log(localStorage.getItem('refresh_token'))
        const response = await axios.post('http://localhost:8000/token/refresh/', {
            refresh: localStorage.getItem('refresh_token')
        }, {
            headers: {
              'Content-Type': 'application/json',
            }
          },{withCredentials: true});

        if (response.status === 200) {
            const newAccessToken = `Bearer ${response.data['access']}`;
            axios.defaults.headers.common['Authorization'] = newAccessToken;
            localStorage.setItem('access_token', response.data.access);
            localStorage.setItem('refresh_token', response.data.refresh);

            // Update the original request's headers before retrying it
            error.config.headers['Authorization'] = newAccessToken;

            return axios(error.config);
        }
    }
    refresh = false;
    console.log("failed refresh test")
    return Promise.reject(error);
});