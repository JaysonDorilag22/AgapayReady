const key = 'qgzpXK5qrf31Lu0i5svcVgmABfsLPvgH'

export const getCity = async (city) => {
    try {
        const base = 'http://dataservice.accuweather.com/locations/v1/cities/search';
        const query = `?apikey=${key}&q=${city}`;

        const response = await fetch(base + query);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data[0]);
        return data[0]; // Return the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
};

export const getWeather = async (cityKey) => {
    try {
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/';
        const query = `${cityKey}?apikey=${key}`;

        const response = await fetch(base + query);
        
        if (!response.ok) {
            throw new Error('Failed to fetch data');
        }

        const data = await response.json();
        console.log(data[0]);
        return data[0]; // Return the fetched data
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error so the caller can handle it
    }
};
