import axios from 'axios';

export class ForecastToken {
    static async get () {
        try {
            const response = await axios.get("http://localhost:3600/tokenForecast/get",
                {withCredentials: true});
            return response.data;
        } catch (error: any) {
            console.error(error);
            return "Ошибка запроса ForecastToken.get";
        }
    }

    static async set (value: number) {
        try {
            const response = await axios.post("http://localhost:3600/tokenForecast/set",
                { value },
                {withCredentials: true});
                return response.data;
        } catch (error: any) {
                console.error(error);
                return "Ошибка запроса ForecastToken.set";
        }
    }
}