// The anonymous function below will fire on page load

// Some things to consider
// $.ajax(); to make your requests a little easier. Or the vanilla js way, it's up to you.
// $.on(); for event handling
// Remember, selecting elements in jQuery is like selecting them in CSS
// You'll probably have to manipulate some strings
// some jQuery functions to help display results
// $.show(), $.hide(), $.slideup(), $.slidedown(), $.fadein(), $.fadeout()
// Add content from requests with something like
// $.html(), $.text(), etc.
// keyup events could be helpful to get value of field as the user types

(function() {
	// Magic!
	console.log('Keepin\'n it clean with an external script!');

	//Clear screen
	$(".flexsearch-input").val("");

	//Pull data from api
	var dataStuff;
	var jqxhr = $.ajax({
		dataType: "json",
		url: "http://www.mattbowytz.com/simple_api.json?data=all",
		error: function(){
			console.log("ERROR");
		},
		success: function(data){
			dataStuff = data['data'];
			console.log(dataStuff);
		},
		type: 'GET'
	});

	//Compare the search input to "data"
	var searchInput;
	$(".flexsearch-input").keyup(function(){
		searchInput = $(".flexsearch-input").val();
		var strings=new Array();
		for(var i = 0; i < dataStuff['programming'].length; i++){
			if(searchInput.toLowerCase() == dataStuff['programming'][i].substring(0, searchInput.length).toLowerCase()){
				strings.push(dataStuff['programming'][i]);
			}
		}
		for(var i = 0; i < dataStuff['interests'].length; i++){
			if(searchInput.toLowerCase() == dataStuff['interests'][i].substring(0, searchInput.length).toLowerCase()){
				strings.push(dataStuff['interests'][i]);
			}
		}

		if(searchInput.length > 0 && strings.length > 0){
			var htmlOut = "";
			for(var i = 0; i < strings.length; i++){
				var link = "https://www.google.com/#q=" + strings[i];
				htmlOut += "<a href = " + link + ">" + strings[i] + "</a></br>"
				}
			$("#reply").html(htmlOut);
		}
		else
			$("#reply").text("");
	});

	$(function(){
		$("#mainForm").submit(function(){
			var url = "https://www.google.com/#q=" + $(".flexsearch-input").val();
			window.location = url;
			return false;
		});
	});
})();