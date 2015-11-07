$(document).ready(function(){
    getData();
    $("#messageForm").submit(function(event){
        event.preventDefault();
        var values = {};

        $.each($(this).serializeArray(), function(i, field){
            values[field.name] = field.value;
        });

        $("#messageForm").find("input[type=text]").val("");
        $("#messageForm").find("textarea[type=text]").val("");

        postData(values);
    });
});

function getData(){
    $.ajax({
        type: "GET",
        url: "/post/data",
        success: function(data){
            updateDOM(data);
        }
    });
}

function postData(values){
    $.ajax({
        type: "POST",
        url: "/post/data",
        data: values,
        success: function(){
            getData();
        }
    });
}

function updateDOM(data){
    $("#messageContainer").empty();

    for(var i = 0; i < data.length; i++){
        var el = "<div class='messageBlock'>" +
            "<p class='name'>" + data[i].name + " said: </p>" +
            "<p class='message'>" + data[i].message + "</p></div>";

        $("#messageContainer").append(el);
    }

}