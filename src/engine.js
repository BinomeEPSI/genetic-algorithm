module.exports.Engine = class Engine {
  constructor (chromosomes) {
    this.chromosomes = chromosomes
  }

  reproduce () {
    let newChromosomes = []
    this.chromosomes.forEach((chromosome, index, chromosomes) => {
      let chromosomesFiltered = chromosomes.filter((element) => {
        return element !== chromosome
      })

      chromosomesFiltered.forEach(otherChromosome => {
        newChromosomes.push(chromosome.reproduce(otherChromosome))
      })
    })

    this.chromosomes = this.chromosomes.concat(newChromosomes)
  }

  naturalSelection () {
    this.chromosomes = this.chromosomes.slice(0, Math.round(this.chromosomes.length / 2))
  }

  fitting () {
    this.chromosomes = this.chromosomes.map((chromosome) => {
      return {chromosome: chromosome, total: chromosome.fitting()}
    }).sort((a, b) => {
      return a.total - b.total
    }).map((element) => {
      return element.chromosome
    })
  }

  start (nbIteration) {
    for (let i = 0; i < nbIteration; i++) {
      this.fitting()
      this.naturalSelection()
      this.reproduce()
    }
  }
}
