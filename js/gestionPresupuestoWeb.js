import * as gestionPresupuesto from "./gestionPresupuesto.js"

// Función para mostrar un valor en un elemento HTML por su ID
function mostrarDatoEnId(idElemento, valor) {
	return (document.getElementById(idElemento).innerText = valor)
}

// Función para mostrar un gasto en un elemento HTML por su ID
function mostrarGastoWeb(idElemento, gasto) {
	// Creamos una variable que hará referencia al elemento HTML donde se insertará el resultado
	let contenedor = document.getElementById(idElemento)

	// Creamos un div con la clase gasto y lo añadimos al contenedor
	let divGasto = document.createElement("div")
	divGasto.classList.add("gasto")
	contenedor.appendChild(divGasto)

	// Creamos un div con la clase gasto-descripcion y lo añadimos al div gasto
	let divDescripcion = document.createElement("div")
	divDescripcion.classList.add("gasto-descripcion")
	divDescripcion.textContent = gasto.descripcion
	divGasto.appendChild(divDescripcion)

	// Creamos un div con la clase gasto-fecha y lo añadimos al div gasto
	let divFecha = document.createElement("div")
	divFecha.classList.add("gasto-fecha")
	let fecha = new Date(gasto.fecha).toLocaleDateString() // parse de timestamp a fecha corta
	divFecha.textContent = fecha
	divGasto.appendChild(divFecha)

	// Creamos un div con la clase gasto-valor y lo añadimos al div gasto
	let divValor = document.createElement("div")
	divValor.classList.add("gasto-valor")
	divValor.textContent = gasto.valor
	divGasto.appendChild(divValor)

	// Creamos un div con la clase gasto-etiquetas y lo añadimos al div gasto
	let divEtiquetas = document.createElement("div")
	divEtiquetas.classList.add("gasto-etiquetas")
	divGasto.appendChild(divEtiquetas)

	// Creamos un span con la clase gasto-etiquetas-etiqueta por cada etiqueta del gasto y lo añadimos al div gasto-etiquetas
	for (let etiqueta of gasto.etiquetas) {
		let spanEtiquetas = document.createElement("span")
		spanEtiquetas.classList.add("gasto-etiquetas-etiqueta")
		spanEtiquetas.textContent = etiqueta + ", "
		// Evento para los span de etiquetas (el borrado se produce al hacer click en la etiqueta, no hay botón)
		let borrarEtiquetaManejador = new BorrarEtiquetasHandle()
		borrarEtiquetaManejador.gasto = gasto
		borrarEtiquetaManejador.etiqueta = etiqueta
		spanEtiquetas.addEventListener("click", borrarEtiquetaManejador)
		divEtiquetas.appendChild(spanEtiquetas)
	}

	// Creamos un botón con texto 'Editar' de tipo 'button' (<button type="button">Editar</button>) con clase 'gasto-editar'
	let botonEditar = document.createElement("button")
	botonEditar.classList.add("gasto-editar")
	botonEditar.type = "button"
	botonEditar.textContent = "Editar"

	// Manejador de evento de editar
	let editarManejador = new EditarHandle()

	// Asignamos la propiedad gasto del objeto creado al objeto gasto del parámetro
	editarManejador.gasto = gasto

	// Añadimos el evento 'click' al botón 'Editar' con el manejador de evento editarManejador
	botonEditar.addEventListener("click", editarManejador)

	// Añadimos el botón al DOM a continuación de las etiquetas
	divGasto.appendChild(botonEditar)

	// Creamos un botón con texto 'Borrar' de tipo 'button' (<button type="button">Borrar</button>) con clase 'gasto-borrar'
	let botonBorrar = document.createElement("button")
	botonBorrar.classList.add("gasto-borrar")
	botonBorrar.type = "button"
	botonBorrar.textContent = "Borrar"

	// Manejador de evento de borrar
	let borrarManejador = new BorrarHandle()

	// Asignamos la propiedad gasto del objeto creado al objeto gasto del parámetro
	borrarManejador.gasto = gasto

	// Añadimos el evento 'click' al botón 'Borrar' con el manejador de evento borrarManejador
	botonBorrar.addEventListener("click", borrarManejador)

	// Añadimos el botón al DOM a continuación de las etiquetas
	divGasto.appendChild(botonBorrar)

	// Agregamos al contenedor el div gasto creado con todos sus elementos
	contenedor.appendChild(divGasto)
}

