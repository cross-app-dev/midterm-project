// JavaScript Document
/**************************
	Declarations
**************************/
var currentItem = 0;



window.onload = init;

function init( ){
	//any user events that you want to add after the page loads (like clicking a button)

}

function fetchData( ){
	//when the user clicks the load button we would normally do an AJAX call to fetch the data
	//our data is already in the other file - data.js

	moveExistingDataToSide( );
	displayNewDataInMain( );
}

function displayNewDataInMain( ){
	//clear the data from the main output div by
	//replacing it with the next object from the JSON in data.js
	//Use the currentItem variable to keep track of which item you are showing
	//Increment the currentItem variable after you display the data in the output div

}

function moveExistingDataToSide( ){
	//take the data in the main section output div	and add it to the sidebar output div

}
