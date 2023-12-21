document.addEventListener("DOMContentLoaded", () => { 
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
        console.log(data.data); 

        function insertCards(arr) {
            arr.forEach((hi) => { 
                if (hi && hi.displayName && hi.displayIcon && hi.role && hi.role.displayName)
                DOMSelectors.column.insertAdjacentHTML(
                    "beforeend",
                    `<div class="card">
                        <h3 class="name">${hi.displayName}</h3>
                        <img src="${hi.displayIcon}" class="img">
                        <h4 class="role">Role: ${hi.role.displayName}</h4>
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

getData(apiUrl);
});