function animatedForm()
{
    const arrows = document.querySelectorAll(".fa-arrow-down");
    arrows.forEach(arrow=>{
        arrow.addEventListener('click', ()=>{
            const input = arrow.previousElementSibling; //get text field
            const parent = arrow.parentElement; // get the parent div in which <i> tag is there
            const nextForm = parent.nextElementSibling; // get siblilg of parent div which contains next text field

            //Check for validation
            if(input.type === "text" && validateUser(input)){
                //console.log("Everything is ok");
                nextSlide(parent, nextForm);
            }
            else if(input.type === "email" && validateEmail(input)) {
                nextSlide(parent, nextForm);
            }
            else if(input.type === "password" && validateUser(input)){
                //console.log("Everything is ok");
                nextSlide(parent, nextForm);
            }
            else{
                parent.style.animation = 'shake 0.5s ease';
            }

            // get rid of animation
            parent.addEventListener('animationend', ()=>{
                parent.style.animation = '';
            });
             //console.log(parent);
        })
    });
}

//To validate the input text
function validateUser(user){
    if(user.value.length < 6){
        console.log("not enough characters");
        error('rgb(189, 87, 87)');
    }
    else
    {
        error('rgb(87, 189,130)');
        return true;
    }
}

//Change the color of background if error occure
function error(color){
    document.body.style.backgroundColor  = color;
}

//change the crunt to next text field
function nextSlide(parent, nextForm){
    parent.classList.add('innactive');
    parent.classList.remove('active');
    nextForm.classList.add('active');


}

//VAlidate Email
function validateEmail(email){
    const validation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(validation.test(email.value)){
        error('rgb(87, 189,130)');
        return true;
    }
    else{
        error('rgb(189, 87, 87)');
    }
}

animatedForm();