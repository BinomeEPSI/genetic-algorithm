const fs = require('fs')
const { Gene } = require('./entity/gene')

let filename = './data/data.json'

module.exports.generateData = () => {
  let data = require('../data/cities.json')
  let cities = data.map((element) => new Gene(element))

  let results = {}
  cities.forEach(city => {
    let filteredCities = cities.filter(otherCity => {
      return otherCity.getName() !== city.getName()
    })

    let mappedCity = filteredCities.map(otherCity => {
      return { name: otherCity.getName(), distanceTo: city.distanceTo(otherCity) }
    })

    mappedCity.push({ name: city.getName(), distanceTo: -1 })
    results[city.getName()] = mappedCity
  })

  fs.writeFileSync(filename, JSON.stringify(results), 'utf8')
  console.log('Data file created')
}

module.exports.dataFileExists = () => {
  return fs.existsSync(filename)
}
