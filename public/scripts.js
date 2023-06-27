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

//favorite function//
//with ids/

function addToFavorites(offerData) {
  const {
    title,
    company_name,
    location,
    work_schedule,
    experience,
    contract_type,
    salary,
    description,
  } = offerData;

  fetch("/favorites", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      company_name,
      location,
      work_schedule,
      experience,
      contract_type,
      salary,
      description,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Job offer added to favorites:", data);
    })
    .catch((error) => {
      console.log("Error adding job offer to favorites:", error);
    });
}
function displayFavorites() {
  fetch("/favorites/dashboard")
    .then((response) => response.json())
    .then((data) => {
      console.log("Favorites:", data);
    })
    .catch((error) => {
      console.log("Error fetching favorites:", error);
    });
}

//delete favorite offer//
function deleteFavorite(offerId) {
  fetch(`/favorites/${offerId}`, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      console.log("Favorite offer deleted:", data);
    })
    .catch((error) => {
      console.log("Error deleting favorite offer:", error);
    });
}
displayFavorites();

if (document.querySelector(".search_info")) {
  console.log("wee");
  let jobOffers = document.querySelectorAll(".article_offer > button");

  console.log(jobOffers);

  jobOffers.forEach((offer, i) => {
    offer.addEventListener("click", (e) => {
      e.preventDefault();

      let company_name = null;
      let location = null;
      let experience = null;
      let contract_type = null;
      let work_schedule = null;
      let salary = null;

      const title = document.querySelectorAll("#title")[i].innerHTML;
      if (document.querySelectorAll("#companyName")[i]) {
        company_name = document.querySelectorAll("#companyName")[i].innerHTML;
      }
      if (document.querySelectorAll("#location")[i]) {
        location = document.querySelectorAll("#location")[i].innerHTML;
      }
      if (document.querySelectorAll("#experience")[i]) {
        experience = document.querySelectorAll("#experience")[i].innerHTML;
      }
      if (document.querySelectorAll("#contract_type")[i]) {
        contract_type =
          document.querySelectorAll("#contract_type")[i].innerHTML;
      }
      if (document.querySelectorAll("#work_schedule")[i]) {
        work_schedule =
          document.querySelectorAll("#work_schedule")[i].innerHTML;
      }
      if (document.querySelectorAll("#salary")[i]) {
        salary = document.querySelectorAll("#salary")[i].innerHTML;
      }
      const description =
        document.querySelectorAll("#description")[i].innerHTML;

      console.log(
        title,
        company_name,
        location,
        experience,
        contract_type,
        work_schedule,
        salary,
        description
      );

      addToFavorites({
        title,
        company_name,
        location,
        experience,
        contract_type,
        work_schedule,
        salary,
        description,
      });
    });
  });
}
