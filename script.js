let myForm = document.getElementById("myForm");
let websiteName = document.getElementById("websiteName");
let websiteUrl = document.getElementById("websiteUrl");
let output = document.getElementById("output");


let bookmarkArray = [];
function handleSubmit(e){
	//alert("1");
	e.preventDefault();
	console.log("websiteName.value",websiteName.value);
	if(!websiteName.value){
		alert("Please fill website name.");
		return;
	}
	if(!websiteUrl.value){
		alert("Please fill website URL.");
		return;
	}
	

	let bookmarkObject = {
		websiteName: websiteName.value,
		websiteUrl: websiteUrl.value
	}
	console.log(bookmarkObject);
	console.log(bookmarkArray);
	bookmarkArray.push(bookmarkObject);
	localStorage.setItem("bookmarks", JSON.stringify(bookmarkArray));//local storage stores strings
	fetchData();
	myForm.reset();
	


}
function deleteItem(url){
	let getArray = JSON.parse(localStorage.getItem("bookmarks"));
	for(let i=0;i<getArray.length;i++){
		if(getArray[i].websiteUrl === url){
			getArray.splice(i,1);
		}
	}
	localStorage.setItem("bookmarks", JSON.stringify(getArray));
	fetchData();
}

function fetchData(){
	output.innerHTML = "";
	let getArray = JSON.parse(localStorage.getItem("bookmarks"));
	console.log("getArray",getArray);
	if(getArray){	
		for(let i=0;i<getArray.length;i++){
			console.log(getArray[i].websiteUrl);
			output.innerHTML+='<div class="mb-2">'+getArray[i].websiteName.toUpperCase()+
			'<a class="ml-2 btn btn-outline-primary btn-sm" target="_blank" href="'+getArray[i].websiteUrl+
			'">Go to Website</a><button onclick="deleteItem(\''+getArray[i].websiteUrl+'\')" class="btn btn-danger btn-sm ml-2">x</button</div>';
							  	
		}
		bookmarkArray = [...getArray];
	}
	
}

fetchData();
myForm.addEventListener("submit", handleSubmit);

