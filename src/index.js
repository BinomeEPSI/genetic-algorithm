const {Gene} = require('./entity/gene')

let data = require('../data/cities.json')

let cities = data.map((element, index) => new Gene(element, index))

let bordeaux = cities[0]
let nantes = cities[2]

console.log(bordeaux, nantes, bordeaux.distanceTo(nantes))

const {generateData, dataFileExists} = require('./generateData')

if (!dataFileExists()) {
  generateData()
}

let citiesData = require('../data/data')

console.log(citiesData)
