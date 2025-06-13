import axios from 'axios';

export const preorderSet = async (
    currency_sell: string,
    currency_buy: string,
    value_buy: number | null,
    is_all_in: 0 | 1,
    trigger_course: number
) => {
    try {
        const response = await axios.post(
            'http://localhost:3600/preorders/set',
            {currency_sell, currency_buy, value_buy, is_all_in, trigger_course},
            { withCredentials: true }
        );
        return response.data;
    } catch (error: any) {
        console.error(error);
        return "Ошибка запроса preorderSet";
    }
}