const URL = 'https://valorant-api.com/v1/agents';
async function getData(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();
        return data; 
    } catch (error) {
        console.error("Error", error);
    }
}

getData(URL)
    .then(data => {
        console.log(data);
    });