//* HAMBURGUER MENU DEL NAVBAR Y SU DESPLIEGUE   ---------------------------------
const menu = document.getElementById('menu') // div del menú desplegado
const menuIcon = document.getElementById('menu_icon')  //icono hamburguer
const menuUl = document.createElement('ul'); 
menuUl.setAttribute('class','menu_ul');
if(menuIcon){
  menuIcon.addEventListener('click', () => {
    const menuItems = `
    <li><a href="/user/favorites">FAVORITES</a></li>
    <li><a href="/">SEARCH</a></li>
  `;
  if (menuUl.style.display === 'none') {
    setTimeout(function() {
      menu.style.opacity = '1';
    }, 100);
    menuUl.style.display = 'flex';
    menu.style.borderTop = 'solid';
    menu.style.borderTopColor = '#00D09C';
  } else {
    menuUl.style.display = 'none';
    menu.style.borderTop = 'none';
  }
  menu.appendChild(menuUl);
  menuUl.innerHTML= menuItems;
  });
}


// if (menuIcon) {
//   menuIcon.addEventListener("click", () => {
//     showNavbarItems();
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
        formElement.addEventListener("submit", async (event) => {

            if(!validateSearch(event)) {
                event.preventDefault()
                console.log("NO VALIDAAA");
            }
        })
    }
}

searchJobs()