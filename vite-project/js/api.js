const DOMSelectors = {
    column: document.querySelector(".column"),
    searchbtn: document.getElementById(".searchbtn")
};

const apiUrl = 'https://valorant-api.com/v1/agents';

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data); 

        function insertCards(arr) {
            arr.forEach((agent) => {
                DOMSelectors.column.insertAdjacentHTML(
                    "beforeend",
                    `<div class="card">
                        <h3 class="name">${agent.displayName}</h3>
                        <img src="${agent.displayIcon}" class="img">
                        <h4>Role: ${agent.role.displayName}</h4>
                    </div>`
                );
            });
        }

        insertCards(data.data);

    } catch (error) {
        console.error('Error fetching data:', error.message);
        document.querySelector("h1").textContent = "error";
    }

}

function searchAgent(){
    try {
        const searchWord = searchInput.value.toLowerCase();
const correctWord = data.data.filter (agent => agent.displayName.includes(searchWord))
insertCards(correctWord);
    } catch (error) {
    console.error ('Error fecthing data', error.message)
}
}
getData(apiUrl);