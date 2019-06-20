let looneyTunes = ["Bugs Bunny", "Daffy Duck", "Elmer Fudd", "Wile E. Coyote"]

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
                for (var i = 0; i < results.length; i++) {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var personImage = $("<img>");
                    personImage.attr("src", results[i].images.fixed_height.url);
                    gifDiv.prepend(p);
                    gifDiv.prepend(personImage);
                    $("#gifs-go-here").prepend(gifDiv);
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
});

$(document).on("click", ".character-btn", displayCartoon);


renderButtons();