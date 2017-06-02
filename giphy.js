
$(document).ready(function() {

var games = ["Final Fantasy", "Legend of Zelda", "Fallout", "Super Mario", "Metal Gear Solid", "Pacman", "Tetris", "Call of Duty", "Bowling", "Badminton"];


// This will display the buttons for each game category

function displayGifButtons() {

  for (var i = 0; i < games.length; i++) {

        var gifButton = $("<button>");

        gifButton.addClass("game");

        gifButton.addClass("btn btn-primary");

        gifButton.attr("data-name", games[i]);

        gifButton.text(games[i]);

        $("#gifButtonsView").append(gifButton);
    }
}

// This section is for adding the new button

function addNewButton() {

    $("#addGif").on("click", function() {

    var game = $("#game-input").val().trim();

    games.push(game);

    displayGifButtons();

    return false;

    });
}

// This section to get gifs from giphy api and then display the gifs

function displayGifs() {

    var game = $(this).attr("data-name");

    var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + game + "&api_key=dc6zaTOxFJmzC&limit=10";
    
    console.log(queryURL);
    
    $.ajax({
        url: queryURL,
        method: 'GET'
    })

    .done(function(response) {
        
        console.log(response);
        
        $("#gifsView").empty();
        
            var results = response.data;
        
        for (var i=0; i<results.length; i++){

        var gifDiv = $("<div>"); 
            
        var gifRating = $("<p>").text("Rating: " + results[i].rating);

                gifDiv.append(gifRating);

        
            var gifImage = $("<img>");

            gifImage.attr("src", results[i].images.fixed_height_small_still.url);
            
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url);
            
            gifImage.attr("data-state", "still");
            
            gifImage.addClass("image");
            
            gifDiv.append(gifImage);

            $("#gifsView").prepend(gifDiv);
        }
    });
}

$(document).on("click", ".game", displayGifs);

displayGifButtons();

addNewButton();

// This will make the buttons switch between animated or still

$(document).on("click", ".image", function() {
    
    var state = $(this).attr('data-state');
    
    if ( state == 'still'){
    
        $(this).attr('src', $(this).data('animate'));
    
        $(this).attr('data-state', 'animate'); }

        else {
        
        $(this).attr('src', $(this).data('still'));
        
        $(this).attr('data-state', 'still');
    }
});
});
