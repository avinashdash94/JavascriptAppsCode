const menuBtn = document.querySelector(".menu-btn");
let menuOpen = false; // created a flage to check animation true or false
menuBtn.addEventListener('click', () => {
   if(!menuOpen) {
    menuBtn.classList.add('open');  //We add a class which cause animation
    menuOpen = true;
   }
   else{
       menuBtn.classList.remove('open') //We remove a class which cause animation
       menuOpen = false;
   }

} )


