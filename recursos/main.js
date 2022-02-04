const d = document,
	w = window;

d.addEventListener("DOMContentLoaded", e => { 
	console.log("Documento cargado");
	//getSheet("/v1/9WI8tRU1SFaC/academias-gastronomicas-caracas/Academias_gastronomicas");
	checkVisibility();
})

d.addEventListener("click",e => { 
	if(e.target.matches("#addClient input[type='submit']")){ 
		e.preventDefault();
		//agregarDataAcademiaGastronomicas(e); 
	}

	if(e.target.matches('#addVendedor input[type="submit"]')){

		gettingDataOfFormVendedor(e);

	}

	if(e.target.matches(".addFormActiveList li")){

		activeAddForm(e);
		checkVisibility();

	} 
})

const activeAddForm = (e) => {
	
	for(let x = 0; x < d.querySelectorAll(".addFormActive").length ; x++){
		if(d.querySelectorAll(".addFormActive")[x] !== e.target){
			d.querySelectorAll(".addFormActive")[x].classList.remove("addFormActive");
		}
	}

	e.target.classList.toggle("addFormActive");
}

const agregarDataAcademiaGastronomicas = (e) => { 

	console.log(e);
	const $form = e.target.closest("form"), 
	$nombre = $form.nombre,
	$direccion = $form.direccion, 
	$telefono = $form.telefono, 
	$email = $form.email, 
	$web = $form.web, 
	$comentarios = $form.querySelector(".comentarios"), 
	$esVisitado = $form.esVisitado,
	$btnAgregar = $form.agregar;

	console.log($nombre.value, $email.value, $comentarios.value,
	$esVisitado.value, $btnAgregar.value);

	$form.reset() 

}

const getSheetAcademiaGastronomica = (url) => {

 fetch(url) 
 .then(res => res.ok ? res.json() : Promise.reject(res))
 .then(json => console.log(json))

}


const gettingDataOfFormVendedor = (e) => {

	e.preventDefault();

	let form = e.target.closest('form'),
	nombre = form.nombre.value,
	telefono = form.telefono.value,
	zona = form.zona.value,
	comentarios = form.querySelector('.comentarios').value;

	if(!nombre || !telefono || !zona || !comentarios){
		return console.log('No enviar')
	}

	form.reset()

	console.log(nombre, telefono, zona, comentarios);

	postRowSheetVendedor(nombre,zona,telefono,comentarios);

}

	
const postRowSheetVendedor = (nombre,zona,telefono, comentarios) => {
		
	let obj = { "Nombre": nombre, "Zona": zona, "Telefono": telefono, "Comentarios": comentarios }

	//setToSheet(obj);
	
}
	
const setToSheet = (datos) => {

	//Modificar esta funcion para que mantenga funcionamiento con todas
	//las hojas de la API

	let options = { 
		"method": "POST", 
		"headers": { 
			"Content-type": "application/json" 
		}, 
		"body": JSON.stringify(datos)	
			
	}


	fetch("https://sheet2api.com/v1/9WI8tRU1SFaC/academias-gastronomicas-caracas/vendedores",options)
	.then(res => res.ok ? res.json() : Promise.reject(res)) 
	.then(json => console.log(json))
	
}

const deleteRowSheetVendedor = () => {

	//Parametros necesarios para eliminar una fila. Se envia el objeto y
	//si hace match es eliminado. La key limit indica el numero limite a
	//eliminar de filas. La key query type hace referencia a un valor
	//corto circuito, si se indica "and" elimina la fila si todas las
	//demas keys coinciden, si se coloca "or" se eliminara la fila si un
	//parametro coincide. PARA MAYOR SEGURIDAD USAR "AND" 		
	
	let query_params = new URLSearchParams({
  
		'limit': 1, 
		'query_type': 'and', 
		'ID': '2', 
		'Nombre': 'Eros',
		'Zona': 'Teresa', 
		'Telefono': "654321"  
		
	});

	let url = 'https://sheet2api.com/v1/9WI8tRU1SFaC/academias-gastronomicas-caracas/Vendedores?' + query_params;

	fetch(url, { method: 'DELETE' })		 
	.then(response => response.text())
	.then(data => { 
		console.log('Success:', data); 
	}) 
	.catch((error) => {
		console.error('Error:', error); 
	});
	
}

w.addEventListener("load",e => {
	console.log("Documento cargado completamente")
})

const checkVisibility = () => {
	//console.log("Chequeando");
	let $elActive = d.querySelector(".addFormActive");
	let $elActiveParent = $elActive.closest("ul");
	let children, index;
	let parentAddForms = d.querySelector('.addDataContainer');
	for(let i = 0; i < $elActiveParent.children.length; i++){

		children =$elActiveParent.children[i];		

		if(children.classList.contains('addFormActive')){
			//console.log(children);
			index = i;
		}			
	}

	for(let i = 0; i < parentAddForms.children.length; i++){


		if(index === i){
			let formToShow = parentAddForms.children[index];

			formToShow.setAttribute('data-add-form-active','')
		}else{
		
			parentAddForms.children[i].removeAttribute('data-add-form-active')
		
		}


	}
	
}
