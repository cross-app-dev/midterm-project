// JavaScript Document
/**************************
	Declarations
**************************/
var currentItem = 0;

/* JS object to refer to load button inside the webpage. */
var loadBtn;

/* JS object to refer to main section inside the webpage.*/
var mainOutDiv;

/* JS object to refer to sidebar section inside the webpage. */
var sidebarOutDiv;

/* JS object to refer to container div for every json object. The main target of this container is to
   facilitate the removal of json object from side bar.*/
var containerNode;

/* Upon loading the webpage, perfrom the required initialization. */
window.onload = init;

function init( ){
	//any user events that you want to add after the page loads (like clicking a button)

    /* Get reference to load button and set click event listener. */
    loadBtn = document.querySelector(".btn");
    loadBtn.addEventListener("click",fetchData);

    /* Get reference to output HTML divs*/
    mainOutDiv = document.querySelector("#output1");
    sidebarOutDiv = document.querySelector("#output2");
}

function fetchData( ){
	//when the user clicks the load button we would normally do an AJAX call to fetch the data
	//our data is already in the other file - data.js
	moveExistingDataToSide( );
	displayNewDataInMain( );
}

function displayNewDataInMain( ){

	//clear the data from the main output div by
    mainOutDiv.innerHTML = "";

	//replacing it with the next object from the JSON in data.js
    containerNode = createContainerNode();
    mainOutDiv.appendChild(containerNode);

	//Use the currentItem variable to keep track of which item you are showing
	//Increment the currentItem variable after you display the data in the output div
    getNextItemIndex();
}

function moveExistingDataToSide( ){
	//take the data in the main section output div	and add it to the sidebar output div

    if(containerNode){
        applySidebarStyle();

        var MAX_NUM_OF_ELEMS = 3;

        /* Length of sidebar element nodes would reach 3 as maximum. */
        if(MAX_NUM_OF_ELEMS === sidebarOutDiv.children.length ){

            /* lastChild property contains "return character", get previous element node.
               Thus last DOM element node is obtained and ready to be removed. */
            sidebarOutDiv.removeChild(sidebarOutDiv.lastChild.previousElementSibling);
            /*console.log("sidebarOutDiv.children.length = ", sidebarOutDiv.children.length);*/
        }
        sidebarOutDiv.insertBefore(containerNode, sidebarOutDiv.firstChild);
    }
}

function getNextItemIndex (){
    /* reset index once we reach last object in json file. */
    currentItem = (currentItem === (data.items.length-1))? 0: currentItem+1;
}

function createChildrenNodes (){

    /* Create all required nodes that will be added to main/sidebar section.*/
    var currentJsonEntry = data.items[currentItem];

    var titleNode = document.createElement("h2");
    titleNode.appendChild(document.createTextNode(currentJsonEntry.title));

    var dateNode  = document.createElement("p");
    dateNode.appendChild(document.createTextNode(currentJsonEntry.date));
    dateNode.className = "output-date";

    var authorNode = document.createElement("p");
    authorNode.appendChild(document.createTextNode(currentJsonEntry.author));
    authorNode.className = "output-author";

    var descriptionNode = document.createElement("p");
    descriptionNode.appendChild(document.createTextNode(currentJsonEntry.description));
    descriptionNode.className = "output-description";

    var imgNode = document.createElement("img");
    /* Set source and alternative properties for each given image. */
    imgNode.src = "./img/" + currentJsonEntry.image;
    imgNode.alt = "image of "+ currentJsonEntry.author;
    imgNode.className = "output-img";

    var anchorNode = document.createElement("a");
    anchorNode.appendChild(document.createTextNode(currentJsonEntry.link));
    /* Set hyperlink value for the corresponding link. */
    anchorNode.href = currentJsonEntry.link;
    anchorNode.className = "output-link";

    /* Collect the elements in one object to add them properly to main div. */
    return {
        "title":titleNode ,
        "img":imgNode,
        "author":authorNode ,
        "date":dateNode ,
        "description":descriptionNode ,
        "link":anchorNode
    };
}

/*  This function appends the given jsObject into the parent Node. JS object must hold a valid
    HTML element for every key/value pairs in the object.
*/
function addJsonObject(parentNode , jsObject){
    for (prop in jsObject){
        parentNode.appendChild(jsObject[prop]);
    }
}

/* This function creates a div container node to all json objects that are required to be added.
   It appends all children to the container.
*/
function createContainerNode (){
    var htmlOutNode = createChildrenNodes();
    var divNode = document.createElement("div");
    addJsonObject(divNode, htmlOutNode);
    return divNode;
}

/* This function is to add CSS class to any element node. */
function applyStyleClass(elemNode, targetClassName){
    elemNode.className += (" "+ targetClassName);

}

/* This function styles sidebar section by adding corresponding CSS classes to its children elements.
   I stick to use classes instead of applying this styles in CSS file itself using id selector to reduce
   required code changes (if any) in the future.
*/
function applySidebarStyle(){
    var listOfParagraphs = containerNode.getElementsByTagName("p");
    for(var i=0; i<listOfParagraphs.length ; i++){
        applyStyleClass(listOfParagraphs[i], "small-text");
    }

    applyStyleClass(containerNode.getElementsByClassName("output-link")[0], "small-text");
    applyStyleClass(containerNode.getElementsByTagName("h2")[0], "small-heading");
}
