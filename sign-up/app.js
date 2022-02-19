const progress = document.getElementById("progress")
const prev = document.getElementById("pre-signup")
const next = document.getElementById("next-signup")
const circles = document.querySelectorAll(".progress-step")
const numCircles = document.querySelectorAll(".num")

let currentActive = 1

next.addEventListener(('click'), ()=>{
    if(!checkedTeacher()){
        var parent = document.querySelector("ul");
        if(document.querySelectorAll("li").length < 3){
            var mesg = document.createElement("li")
            mesg.classList.add('mesg');
            mesg.appendChild(document.createTextNode("For Registration You Must Be A Teacher"));
            parent.appendChild(mesg);
        }

    }else if(currentActive == 2){
        //go to the Dash Board
        //create the object of the Examineer here
        //and also log it to the LOCAL STORAGE
        console.log("we insert a link to go to from the registration page");
    }
    else{
        if(document.querySelectorAll('li').length == 3)
            document.querySelector('.mesg').remove()
        currentActive++;
        if(currentActive > circles.length){
            currentActive = circles.length;
        }
    
        const first = document.querySelectorAll(".user-option")
        first.forEach(elem => {
            elem.classList.add("hidden")
        });
        const second = document.querySelectorAll(".second-form");
        second.forEach(elem => {
            elem.classList.toggle("hidden")
        });
    
    
        update()
    }



})

//if the radio button has teacher selected it will return the boolean true and false other wise
function checkedTeacher(){
    const user = document.querySelectorAll(".user-type");
    let teacher = false;
    user.forEach((userEl, index) => {

        if(userEl.checked){
            if(index == 0){
                teacher =  true;
            }
        }
    });
    return teacher;
}


prev.addEventListener(('click'), ()=>{
    currentActive--;
    if(currentActive < 1)
        currentActive = 1;


    const first = document.querySelectorAll(".user-option")
    first.forEach(elem => {
        elem.classList.toggle("hidden")
    });
    const second = document.querySelectorAll(".second-form");
    second.forEach(elem => {
        elem.classList.add("hidden")
    });

    update()
})

function update(){
    circles.forEach((circle, index) =>{
        if(index < currentActive){
            circle.classList.add('current-progress')
        }else{
            circle.classList.remove('current-progress')
        }
    })

    numCircles.forEach((num, index) => {
        index < currentActive ? num.classList.add('num-active') : num.classList.remove('num-active');
    })


    
    const active = document.querySelectorAll(".current-progress")

    progress.style.width = (active.length-1)/(circles.length-1)*100 + '%';

    if(currentActive == 1){
        prev.disabled = true;
        next.innerText = "Next";
    }
    else if(currentActive == circles.length){
        next.innerText = "Finish";
        prev.disabled = false;
    }
    else{
        prev.disabled = false;
        next.innerText = "Next";
    }

}