// Función de tres parámetros que se encargará de crear dentro del elemento HTML con id idElemento indicado una estructura HTML para el objeto agrup que se pase como parámetro
function mostrarGastosAgrupadosWeb(idElemento, periodo, agrup) {
	// Creamos una variable que hará referencia al elemento HTML donde se insertará el resultado
	let contenedor = document.createElement("div")
	contenedor.classList.add("agrupacion")

	// Creamos un h1 con el texto "Gastos agrupados por Periodo" y lo añadimos al contenedor
	let h1 = document.createElement("h1")
	h1.textContent = "Gastos agrupados por " + periodo
	contenedor.appendChild(h1)

	// Para cada dato del objeto agrup se crea un div
	for (let a of Object.keys(agrup)) {
		// Creamos un div con la clase agrupacion-dato y lo añadimos al contenedor
		let divAgrupacion = document.createElement("div")
		divAgrupacion.classList.add("agrupacion-dato")

		// Creamos un span con la clase agrupacion-dato-clave
		let spanPropiedad = document.createElement("span")
		spanPropiedad.classList.add("agrupacion-dato-clave")
		// El texto del span será la propiedad del objeto agrup
		spanPropiedad.textContent = a
		// Agregamos al div agrupacion el span agrupacion-dato-clave
		divAgrupacion.appendChild(spanPropiedad)

		// Creamos un span con la clase agrupacion-dato-valor
		let spanValor = document.createElement("span")
		spanValor.classList.add("agrupacion-dato-valor")
		// El texto del span será el valor de la propiedad del objeto agrup que se accede con agrup[a]
		spanValor.textContent = agrup[a]
		// Agregamos al div agrupacion el span agrupacion-dato-valor
		divAgrupacion.appendChild(spanValor)

		// Agregamos al contenedor el div agrupacion creado con todos sus elementos
		contenedor.appendChild(divAgrupacion)
	}

	// Agregamos al elemento deseado el contenedor creado con todos sus elementos
	let elemento = document.getElementById(idElemento)
	elemento.appendChild(contenedor)
}

// Función repintar que vuelve a crear toda la estructura HTML, reflejando los cambios en el modelo de datos
function repintar() {
	// Mostramos el presupuesto en div#presupuesto
	let presupuesto = gestionPresupuesto.mostrarPresupuesto()
	mostrarDatoEnId("presupuesto", presupuesto)

	// Mostramos los gastos totales en div#gastos-totales
	let gastosTotales = gestionPresupuesto.calcularTotalGastos()
	mostrarDatoEnId("gastos-totales", gastosTotales)

	// Mostramos el balance total en div#balance-total
	let balanceTotal = gestionPresupuesto.calcularBalance()
	mostrarDatoEnId("balance-total", balanceTotal)

	// Borramos el contenido de div#listado-gastos-completo usando innetHTML
	let listadoGastosCompleto = document.getElementById("listado-gastos-completo")
	listadoGastosCompleto.innerHTML = ""

	// Mostramos el listado completo de gastos en div#listado-gastos-completo
	let listaGastos = gestionPresupuesto.listarGastos()
	for (let gasto of listaGastos) {
		mostrarGastoWeb("listado-gastos-completo", gasto)
	}
}

// Función actualizarPresupuestoWeb manejadora de eventos del botón 'actualizarpresupuesto'
function actualizarPresupuestoWeb() {
	// Recogemos el valor del nuevo presupuesto con un prompt
	let presupuesto = prompt("Introduce el nuevo presupuesto", 0)

	// Transformamos la variable presupuesto de string a número
	presupuesto = parseFloat(presupuesto)

	// Actualizamos el presupuesto con el nuevo valor
	gestionPresupuesto.actualizarPresupuesto(presupuesto)

	// Llamos a la función repintar para mostrar la información actualizada en el HTML
	repintar()
}

// Función nuevoGastoWeb manejadora de eventos del botón 'anyadirgasto'
function nuevoGastoWeb() {
	// Recogemos los valores del nuevo gasto con prompt
	let descripcion = prompt("Introduce la descripción del gasto")
	let valor = prompt("Introduce el valor del gasto")
	let fecha = prompt("Introduce la fecha del gasto")
	let etiquetas = prompt("Introduce las etiquetas separadas por comas (,)")

	// Transformamos el valor a número
	valor = parseFloat(valor)

	// Convertimos la cadena de texto de etiquetas en un array
	let arrayEtiquetas = etiquetas.split(", ")

	// Creamos el nuevo gasto con los datos proporcionados
	let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, arrayEtiquetas)

	// Añadimos el gasto
	gestionPresupuesto.anyadirGasto(nuevoGasto)

	// Llamos a la función repintar para mostrar la información actualizada en el HTML
	repintar()
}

