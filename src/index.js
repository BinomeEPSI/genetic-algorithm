const {Engine} = require('./engine')
const {City} = require('./entity/city')
const {Journey} = require('./entity/journey')

let data = require('../data/cities.json')
let citiesList = data.map(element => {
  return new City(element.city, element.lan, element.lng)
})

let nbChromosome = 100
let startCity = 'Bordeaux'

let startJourney = citiesList.find(city => city.name === startCity)
let genesList = citiesList.filter(city => city !== startJourney)

let chomosomeMaker = function () {
  return new Journey(startJourney)
}

let engine = new Engine(chomosomeMaker, 'steps', genesList, (journeyA, journeyB) => {
  // tri des trajets: du plus court au plus long
  return journeyA.distance.total - journeyB.distance.total
})

engine.init(nbChromosome)

let bestJourneys = engine.run(500, 0.3)

console.log(bestJourneys[0])
