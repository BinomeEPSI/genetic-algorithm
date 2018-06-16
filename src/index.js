const {Chromosome} = require('./entity/chromosome')
const {generateData, dataFileExists} = require('./generateData')
const {Engine} = require('./engine')

let data = require('../data/cities.json')
let nbChromosome = 100
let chromosomes = []
// let cities = data.map((element, index) => new Gene(element, index))

console.log()

if (!dataFileExists()) {
  generateData()
}

function customFitting (gene, index, elements) {
  let indexToUse = index >= elements.length - 1 ? -1 : index + 1
  if (indexToUse !== -1) {
    let otherGene = elements[indexToUse]
    let result = gene.distanceTo(otherGene)
    return result
  }
  return 0
}

for (let i = 0; i < nbChromosome; i++) {
  chromosomes.push(new Chromosome(data.sort((a, b) => {
    return Math.random() * (1 - -1) + -1
  }), customFitting))
}

let engine = new Engine(chromosomes)

engine.start(100, Math.round(nbChromosome / 10))
// Need to sort one last time.
engine.fitting()
console.log(engine.getResult().getOrder())
console.log(engine.getResult().fitting())
