let looneyTunes = ["Bugs Bunny", "CatDog", "Popeye", "Ren and Stimpy", "Wile E. Coyote"]

function displayCartoon() {
        var cartoon = $(this).attr("data-cartoon");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            cartoon + "&api_key=5FnDYN6dOFN8STF2Gmo2viZNOddm3yth&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                var results = response.data;
                $("#gifs-go-here").empty();
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    personImage.addClass("gif");
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-go-here").prepend(gifDiv);
                    setDataState();
                }
            });
}





function renderButtons() {
    $("#buttons").empty();
    for (var i = 0; i < looneyTunes.length; i++) {
        var a = $("<button>");
        a.addClass("character-btn");
        a.attr("data-cartoon", looneyTunes[i]);
        a.text(looneyTunes[i]);
        $("#buttons").append(a);
    }
}

$("#add-character").on("click", function (event) {
    event.preventDefault();
    var character = $("#character-input").val().trim();
    looneyTunes.push(character);
    renderButtons();
    $('#character-input').val("");
});

$(document).on("click", ".character-btn", displayCartoon);


renderButtons();




//==================================================================//
//Stuff below here related to pause functionality still needs work- setting a data state for all loaded gifs 
//as they appear by calling the below global function, started toggle pause function
//based around state attribute recognition and "if" statement that will switch the source for the image and the
//"state" attribute. Need to figure out how to reference the image url location without using the for loop variable...

function setDataState() {
    let cartoonImage = $(".gif");
    cartoonImage.attr("state", "animate");
}

// function togglePause() {
//     if ($(this).attr("state" === "animate")) {
//         $(this).attr("src", results[i].images.fixed_height_still.url);
//         $(this).attr("state", "still");
//     } else {
//         $(this).attr("src", results[i].images.fixed_height.url);
//         $(this).attr("state", "animate");
//     }
// }

// $(".gif").on("click", togglePause());