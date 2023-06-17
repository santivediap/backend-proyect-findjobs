//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE   ---------------------------------
// const menu = document.getElementById('menu')
// const menuIcon = document.getElementById('menu_icon')
// const menuUl = document.createElement('ul'); 
// menuUl.setAttribute('class','menu_ul');
// if(menuIcon){
//   menuIcon.addEventListener('click', () => {
//     const menuItems = `
//     <li><a href="drivers.html">DRIVERS</a></li>
//     <li><a href="home.html">YOUR TEAM</a></li>
//     <li><a href="resultados.html">RESULTS</a></li>
//     <li><a href="liga.html">LEAGUE</a></li>
//   `;
//   if (menuUl.style.display === 'none') {
//     setTimeout(function() {
//       menu.style.opacity = '1';
//     }, 100);
//     menuUl.style.display = 'flex';
//     menu.style.borderTop = 'solid';
//     menu.style.borderTopColor = 'rgb(203, 25, 25)';
//   } else {
//     menuUl.style.display = 'none';
//     menu.style.borderTop = 'none';
//   }
//   menu.appendChild(menuUl);
//   menuUl.innerHTML= menuItems;
//   });
// }

function validateSearch(event) {
        if(/^([a-zA-Z\s-]+)/gm.test(event.target.position.value) == true && /^([a-zA-Z\s-]+)/gm.test(event.target.location.value) == true) {
            return true;
        } else {
            return false
        }
}

function searchJobs() {
    if(document.getElementById("search-form")) {
        const formElement = document.getElementById("search-form")
        formElement.addEventListener("submit", (event) => {
            event.preventDefault()

            if(validateSearch(event)) {
                console.log("VALIDAAAA");
            } else {
                console.log("NO VALIDAAA");
            }
        })
    } else {
        console.log("dsafmwkom");
    }
}

searchJobs()