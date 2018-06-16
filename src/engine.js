module.exports.Engine = class Engine {
  constructor (chromosomes) {
    this.chromosomes = chromosomes
    this.initialPopulationSize = chromosomes.length
  }

  reproduce (needMutation) {
    let newChromosomes = []
    console.info(`Going to reproduce ${this.chromosomes.length} chromosomes between each others..`)
    for (let i = 0; i < this.chromosomes.length; i++) {
      for (let j = 0; j < this.chromosomes.length; j++) {
        if (this.chromosomes[i] !== this.chromosomes[j]) {
          newChromosomes.push(this.chromosomes[i].reproduce(this.chromosomes[j]))
        }
      }
    }

    // Take only a part of the newChromosome so that we don't get to many chromosomes
    // let getNbNewChromosomes = this.initialPopulationSize
    let getNbNewChromosomes = Math.round(newChromosomes.length / 2)
    newChromosomes = newChromosomes.slice(0, getNbNewChromosomes)
    console.debug(`Their is ${newChromosomes.length} new chromosomes selected`)

    this.chromosomes = this.chromosomes.concat(newChromosomes)

    // FIXME This is to avoid that the memory explode.
    if (this.chromosomes.length >= 4 * this.initialPopulationSize) {
      this.chromosomes = this.chromosomes.slice(0, Math.round(4 * this.initialPopulationSize))
    }

    if (needMutation) {
      console.log('Going to apply a mutation on all chromosomes.')
      this.chromosomes = this.chromosomes.map(element => {
        return element.mutate()
      })
    }

    console.info(`Reproduction done ! Their is now ${this.chromosomes.length} chromosomes.`)
  }

  naturalSelection () {
    this.chromosomes = this.chromosomes.slice(0, Math.round(this.chromosomes.length / 2))
  }

  fitting () {
    this.chromosomes = this.chromosomes.map((chromosome) => {
      return { chromosome: chromosome, total: chromosome.fitting() }
    }).sort((a, b) => {
      return a.total - b.total
    }).map((element) => {
      return element.chromosome
    })
  }

  start (nbIteration, mutateEvery) {
    for (let i = 0; i < nbIteration; i++) {
      console.log(`Iteration ${i}/${nbIteration}`)
      this.fitting()
      this.naturalSelection()
      this.reproduce(i % mutateEvery === 0)
    }
  }

  getResult () {
    return this.chromosomes[0]
  }
}
