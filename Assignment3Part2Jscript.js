
//fetch gist data from github using its api
var originalGistList = [];

var li = document.createElement('li');
//if(document.getElementById("fetch").onclick) //= function () {fetchData};
var lang = 'SQL';
//else
//;
var fetchData = function(){
	var req = new XMLHttpRequest();
	if(!req){
		throw 'error. unable to create xmlhttprequest';
	}
	var gistType = document.getElementsByName('GIST');[0];
	var url = 'https://api.github.com/gists/public';
	var params = {
       language: lang,
       q: 'gists',
       mode: 'json',
       cnt: '2'

	};
	url += '?' + urlToString(params);
	req.onreadystatechange = function (){
        if(this.readyState === 4){
          var gistInput = JSON.parse(this.responseText);
          originalGistList = gistInput;   //parse here?
          for(var i =0; i< 30; i++){
	var dl = document.createElement('dl');
	var entry = generateGistHtml(originalGistList[i]);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
    dl.appendChild(generateFbutton(originalGistList[i]));
    li.appendChild(dl);
    }
    document.getElementById('gist-list').appendChild(li);
   // var brk = document.createElement('br');
    //brk.appendChild(generateFbutton(originalGistList[i]));
    //document.getElementById('gist-list').appendChild(brk)
    //document.getElementById('gist-list').appendSibling(fbutton);
   // generateFbutton(originalGistList[i]);
//}

        }
	};
	req.open('get', url);
	req.send();
	//Do the XMLHttpRequest here and keep the result in the originalGistList
	//When you got the data, you need to iterate over them and call the function 
	//from the next step inside it per gist to generate the html content (generateGistHtml)
}

//convert gists into html elements in a originalGistList
var generateGistHtml = function(gist) {
	//gist will have the entire gist data that comes from the api, for the details check my pinned discussion about understanding JSON
	//Add a button (code above goes here) next to each element and save the gist id in the html to be able to find it again, if you chose id, you need a function called findById(id) that takes a gist id and iterates over originalGistList to find the appropriate gist and returns it.
	//This function will be used in the previous step function (fetchData)
    var dt = document.createElement('dt');
	var dd = document.createElement('dd');
	dt.innerText = gist.description;
	if(dt.innerText == "")
	dt.innerText = "No description was given";
	dd.innerText = gist.url;
    return {'dt':dt, 'dd':dd};
}




var findById = function(id) {
	//iterate over list of gists to find the gist with id equals to input id
	//return that gist
}
function generateFbutton(gist){
var fbutton = document.createElement("button");
fbutton.style.cssFloat = "left";
fbutton.innerHTML = "+";
fbutton.setAttribute("gistId", gist.id);
fbutton.onclick = function(){
	var gistId = this.getAttribute("gistId"); //this is what you have saved before
	var toBeFavoredGist = findById(gistId);
	//here you add the gist to your favorite list in the localStorage and remove it from the gist list and add it to favorite list
}
//document.getElementById('gist-list').appendChild(fbutton);
return fbutton;
}
//favorite button next to gist html elements

//favorite list remove button

//select language (optional)

function urlToString(obj){
	var str = [];
	for(var prop in obj){
		var s = encodeURIComponent(prop) + '=' + encodeURIComponent(obj[prop]);
		str.push(s); 
	}
	return str.join('&'); //?
}
window.onload = function(){
	var favoriteStr = localStorage.getItem('favoriteString');
	if(favoriteStr === null){
		var fav = {};
		//localStorage.setItem('favoriteString', JSON.stringify(fav));
	}
}
//var ul = document.getElementById('gist-list');
var r = fetchData();


var x = [];
