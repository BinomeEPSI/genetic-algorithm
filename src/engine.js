function swap (array, x, y) {
  var b = array[x]
  array[x] = array[y]
  array[y] = b
  return array
}

module.exports.Engine = class Engine {
  constructor (exampleChromosome, genesAcces, genes, fittingFucntion) {
    this.exampleChromosome = exampleChromosome
    this.genes = genes
    this.fittingFucntion = fittingFucntion
    this.genesAcces = genesAcces
    this.chromosomes = []
    this.limitChromosomes = 10
  }

  init (nbChromosome) {
    this.limitChromosomes = nbChromosome
    this.chromosomes = []
    for (let i = 0; i < nbChromosome; i++) {
      let genes = this.genes.slice(0).sort((a, b) => Math.random() * (1 - -1) + -1)
      let newChromosome = this.exampleChromosome()
      genes.forEach(function (gene) {
        newChromosome.add(gene)
      })
      this.chromosomes.push(newChromosome)
    }
  }

  fitting () {
    this.chromosomes = this.chromosomes.sort(this.fittingFucntion)
  }

  naturalSelection () {
    // Ach Ach!! Nous gardons que les meilleurs o/
    this.chromosomes = this.chromosomes.slice(0, this.limitChromosomes)
  }

  reproduce (father, mother, mutate = false) {
    let fatherGenes = father[this.genesAcces]
    let motherGenes = mother[this.genesAcces]

    let childGenes = fatherGenes.slice(0, Math.round(fatherGenes.length / 2))
    childGenes = childGenes.concat(motherGenes.filter(gene => !childGenes.includes(gene)))

    if (mutate) {
      let max = this.genes.length - 1
      let min = 0
      let randomIndex1 = Math.round(Math.random() * (max - min) + min)
      let randomIndex2 = randomIndex1 + 1 >= max ? 0 : randomIndex1 + 1

      childGenes = swap(childGenes, randomIndex1, randomIndex2)
    }

    let newChromosome = this.exampleChromosome()
    childGenes.forEach(gene => newChromosome.add(gene))

    return newChromosome
  }

  reproduction (mutationRate) {
    let parents = this.chromosomes.slice(0)
    let mutantsNb = mutationRate * parents.length * parents.length

    // console.info(`Going to reproduce ${parents.length} chromosomes between each others..`)
    for (let i = 0; i < parents.length; i++) {
      for (let j = 0; j < parents.length; j++) {
        if (i !== j) {
          this.chromosomes.push(this.reproduce(parents[i], parents[j], mutantsNb < i*j))
        }
      }
    }
  }

  run (nbIteration, mutationRate = 0.1) {
    for (let i = 1; i <= nbIteration; i++) {
      // console.log(`Iteration ${i}/${nbIteration}`)
      this.reproduction(mutationRate)
      this.fitting()
      this.naturalSelection()
    }

    return this.chromosomes
  }
}
