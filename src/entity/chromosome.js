const {Gene} = require('./gene')

let ConvertBase = (num) => {
  return {
    from: (baseFrom) => {
      return {
        to: (baseTo, stringLength = 0) => {
          return parseInt(num, baseFrom).toString(baseTo).padStart(stringLength, 0)
        }
      }
    },
    getBinLength: () => {
      return parseInt(num, 10).toString(2).length
    }
  }
}

module.exports.Chromosome = class Chromosome {
  constructor (elements, fitting) {
    this.nbBit = ConvertBase(elements.length - 1).getBinLength()
    this.genes = elements.map((element, index) => {
      return new Gene(element, ConvertBase(index).from(10).to(2, this.nbBit))
    })
    this.fittingFunction = fitting
  }

  fitting () {
    let fitting = this.fittingFunction
    let genes = this.genes
    return this.genes.reduce((sum, element, index) => {
      return sum + fitting(element, index, genes)
    }, 0)
  }

  /**
   *
   * @param {Chromosome} chromosome
   */
  reproduce (chromosome) {
    let newGenes = this.genes.slice(0, Math.round(this.genes.length / 2))

    chromosome.genes.forEach((gene) => {
      if (!newGenes.includes(gene)) {
        newGenes.push(gene)
      }
    })
    return new Chromosome(newGenes, this.fittingFunction)
  }
}
