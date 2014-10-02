// JavaScript Document
/**************************
	Declarations
**************************/
var currentItem = 0;
var loadBtn;
var mainOutDiv;
var sidebarOutDiv;
var containerNode;
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
    mainOutDiv.appendChild(createContainerNode());

	//Use the currentItem variable to keep track of which item you are showing
	//Increment the currentItem variable after you display the data in the output div
    getNextItemIndex();
}

function moveExistingDataToSide( ){
	//take the data in the main section output div	and add it to the sidebar output div

    if(containerNode){
        var listOfParagraphs = containerNode.getElementsByTagName("p");
        for(var i=0; i<listOfParagraphs.length ; i++)
            applyStyleClass(listOfParagraphs[i], "small-text");
        applyStyleClass(containerNode.getElementsByClassName("output-link")[0], "small-text");
        applyStyleClass(containerNode.getElementsByTagName("h2")[0], "small-heading");
        sidebarOutDiv.appendChild(containerNode);
        console.log(sidebarOutDiv.children.length);
    }
}

function getNextItemIndex (){
    /* reset index once we reach last object in json file. */
    currentItem = (currentItem === (data.items.length-1))? 0: currentItem+1;
}

function createChildrenNodes (){

    /* Create all required nodes that will be added to main section.*/
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

function addJsonObject(parentNode , jsonObject){
    for (prop in jsonObject){
        parentNode.appendChild(jsonObject[prop]);
    }
}

function createContainerNode (){
    var htmlOutNode = createChildrenNodes();
    containerNode = document.createElement("div");
    addJsonObject(containerNode, htmlOutNode);
    return containerNode;
}

function applyStyleClass(elemNode, targetClassName){
    elemNode.className += (" "+ targetClassName);

}
