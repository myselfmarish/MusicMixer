// this is a self-invoking anonymous function
// it is also called a module ( my variationf o the module pattern)
// it encapsulates all fo your custom code and makes it private

(() => {
    let name="Trevor";
})();



(() => {
    //  make associations (select) with elements in the html markup using CSS selecors
    let theHeading = document.querySelector(".main-heading") ,
        theIcons = document.querySelectorAll(".icon");

    //script your behaviour with functions
function logElement() {
    console.log('clicked on an element: ', this.id);
}

    // add event handling here (user "triggers)"
    // assign the event you want to listen for, and the function that should be run 
    theHeading.addEventListener("click", logElement);

    // (referenceing theIcons) loop through all of the icons and add event handling ot them
    // process each icon one at a time and add behaviour 
    theIcons.forEach(icon => icon.addEventListener("click", logElement));
})();


