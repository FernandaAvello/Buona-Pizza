let ingredientsSelected = []
let ingredientsExtraSelected = []

const getIngredientsSelected = () => {

  // Empujo en los ingredientes seleccionados en el Array
  document.querySelectorAll('input[type=checkbox]:checked').forEach(el => {
    if (!ingredientsSelected.includes(el.value)) {
      ingredientsSelected.push(el.value)
    }
  });

  // Muestro los Ingredientes seleccionados en el HTML
  let listIngredientsSelected = document.getElementById('listIngredientsSelected')
    listIngredientsSelected.innerHTML = ingredientsSelected.join(', ')
    console.log(ingredientsSelected)

  // Si los ingredientes seleccionados son más de 3, guardo en un nuevo Array los Ingredientes Extras
  if (ingredientsSelected.length > 3) {
    ingredientsExtraSelected =  ingredientsSelected.slice(3, ingredientsSelected.length)

  // Muestro los Ingredientes Extra en el HTML
  let listIngredientsExtraSelected = document.getElementById('listIngredientsExtraSelected')
  listIngredientsExtraSelected.innerHTML = ingredientsExtraSelected.join(', ')
  console.log(ingredientsExtraSelected)
  } else if (ingredientsSelected.length <= 3) {
    ingredientsExtraSelected = []
    listIngredientsExtraSelected.innerHTML = ''
  }
  getPizzaPrice()
}

const getPizzaPrice = () => {
  console.log(ingredientsExtraSelected)

  // Multiplico el valor de los ingredientes Extras * 800
  const ingredientsExtraPrice = parseInt(ingredientsExtraSelected.length) * 800
  console.log(ingredientsExtraPrice)

  // Muestro el total de Valor de los Ingredientes Extras
  let ingredientsExtraPriceText = document.getElementById('ingredientsExtraPrice')
  ingredientsExtraPriceText.innerHTML = formatMoney(ingredientsExtraPrice)

}

// Método para obtener el valor de la propina
const getTip = () => {
  let tipTyped = document.getElementById('tipInput').value
  let tips = document.getElementById('tips')
  if (tipTyped === '') {
    tips.innerHTML = '$1.000'
    document.getElementById('tipInput').value = 1000
  } else {
    tips.innerHTML = formatMoney(tipTyped)
  }
}

// Método asociado a botón para calcaular el valor total de la Pizza
const createNewOrder = () => {
  const pizzaBasePrice = 15000
  const ingredientsExtraPrice = parseInt(ingredientsExtraSelected.length) * 800
  const tips = parseInt(document.getElementById('tips').innerHTML.replace(/\D/g,''))
  const totalPricePizza = pizzaBasePrice + ingredientsExtraPrice + tips

// Muestra mensaje con valor de Pizza en el HTML
  let message = document.getElementById('message')
  message.innerHTML = `El precio de la Pizza es de ${formatMoney(totalPricePizza)}`
}

const formatMoney = (value) => {
  // Método para transformar a estructura de moneda local
  let chileanMoney = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP'
  })
  return chileanMoney.format(value)
}