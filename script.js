//const api_url = "<heroku_app_url>"
const api_url = "https://esdprojectfive.herokuapp.com/"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {

		var _id = records[i].split('/').pop();
		table_data += `<tr id = "${_id}">`;
		table_data += `<td> <a href = "${records[i]}"</td>`;
		table_data += `<td>`;
		table_data += `<button class="btn btn-primary" onlclick = editData(${records[i]},${id)})>Edit</button>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick=deleteData(${id})>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url + '/flowers/find')
	.then((response) => response.json())
	.then((result) => { 
		console.table(result.data); 
		loadData(result.data);
	}).catch(err => console.log(err));
}


function editData(link,id)
{

	fetch(link);
}

function getDataById(id) {
	fetch(`${api_url}/${id}/dindayal`)
	.then((response) => response.json())
	.then((data) => { 
	
		console.log(data);
		document.getElementById("id").value = data._id;
		document.getElementById("name").value = data.name;
		document.getElementById("age").value = data.age;
		document.getElementById("city").value = data.city;
	})
}


function postData() {
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var city = document.getElementById("city").value;
	
	data = {name: name, age: age, city: city};
	
	fetch(api_url, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.log(data); 
		window.location.href = "index.html"; //redirect to index.html
	})
}	


function putData() {
	
	var _id = document.getElementById("id").value;
	var name = document.getElementById("name").value;
	var age = document.getElementById("age").value;
	var city = document.getElementById("city").value;
	
	data = {_id: _id, name: name, age: age, city: city};
	
	fetch(api_url, {
		method: "PUT",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		body: JSON.stringify(data)
	})
	.then((response) => response.json())
	.then((data) => { 
		console.table(data);
		window.location.href = "index.html";
	})
}

//fetch(url, options).then().then();

function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {
		fetch(api_url, {
			method: "DELETE",
			headers: {
			  'Accept': 'application/json',
			  'Content-Type': 'application/json'
			},
			body: JSON.stringify({"_id": id})
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		})
	}
}