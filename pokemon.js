const submitButton = document.querySelector('button')
const enterButton = document.querySelector('input')

submitButton.addEventListener('click', event => {
  const firstPokemon = document.querySelector('#pokemonOne').value.toLowerCase()
  const firstPokeURL = 'https://pokeapi.co/api/v2/pokemon/' + firstPokemon + '/'
  makeSprite(firstPokeURL)
  displayType(firstPokeURL, firstPokemon)
  getPokemonTypesURL(firstPokeURL)
  document.querySelector("table").style.setProperty('visibility', 'visible') 
})

enterButton.addEventListener("keyup", event => {
  if (event.keyCode === 13) {
    const firstPokemon = document.querySelector('#pokemonOne').value.toLowerCase()
    const firstPokeURL = 'https://pokeapi.co/api/v2/pokemon/' + firstPokemon + '/'
    makeSprite(firstPokeURL)
    displayType(firstPokeURL, firstPokemon)
    getPokemonTypesURL(firstPokeURL)
    document.querySelector("table").style.setProperty('visibility', 'visible')

  }
})

function makeSprite(firstPokeURL) {
  var picURL
  var pic
  fetch(firstPokeURL)
  .then(response => response.json())
  .then(data => {
    picURL = data.sprites.other["official-artwork"].front_default
    var webPic = document.getElementById("pokeImage")
    webPic.src = picURL
  })
  .catch(error => console.log('ERROR'))
}
function displayType(firstPokeURL, firstPokemon) {
  var type
  var allTypes = ""
  var pokeTypeText
  fetch(firstPokeURL)
  .then(response => response.json())
  .then(data => {
    for (var i = 0; i < data.types.length; i++) {
      type = data.types[i].type.name
      allTypes = allTypes + type + " " + "and" + " "
    }
    allTypes = allTypes.substring(0, allTypes.length - 5)
    document.getElementById("pokeType").innerHTML = firstPokemon + ":" + " " + allTypes + " " + "type"
  })
  .catch(error => console.log('ERROR'))
}
async function getPokemonTypesURL(firstPokeURL) {
  response = await fetch(firstPokeURL)
  pokeData = await response.json()
  arrayTypesURL = []
  for (var i = 0; i < pokeData.types.length; i++) {
    arrayTypesURL[i] = pokeData.types[i].type.url
  }
  getWeakness(arrayTypesURL)
}
async function getWeakness(arrayTypesURL) {
  var quadWeakness = []
  var quadResis = []
  var i
  var j
  var quadWString = ""
  var doubleWString = ""
  var quadRString = ""
  var doubleRString = ""
  var noDamString = ""


  if (arrayTypesURL.length === 1) {
    response = await fetch(arrayTypesURL[0])
    typeData = await response.json()
    var doubleDamageArray = typeData.damage_relations.double_damage_from
    var doubleResisArray = typeData.damage_relations.half_damage_from
    var noDamArray = typeData.damage_relations.no_damage_from

    for (i = 0; i < doubleDamageArray.length; i++) {
      doubleWString = doubleWString + doubleDamageArray[i].name + " "
    }
    for (i = 0; i < doubleResisArray.length; i++) {
      doubleRString = doubleRString + doubleResisArray[i].name + " "
    }
    for (i = 0; i < noDamArray.length; i++) {
      noDamString = noDamString + noDamArray[i].name + " "
    }

    document.getElementById("quadW").innerHTML = quadWString
    document.getElementById("doubleW").innerHTML = doubleWString
    document.getElementById("quadR").innerHTML = quadRString
    document.getElementById("doubleR").innerHTML = doubleRString
    document.getElementById("noDam").innerHTML = noDamString

  }
  else {
    response = await fetch(arrayTypesURL[0])
    typeData = await response.json()
    var doubleDamageFirstType = typeData.damage_relations.double_damage_from
    var halfDamageFirstType = typeData.damage_relations.half_damage_from
    var noDamageFirstType = typeData.damage_relations.no_damage_from

    response = await fetch(arrayTypesURL[1])
    typeData = await response.json()
    var doubleDamageSecondType = typeData.damage_relations.double_damage_from
    var halfDamageSecondType = typeData.damage_relations.half_damage_from
    var noDamageSecondType = typeData.damage_relations.no_damage_from

    //These loops handle no Damage
    for (i = 0; i < doubleDamageFirstType.length; i++) {
      for (j = 0; j < noDamageSecondType.length; j++) {
        if (doubleDamageFirstType[i].name === noDamageSecondType[j].name) {
          doubleDamageFirstType[i] = "empty"
        }
      }
    }
    for (i = 0; i < halfDamageFirstType.length; i++) {
      for (j = 0; j < noDamageSecondType.length; j++) {
        if (halfDamageFirstType[i].name === noDamageSecondType[j].name) {
          halfDamageFirstType[i] = "empty"
        }
      }
    }
    for (i = 0; i < doubleDamageSecondType.length; i++) {
      for (j = 0; j < noDamageFirstType.length; j++) {
        if (doubleDamageSecondType[i].name === noDamageFirstType[j].name) {
          doubleDamageSecondType[i] = "empty"
        }
      }
    }
    for (i = 0; i < halfDamageSecondType.length; i++) {
      for (j = 0; j < noDamageFirstType.length; j++) {
        if (halfDamageSecondType[i].name === noDamageFirstType[j].name) {
          halfDamageSecondType[i] = "empty"
        }
      }
    }

    //These loops handle quad damage and resistance
    for (i = 0; i < doubleDamageFirstType.length; i++) {
      for (j = 0; j < doubleDamageSecondType.length; j++) {
        if (doubleDamageFirstType[i].name === doubleDamageSecondType[j].name) {
          quadWeakness.push(doubleDamageFirstType[i])
          doubleDamageFirstType[i] = "empty"
          doubleDamageSecondType[j] = "empty"
        }
      }
    }
    for (i = 0; i < halfDamageFirstType.length; i++) {
      for (j = 0; j < halfDamageSecondType.length; j++) {
        if (halfDamageFirstType[i].name === halfDamageSecondType[j].name) {
          quadResis.push(halfDamageFirstType[i])
          halfDamageFirstType[i] = "empty"
          halfDamageSecondType[j] = "empty"
        }
      }
    }

    //These loops handle double and halves cancelling
    for (i = 0; i < doubleDamageFirstType.length; i++) {
      for (j = 0; j < halfDamageSecondType.length; j++) {
        if (doubleDamageFirstType[i].name === halfDamageSecondType[j].name) {
          doubleDamageFirstType[i] = "empty"
          halfDamageSecondType[j] = "empty"
        }
      }
    }
    for (i = 0; i < doubleDamageSecondType.length; i++) {
      for (j = 0; j < halfDamageFirstType.length; j++) {
        if (doubleDamageSecondType[i].name === halfDamageFirstType[j].name) {
          doubleDamageSecondType[i] = "empty"
          halfDamageFirstType[j] = "empty"
        }
      }
    }

    for (i = 0; i < quadWeakness.length; i++) {
      if (quadWeakness[i] != "empty") {
        quadWString = quadWString + quadWeakness[i].name + " "
      }
    }
    for (i = 0; i < doubleDamageFirstType.length; i++) {
      if (doubleDamageFirstType[i] != "empty") {
        doubleWString = doubleWString + doubleDamageFirstType[i].name + " "
      }
    }
    for (i = 0; i < doubleDamageSecondType.length; i++) {
      if (doubleDamageSecondType[i] != "empty") {
        doubleWString = doubleWString + doubleDamageSecondType[i].name + " "
      }
    }
    for (i = 0; i < quadResis.length; i++) {
      if (quadResis[i] != "empty") {
        quadRString = quadRString + quadResis[i].name + " "
      }
    }
    for (i = 0; i < halfDamageFirstType.length; i++) {
      if (halfDamageFirstType[i] != "empty") {
        doubleRString = doubleRString + halfDamageFirstType[i].name + " "
      }
    }
    for (i = 0; i < halfDamageSecondType.length; i++) {
      if (halfDamageSecondType[i] != "empty") {
        doubleRString = doubleRString + halfDamageSecondType[i].name + " "
      }
    }
    for (i = 0; i < noDamageFirstType.length; i++) {
      if (noDamageFirstType[i] != "empty") {
        noDamString = noDamString + noDamageFirstType[i].name + " "
      }
    }
    for (i = 0; i < noDamageSecondType.length; i++) {
      if (noDamageSecondType[i] != "empty") {
        noDamString = noDamString + noDamageSecondType[i].name + " "
      }
    }

    document.getElementById("quadW").innerHTML = quadWString
    document.getElementById("doubleW").innerHTML = doubleWString
    document.getElementById("quadR").innerHTML = quadRString
    document.getElementById("doubleR").innerHTML = doubleRString
    document.getElementById("noDam").innerHTML = noDamString

  }
}
