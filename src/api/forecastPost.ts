import axios from 'axios';

export const forecastPost = async (nameCoin: string, period: string): Promise<string> => {
    try {
        const response = await axios.post("http://localhost:3600/chat",
            { nameCoin, period },
            {withCredentials: true});

        return response.data.response;
    } catch (error: any) {
        console.error(error);
        return "Ошибка запроса forecastPost";
    }
}