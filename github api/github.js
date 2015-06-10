$(function() {
    var userName = []
    
    if (localStorage.names) {
        userName = JSON.parse(localStorage.names)
        console.log(userName)
        userName.forEach(function (item, index, array) {
            ajax(item)
        })
        
        
    }
    
    function buildHtml(name, imageUrl) {
        var cloneUser = $(".user:first").clone(true).show();
  
        cloneUser.find(".user-name").text(name)
        cloneUser.find(".user-image").prop("src", imageUrl )
        $("#github").append(cloneUser)
        console.log(name)
        console.log(imageUrl)
        
    }
    
    
    function ajax(name) {
            $.ajax("https://api.github.com/users/" + name)
            .success(function(response) {
                buildHtml(response.name, response.avatar_url)
                userName.push(name)
                localStorage.setItem("names", JSON.stringify(userName))
            });
    }
    
    $("#searchButton").click(function() {
        var name = $("#searchText").val()
        var nameapi = "https://api.github.com/users/" + name
        console.log("https://api.github.com/users/" + name)
        ajax(name)
    })
});
