const DOMSelectors = {
    column: document.querySelector(".column"),
    searchBtn: document.querySelector('.search-btn'),
};

const apiUrl = 'https://valorant-api.com/v1/agents';

async function getData(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data.data); // Check the structure of the returned data

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

        DOMSelectors.searchBtn.addEventListener('click', function () {
            const agentName = prompt("Enter agent name:");
            if (agentName) {
                const filteredAgents = data.data.filter((agent) => agent.displayName.toLowerCase() === agentName.toLowerCase());
                DOMSelectors.column.innerHTML = '';
                insertCards(filteredAgents);
            }
        });

    } catch (error) {
        console.error('Error fetching data:', error.message);
        document.querySelector("h1").textContent = "error";
    }
}

getData(apiUrl);