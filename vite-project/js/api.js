document.addEventListener("DOMContentLoaded", () => {
    const DOMSelectors = {
        column: document.querySelector(".column"),
        dropdownButton: document.querySelector('.dropdown-button'),
        dropdownContent: document.querySelector('.dropdown-content'),
        showAllButton: document.querySelector('.show-all-button'), 
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
                DOMSelectors.column.innerHTML = ''; 
                arr.forEach((hi) => {
                    if (hi && hi.displayName && hi.displayIcon && hi.role && hi.role.displayName) {
                        DOMSelectors.column.insertAdjacentHTML(
                            "beforeend",
                            `<div class="card">
                                <h3 class="name">${hi.displayName}</h3>
                                <img src="${hi.displayIcon}" class="img" alt="images">
                                <h4 class="role">Role: ${hi.role.displayName}</h4>
                            </div>`
                        );
                    }
                });
            }

            insertCards(data.data);

            DOMSelectors.dropdownButton.addEventListener('click', () => {
                const dropdownContent = DOMSelectors.dropdownContent;
                dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
            });

            DOMSelectors.showAllButton.addEventListener('click', () => {
                insertCards(data.data);
            });

            DOMSelectors.dropdownContent.addEventListener('click', (event) => {
                event.preventDefault();
                const selectedAgent = event.target.dataset.agent;
                if (selectedAgent) {
                    const filteredAgents = data.data.filter(agent => agent.displayName === selectedAgent);
                    insertCards(filteredAgents);
                    DOMSelectors.dropdownContent.style.display = 'none';
                }
            });

        } catch (error) {
            console.error('Error fetching data:', error.message);
            document.querySelector("h1").textContent = "error";
        }
    }
    
    function toggleDropdownContent() {
        const dropdownContent = DOMSelectors.dropdownContent;
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    }

    function showAllCards(agents) {
        insertCards(agents);
        toggleDropdownContent();
    }

    getData(apiUrl);
});
