module.exports.Engine = class Engine {
  constructor (chromosomes) {
    this.chromosomes = chromosomes
  }

  reproduce () {

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
}
