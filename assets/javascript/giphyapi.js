// Load the page
$(document).ready(function(){

// Create variables, the buttons that will be displayed 
var topics = ['puppy', 'animals', 'celebrities', 'dance', 'Harry Potter', 'disney', 'food', 'funny', 'love', 
              'lit', 'party', 'panda', 'ice cream', 'sports', 'BFF', 'Beyonce', 'cat', 'hello'];

// Display Function: Bottons
function displayButtons(){ 
  $('.buttons').empty();
    
  // Function will .append() the list of bottoms using a for loop though the lenght of the object to create the necessaty number of buttons

  for (var i = 0; i < topics.length; i++) {  
    var b = $('<button>') 

    //CREATED DIV CLASS 'TOPIC BUTTONs'
    b.addClass('topicBtn'); 
    b.attr('data-name', topics[i]); 
    b.text(topics[i]);  
    $('.buttons').append(b); 
  }   
}

// the .on('click') of each botthon using the giphy api for the search term
$('#addButton').on('click', function(){
  var topic = $('#topic-input').val().trim();
    topics.push(topic);
    displayButtons(); // Add new buttons
    return false;       
});
// CALL FUNCTION
displayButtons(); 
// CALL FUNCTION ON CLICKS
$(document).on('click', '.topicBtn', displayTopic);

// DISPLAY TOPIC FUNCTION
function displayTopic(){
  
  var topic = $(this).attr('data-name');    
    

// GIPLY API CALL
  var APIkey = "&limit=20&api_key=dc6zaTOxFJmzC";
  var queryURL = 'https://crossorigin.me/http://api.giphy.com/v1/gifs/search?q=' + topic + APIkey;
    
    //Use ajax to request data
    $.ajax({
      url: queryURL, 
      method: 'GET'
    })
    //use .done to return data
    .done(function(response) {
      console.log(response);
      console.log(response.data);
      var results = response.data;

      //create a for loop to display the number of results that are return
        for (var i = 0; i < results.length; i++){

          //create the image div variable
          var gifDiv = $('<div class="item">')
          var type = results[i].type;
          //create a rating & P variables that adds p tags to the image div to display rating
          var p1 = $('<p>').text("Type: " + type);
          var rating = results[i].rating;
          var p2 = $('<p>').text("Rating: " + rating);
          
          //create a variable to set the images to '<img class="gif">
          var stillImage = $('<img class="gif">');

          //add an atribute the stillImage variable to called and pull the link for the api results and displays the still image
          stillImage.attr('src', results[i].images.fixed_width_still.url);
          
          //append variables
          gifDiv.append(p1);
          gifDiv.append(p2);
          gifDiv.append(stillImage);

          //set the gifDiv to .data()
          $(gifDiv).data('state', 'still');
          $(gifDiv).data('stillUrl', results[i].images.fixed_width_still.url);
          $(gifDiv).data('animatedUrl', results[i].images.fixed_width.url);

          $('#gifDiv').prepend(gifDiv);
            console.log(displayTopic);
          $(gifDiv).on("click", imageState);
      }
  });
}
// Image State Function - (Still To Animate)
function imageState(event) {

  //specified div
  var topicState = event.currentTarget; 

  // img variable                
  var image = $(topicState).find('img');

  // still value variable            
  var stillUrl = $(topicState).data('stillUrl'); 

  // animated variable        
  var animatedUrl = $(topicState).data('animatedUrl');    
    // create the statement to change still image to animated
    if($(topicState).data('state') === 'still') {
      $(topicState).data('state', 'animated');
      $(image).attr('src', animatedUrl);                  
    } else {
      $(topicState).data('state', 'still');
      $(image).attr('src', stillUrl);
    }
  }

});