const baseUrl = "http://localhost:3000/persons";

export const findAll = async () => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'GET'
        });

        if (!response.ok) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const create = async (person) => {
    try {
        const response = await fetch(`${baseUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });

        if (response.status !== 201) {
            throw new Error(response.status);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const update = async (id, person) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(person),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};

export const remove = async (id) => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, {
            method: 'DELETE',
        });
        const data = await response.json();
        return data;
    } catch (error) {
        throw new Error(error);
    }
};