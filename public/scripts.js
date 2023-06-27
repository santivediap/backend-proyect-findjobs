//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE   ---------------------------------

const menu = document.getElementById("menu"); // div del menú desplegado
const menuIcon = document.getElementById("menu_icon"); //icono hamburguer
const menuUl = document.createElement("ul");
menuUl.setAttribute("class", "menu_ul");
function showNavbarItems() {
  const menuItems = `
    <li><a href="drivers.html">FAVORITES</a></li>
    <li><a href="home.html">SEARCH</a></li>
    <li><a href="resultados.html">PROFILE</a></li>
  `;
  if (menuUl.style.display === "none") {
    setTimeout(function () {
      menu.style.opacity = "1";
    }, 100);
    menuUl.style.display = "flex";
    menu.style.borderTop = "solid";
    menu.style.borderTopColor = "rgb(203, 25, 25)";
  } else {
    menuUl.style.display = "none";
    menu.style.borderTop = "none";
  }
  menu.appendChild(menuUl);
  menuUl.innerHTML = menuItems;
}

//Event Listener for menu
if (menuIcon) {
  menuIcon.addEventListener("click", () => {
    showNavbarItems();
  });
}

function validateSearch(event) {
  if (
    /^([a-zA-Z\s-]+)/gm.test(event.target.position.value) == true &&
    /^([a-zA-Z\s-]+)/gm.test(event.target.location.value) == true
  ) {
    return true;
  } else {
    return false;
  }
}

function searchJobs() {
  if (document.getElementById("search-form")) {
    const formElement = document.getElementById("search-form");
    formElement.addEventListener("submit", async (event) => {
      if (!validateSearch(event)) {
        event.preventDefault();
        console.log("NO VALIDAAA");
      }
    });
  }
}

searchJobs();

//adding a job offer to favorites
function addToFavorites(offerId) {
  fetch("/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      body: JSON.stringify({ offerId }),
    },
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Job offer added to favorites:", data);
    })
    .catch((error) => {
      console.log("Error adding job offer to favorites:", error);
    });
}

//fetching and display favorites in user profile
function displayFavorites() {
  fetch("/favorites/dashboard")
    .then((response) => response.json())
    .then((data) => {
      // Display the favorites data in your profile/favorites section
      console.log("Favorites:", data);
    })
    .catch((error) => {
      console.log("Error fetching favorites:", error);
    });
}
displayFavorites();
