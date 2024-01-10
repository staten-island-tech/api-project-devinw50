import "../styles/style.css" assert { type: "css" };

const DOMSelectors = {
  column: document.querySelector(".column"),
  showAllButton: document.querySelector('.show-all-button'),
  searchButton: document.querySelector('.search-button'),
  searchInput: document.getElementById('searchInput'),
  Duelist: document.getElementById("Duelist"),
  Initiator: document.getElementById("Initiator"),
  Controller: document.getElementById("Controller"),
  Sentinel: document.getElementById("Sentinel"),
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

    insertCards(data.data);

    DOMSelectors.showAllButton.addEventListener('click', () => {
      insertCards(data.data);
    });

    DOMSelectors.searchButton.addEventListener('click', () => {
      searchAgents(DOMSelectors.searchInput.value.toLowerCase(), data.data);
    });

    RoleButtons(apiUrl);

  } catch (error) {
    console.error('ERROR:', error.message);
    document.querySelector("h1").textContent = "error";
  }
}
getData(apiUrl);

function insertCards(arr) {
  try {
    DOMSelectors.column.innerHTML = '';
    arr.forEach((agent) => {
      if (agent && agent.displayName && agent.displayIcon && agent.role && agent.role.displayName) {
        DOMSelectors.column.insertAdjacentHTML(
            "beforeend",
            `<div class="card">
                <div class="front">
                    <h2 class="name">${agent.displayName}</h2>
                    <img src="${agent.displayIcon}" class="img" alt="${agent.displayName}">
                    <h3 class="role">Role: ${agent.role.displayName}</h3>
                </div>
                <div class="back">
                    <p class="description">${agent.description || 'No description available.'}</p>
                </div>
            </div>`
        );
      }
    });
  } catch (error) {
    console.error('ERROR:', error.message);
  }
}

function searchAgents(searchTerm, agents) {
  try {
    const matchingAgents = agents.filter(agent => agent.displayName.toLowerCase().includes(searchTerm));
    insertCards(matchingAgents);
  } catch (error) {
    console.error('ERROR:', error.message);
  }
}

async function RoleButtons(apiUrl) {
  DOMSelectors.Initiator.addEventListener("click", async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const Initiators = data.data.filter(
        (agent) => agent.role && agent.role.displayName === "Initiator"
      );

      console.log(Initiators);

      if (Initiators.length > 0) {
        insertCards(Initiators);
      } else {
        console.log("No Initiators found.");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  });

  DOMSelectors.Duelist.addEventListener("click", async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const duelists = data.data.filter(
        (agent) => agent.role && agent.role.displayName === "Duelist"
      );

      console.log(duelists);

      if (duelists.length > 0) {
        insertCards(duelists);
      } else {
        console.log("No Duelists found.");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  });

  DOMSelectors.Controller.addEventListener("click", async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const controllers = data.data.filter(
        (agent) => agent.role && agent.role.displayName === "Controller"
      );

      console.log(controllers);

      if (controllers.length > 0) {
        insertCards(controllers);
      } else {
        console.log("No Controllers found.");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  });

  DOMSelectors.Sentinel.addEventListener("click", async () => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      const sentinels = data.data.filter(
        (agent) => agent.role && agent.role.displayName === "Sentinel"
      );

      console.log(sentinels);

      if (sentinels.length > 0) {
        insertCards(sentinels);
      } else {
        console.log("No Sentinels found.");
      }
    } catch (error) {
      console.error("ERROR:", error);
    }
  });
}
RoleButtons(apiUrl);
