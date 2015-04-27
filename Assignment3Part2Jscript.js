
//fetch gist data from github using its api
var originalGistList = [];
var favGistList = [];
var favgits = 0; 
var li = document.createElement('li');
var fli = document.createElement('li');
//if(document.getElementById("fetch").onclick) //= function () {fetchData};
var lang = 'SQL';
//else
//;
var fetchData = function(input){
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
          	if(isLang(originalGistList[i].files, input))
          		console.log("hi");
          	else 
          		console.loh("no");
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
	if(!(gist === null) && !(gist ===undefined)){
	dt.innerText = gist.description;
	if(dt.innerText == "")
	dt.innerText = "No description was given";
	dd.innerHTML = '<a href= "' + gist.url +'">' + gist.url;
    }
    return {'dt':dt, 'dd':dd};

}




var findById = function(idnum) {
	//iterate over list of gists to find the gist with id equals to input id
	//return that gist
	if(originalGistList[0] === undefined){
		var t = JSON.parse(localStorage.getItem('favArray'));
		for(var k =0; k < t.length; k++){
			
			if(!(t === null || t ===undefined))
				{
					if(t[k].id == idnum)
						return t[k];
				}

		}
			return null;
		}
	for(var j =0; j<originalGistList.length; j++){

		if(originalGistList[j].id == idnum)
			return originalGistList[j];
	}
}
function generateFbutton(gist){

var fbutton = document.createElement("button");
fbutton.style.cssFloat = "top";
fbutton.innerHTML = "+";
if(gist === undefined || gist === null)
		return fbutton;
fbutton.setAttribute("gistId", gist.id);
fbutton.onclick = function(){
	var gistId = this.getAttribute("gistId"); //this is what you have saved before
	var toBeFavoredGist = findById(gistId);
    this.style.display = "none";
   //this.parentNode.style.visibility = "hidden";
    this.parentNode.style.display = "none";
    //toBeFavoredGist.setAttribute("favorited", true);
    localStorage.setItem(favgits, JSON.stringify(toBeFavoredGist));

    favgits ++;
    localStorage.setItem('num', favgits);
    favGistList[favGistList.length] = toBeFavoredGist;    
    localStorage.setItem('favArray', JSON.stringify(favGistList));
    
    //document.getElementById("favorite-list").appendChild
    
    var dl = document.createElement('dl');
	var entry = generateGistHtml(toBeFavoredGist);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
    dl.appendChild(generateexFbutton(toBeFavoredGist));
    fli.appendChild(dl);
    
    document.getElementById('favorite-list').appendChild(fli);
    
	//here you add the gist to your favorite list in the localStorage and remove it from the gist list and add it to favorite list
    
}
//document.getElementById('gist-list').appendChild(fbutton);
return fbutton;
}
//favorite button next to gist html elements
function generateexFbutton(gist){
	if(gist ===  undefined || gist === null)
		return null;
var exfbutton = document.createElement("button");
exfbutton.style.cssFloat = "top";
exfbutton.innerHTML = "-";
exfbutton.setAttribute("gistId", gist.id);
exfbutton.onclick = function(){
	//this.parentNode.style.visibility = "hidden";
	this.parentNode.style.display = "none";
	var gistId = this.getAttribute("gistId"); //this is what you have saved before
	var toBeFavoredGist = findById(gistId);
    var dl = document.createElement('dl');
    
	var entry = generateGistHtml(toBeFavoredGist);
	dl.appendChild(entry.dt);
	dl.appendChild(entry.dd);
    dl.appendChild(generateFbutton(toBeFavoredGist));
    li.appendChild(dl);
    //fbutton.style.display = "visible";
    if(originalGistList[0] === undefined){
    	var t = JSON.parse(localStorage.getItem('favArray'));
    for(var index =0; index < t.length; index++){
    	if(t[index].id == toBeFavoredGist.id){
    		for(var z = index;z<t.length;z++)
    			t[z] = t[z+1]; 
             t[t.length] = null;
             break;
    }

}
localStorage.setItem('favArray', JSON.stringify(t));
}
    document.getElementById('gist-list').appendChild(li);
    var count =0;
    var c = localStorage.getItem('num');
    do{
		var temp = localStorage.getItem(count);
		if(temp === null)
			count++;
		else
		{
			temp = JSON.parse(temp);
			count ++;
			if(!(temp === null))
			if(temp.id == gistId){
				localStorage.setItem(count, null);
                localStorage.setItem('num', (favgits-1));
               }
		}
}while(c > count);

}
return exfbutton;
}
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
		var fav = "hi";
		localStorage.setItem('favoriteString', JSON.stringify(fav));
		localStorage.setItem('num', 0);
		localStorage.setItem('favArray', favGistList);
	}
	else
	{
        var c = localStorage.getItem('num');
        var favGistList = JSON.parse(localStorage.getItem('favArray'));
        var i=0;
		do{
		//var temp = localStorage.getItem(favgits);
		var temp = favGistList[i];
		if(temp === null)
			i++; //favgits++;
		else
		{
			//temp = JSON.parse(temp);
			i++;
			favgits ++;
			var dl = document.createElement('dl');
	        var entry = generateGistHtml(temp);
	        dl.appendChild(entry.dt);
	        dl.appendChild(entry.dd);
            dl.appendChild(generateexFbutton(temp));
            fli.appendChild(dl);
    
    document.getElementById('favorite-list').appendChild(fli);
		}
}while(favGistList.length > i)
//while(favgits < c);
	}
	
    
	document.getElementById("fetch").onclick = function(){
		var input = document.getElementsByName("lang");
		for(var i =0; i<=4; i++){
			if(input[i].checked == true){
				input = input[i].value;
			    break;
			}
		}
	fetchData(input);
};
}

function isLang(str, lang){
	/*str = JSON.stringify(str);
   
	str = str.split(",");

	for(var j=0; j<str.length; j++){
        var z = JSON.stringify(str[j]);
        z = z.split(":");
        if( z[0] == "language")
        	if(z[1] == lang)
        		return true;
        		else 
        			return false;
	}
	*/
	return true;
}