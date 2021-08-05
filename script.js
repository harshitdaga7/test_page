//const api_url = "<heroku_app_url>"
const api_url = "https://esdprojectfive.herokuapp.com/"

// const api_url = "http://localhost:3000/"

function loadData(records = []) {
	var table_data = "";
	for(let i=0; i<records.length; i++) {

		var _id = records[i]._id;
		table_data += `<tr id = "${_id}">`;
		table_data += `<td> ${records[i].title}</td>`;
		table_data += `<td> ${records[i].color}</td>`;
		table_data += `<td> ${records[i].availability}</td>`;
		table_data += `<td> ${records[i].price}</td>`;

		if('image' in records[i])
		{
			table_data += `<td><a href = 'click' onclick = handleClick(event,'${records[i].image}') data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo"> click</a> </td>`		
		}
		else
		{
			table_data += `<td> Image not available</td>`
		}

		table_data += `<td>`;
		table_data += `<button class="btn btn-primary" onclick = editData('${_id}')>Edit</button>`;
		table_data += '&nbsp;&nbsp;';
		table_data += `<button class="btn btn-danger" onclick = deleteData('${_id}')>Delete</button>`;
		table_data += `</td>`;
		table_data += `</tr>`;
	}
	//console.log(table_data);
	document.getElementById("tbody").innerHTML = table_data;
}

function getData() {
	fetch(api_url + 'flowers/find') /// hsitin/flowers/find
	.then((response) => response.json())
	.then((result) => { 
		console.table(result.data); 
		loadData(result.data);
	})
}


function handleClick(e,lk)
{
	e.preventDefault();

	let link = api_url + lk;

	let image = document.getElementById("image_show_modal");

	image.src = link;
}

function editData(id)
{

	console.log('inside edit data');
	console.log(id)
	window.location.href = `edit.html?id=${id}`;
}

function fillEdit()
{

	var urlParams = new URLSearchParams(window.location.search);

	var id = urlParams.get('id');
	

	var name = document.getElementById("name");
	var clr = document.getElementById("color");
	var avail = document.getElementById("availability");
	var price = document.getElementById("price");
	var image = document.getElementById("image");


	fetch(api_url + 'flowers/find/' + id,{method : "GET"})
	.then((response) => response.json())
	.then((data) => {

		name.value = data.title;
		clr.value = data.color;
		avail.value = data.availability;
		price.value = data.price;
	});
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
	var name = String(document.getElementById("name").value);
	var clr = String(document.getElementById("color").value);
	var avail = Number(document.getElementById("availability").value);
	var price = Number(document.getElementById("price").value);

	var formData = new FormData();
	const fileField = document.getElementById('image');


	formData.append('title', name);
	formData.append('color', clr);
	formData.append('availability', avail);
	formData.append('price',price);


	if(fileField.files[0]) 
	{
		formData.append('image',fileField.files[0]);
	}

	fetch(api_url + 'flowers/create', {
		method: "POST",
		body: formData
	})
	.then((response) => response.json())
	.then((data) => { 

		if('success' in data)
		{
			console.log(data)
			alert('Failed');
		}
		else
		{
			console.log(data); 
			alert('Success');
			window.location.href = "add.html"; 

		}//redirect to index.html


	}).catch(error => {
  			console.error('Error:', error);
	});
}	


function putData() {


	var urlParams = new URLSearchParams(window.location.search);

	var id = urlParams.get('id');

	var name = String(document.getElementById("name").value);
	var clr = String(document.getElementById("color").value);
	var avail = Number(document.getElementById("availability").value);
	var price = Number(document.getElementById("price").value);

	var formData = new FormData();
	const fileField = document.getElementById('image');


	formData.append('title', name);
	formData.append('color', clr);
	formData.append('availability', avail);
	formData.append('price',price);


	if(fileField.files[0]) 
	{
		formData.append('image',fileField.files[0]);
	}

	fetch(api_url + 'flowers/update/' + id, {
		method: "PUT",
		body: formData
	})
	.then((response) => response.json())
	.then((data) => { 

		if('success' in data)
		{
			console.log(data)
			alert('Failed');
		}
		else
		{
			console.log(data); 
			alert('Success');
			window.location.href = "edit.html?id=" + id; 

		}

	}).catch(error => {
  			console.error('Error:', error);
	});
}

//fetch(url, options).then().then();

function deleteData(id) {
	user_input = confirm("Are you sure you want to delete this record?");
	if(user_input) {


		fetch(api_url + "flowers/delete/" + id, {
			method: "DELETE",
		})
		.then((response) => response.json())
		.then((data) => { 
			console.log(data); 
			window.location.reload();
		}).catch(error => {
  			console.error('Error:', error);
		});
	}
}