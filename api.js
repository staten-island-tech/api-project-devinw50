const URL = 'https://valorant-api.com/v1/agents';
async function getData(URL){
    try {
        //requesting a response REST API's
        const response = await fetch(URL)
        if(response.status != 200){
            throw new Error(response.statusText);
        }
        const data = await response.json();
        document.querySelector("h1").textContent = data.content;
    } catch (error) {
        console.log(error, "sorry")
        document.querySelector("h1").textContent ="sorry"
    }
}
getData(URL);