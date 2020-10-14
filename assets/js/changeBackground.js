document.getElementById("about-profile-img").addEventListener("click", changeBackground);

function changeBackground() {
   if (document.body.style.background == "white" ||
       document.body.style.background == "") 
       document.body.style.background = "black";
       else
       document.body.style.background = "white";
}


