const {Chromosome} = require('./entity/chromosome')
const {generateData, dataFileExists} = require('./generateData')

let data = require('../data/cities.json')
let nbChromosome = 5
let chromosomes = []
// let cities = data.map((element, index) => new Gene(element, index))

console.log()

if (!dataFileExists()) {
  generateData()
}

for (let i = 0; i < nbChromosome; i++) {
  chromosomes.push(new Chromosome(data.sort((a, b) => {
    return Math.random() * (1 - -1) + -1
  })))
}

console.log(chromosomes)
