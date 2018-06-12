const {City} = require('./entity/city')

let data = require('./cities.json')

let cities = data.map((element) => new City(element))

console.log(cities)

let bordeaux = cities[0]
let nantes = cities[2]

console.log(bordeaux.distanceTo(nantes))
