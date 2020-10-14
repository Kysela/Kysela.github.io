var divItems = document.getElementsByClassName("col-xs-12 col-sm-4 col-md-3 no-print");

function changeBackground() {
   if (document.body.style.background == "white" ||
       document.body.style.background == "") 
       document.body.style.background = "black";
       else
       document.body.style.background = "white";
}