// Función constructora EditarHandle con un único método handleEvent que se encargará de manejar el evento 'click'
function EditarHandle() {
	this.handleEvent = function (event) {
		// Recogemos los valores del nuevo gasto con prompt
		let descripcion = prompt("Introduce la descripción del gasto", this.gasto.descripcion)
		let valor = prompt("Introduce el valor del gasto", this.gasto.valor)
		let fecha = prompt("Introduce la fecha del gasto en formato yyyy-mm-dd", new Date(this.gasto.fecha).toISOString().slice(0, 10))
		let etiquetas = prompt("Introduce las etiquetas separadas por comas (,)", this.gasto.etiquetas.join(", "))
		// Transformamos el valor a número
		valor = parseFloat(valor)

		// Convertimos la cadena de texto de etiquetas en un array
		let arrayEtiquetas = etiquetas.split(", ")

		// Actualizamos el gasto con los nuevos datos llamando a los métodos correspondientes
		this.gasto.actualizarDescripcion(descripcion)
		this.gasto.actualizarValor(valor)
		this.gasto.actualizarFecha(fecha)

		// Borramos las antiguas etiquetas
		this.gasto.borrarEtiquetas(...this.gasto.etiquetas)

		// Añadimos las nuevas etiquetas
		this.gasto.anyadirEtiquetas(...arrayEtiquetas)

		// Llamos a la función repintar para mostrar la información actualizada en el HTML
		repintar()
	}
}

// Función constructora Borrarhandle con un único método handleEvent que se encargará de manejar el evento 'click'
function BorrarHandle() {
	this.handleEvent = function (event) {
		// Recogemos el id del gasto a borrar
		let idBorrar = this.gasto.id
		// Borramos el gasto
		gestionPresupuesto.borrarGasto(idBorrar)
		// Llamos a la función repintar para mostrar la información actualizada en el HTML
		repintar()
	}
}

// Función constructora BorrarEtiquetasHandle con un único método handleEvent que se encargará de manejar el evento 'click'
function BorrarEtiquetasHandle() {
	this.handleEvent = function (event) {
		this.gasto.borrarEtiquetas(this.etiqueta)

		// Llamos a la función repintar para mostrar la información actualizada en el HTML
		repintar()
	}
}

// Función nuevoGastoWebFormulario manejadora de eventos del botón 'anyadirgasto-formulario'
function nuevoGastoWebFormulario() {
	// Creamos una copia del formulario web definido en la plantilla HTML
	let plantillaFormulario = document.getElementById("formulario-template").content.cloneNode(true)

	// Creamos la variable que accede al formulario dentro de la plantilla
	var formulario = plantillaFormulario.querySelector("form")

	// Creamos las variables que hacen referencia al botón de añadir gasto y al botón de cancelar
	let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario")
	let botonCancelar = formulario.querySelector("button.cancelar")

	// Manejamos el evento 'submit' en el formulario
	formulario.addEventListener("submit", manejadorSubmitFormulario)

	// Manejamos el evento 'click' en el botón 'Cancelar'
	let manejadorBotonCancelar = new CancelarFormularioHandle(formulario, botonAnyadirGastoFormulario)
	botonCancelar.addEventListener("click", manejadorBotonCancelar)

	// Desactivamos el botón de añadir gasto
	botonAnyadirGastoFormulario.setAttribute("disabled", "")

	// Añadimos el formulario al div controlesprincipales
	let divControlesPrincipales = document.getElementById("controlesprincipales")
	divControlesPrincipales.appendChild(plantillaFormulario)
}

// Manejador de evento submit del formulario
function manejadorSubmitFormulario(evento) {
	// Evitamos que el formulario se envíe por defecto
	evento.preventDefault()

	// Creamos la variable formulario que hace referencia al formulario mediante el evento
	let form = evento.currentTarget

	// Recogemos los valores del formulario mediante el atributo name
	let descripcion = form.descripcion.value
	let valor = form.valor.value
	let fecha = form.fecha.value
	let etiquetas = form.etiquetas.value

	// Transformamos el valor a número
	valor = parseFloat(valor)

	// Convertimos la cadena de texto de etiquetas en un array
	let arrayEtiquetas = etiquetas.split(", ")

	// Creamos el nuevo gasto con los datos proporcionados
	let nuevoGasto = new gestionPresupuesto.CrearGasto(descripcion, valor, fecha, arrayEtiquetas)

	// Añadimos el gasto
	gestionPresupuesto.anyadirGasto(nuevoGasto)

	// Llamos a la función repintar para mostrar la información actualizada en el HTML
	repintar()

	let botonAnyadirGastoFormulario = document.getElementById("anyadirgasto-formulario")

	// Activamos el botón de añadir gasto eliminando el atributo disabled
	botonAnyadirGastoFormulario.removeAttribute("disabled")
}

// Función constructora CancelarFormularioHandle con un único método handleEvent que se encargará de manejar el evento 'click'
function CancelarFormularioHandle(formulario, botonAnyadir) {
	// Creamos el handleEvent que se ejecutará al hacer click en el botón cancelar
	this.handleEvent = function () {
		// Eliminamos el formulario
		formulario.remove()
		// Activamos el botón de añadir gasto eliminando el atributo disabled
		botonAnyadir.removeAttribute("disabled")
	}
}

export { mostrarDatoEnId, mostrarGastoWeb, mostrarGastosAgrupadosWeb, actualizarPresupuestoWeb, nuevoGastoWeb, EditarHandle, BorrarHandle, CancelarFormularioHandle, nuevoGastoWebFormulario }
