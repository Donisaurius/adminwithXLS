const d = document,
	w = window;

d.addEventListener("DOMContentLoaded", e => { 
	console.log("Documento cargado");
	//getSheet("/v1/9WI8tRU1SFaC/academias-gastronomicas-caracas/Academias_gastronomicas");
})

d.addEventListener("click",e => { 
	if(e.target.matches("#addClient input[type='submit']")){ 
		e.preventDefault();
		//agregarDataAcademiaGastronomicas(e); 
	} 
})

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

	
const postRowSheetVendedor = (nombre,zona,telefono) => {
		
	let obj = { "Nombre": nombre, "Zona": zona, "Telefono": telefono }

	setToSheet(obj);
	
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