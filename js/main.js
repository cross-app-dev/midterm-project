// JavaScript Document
/**************************
	Declarations
**************************/
var currentItem = 0;
var loadBtn;
var mainOutDiv;
var sidebarOutDiv;

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
//    console.log("Data inside json file is:", data);
	moveExistingDataToSide( );
	displayNewDataInMain( );
}

function displayNewDataInMain( ){

	//clear the data from the main output div by
    mainOutDiv.innerHTML = "";

	//replacing it with the next object from the JSON in data.js
    replaceJsonObject(createChildrenNodes());

	//Use the currentItem variable to keep track of which item you are showing
	//Increment the currentItem variable after you display the data in the output div
    getNextItemIndex();
}

function moveExistingDataToSide( ){
	//take the data in the main section output div	and add it to the sidebar output div


}

function getNextItemIndex (){
    /* reset index once we reach last object in json file. */
    currentItem = (currentItem === (data.items.length-1))? 0: currentItem+1;
}

function createChildrenNodes (){

    /* Create all required nodes that will be added to main section.*/
    var currentJsonEntry = data.items[currentItem];

    var titleNode = document.createElement("h1");
    titleNode.appendChild(document.createTextNode(currentJsonEntry.title));

    var dateNode  = document.createElement("p");
    dateNode.appendChild(document.createTextNode(currentJsonEntry.date));
    dateNode.id = "date";

    var authorNode = document.createElement("p");
    authorNode.appendChild(document.createTextNode(currentJsonEntry.author));
    authorNode.id = "author";

    var descriptionNode = document.createElement("p");
    descriptionNode.appendChild(document.createTextNode(currentJsonEntry.description));
    descriptionNode.id = "description";

    var imgNode = document.createElement("img");
    /* Set source and alternative properties for each given image. */
    imgNode.src = "./img/" + currentJsonEntry.image;
    imgNode.alt = "image of "+ currentJsonEntry.author;

    var anchorNode = document.createElement("a");
    anchorNode.appendChild(document.createTextNode(currentJsonEntry.link));
    /* Set hyperlink value for the corresponding link. */
    anchorNode.href = currentJsonEntry.link;
    anchorNode.id = "reference-link";

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

function replaceJsonObject(jsonObject){
    for (prop in jsonObject){
        mainOutDiv.appendChild(jsonObject[prop]);
    }
}
