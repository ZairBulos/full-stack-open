const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

export const findAll = async () => {
    try {
        const response = await fetch(`${baseUrl}/all`, {
            method: 'GET'
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};