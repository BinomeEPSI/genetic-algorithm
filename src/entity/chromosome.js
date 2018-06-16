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

  mutate () {
    // Mutation : Take 1 random index, and permute 2 elements
    let max = this.genes.length - 1
    let min = 0
    let randomIndex1 = Math.round(Math.random() * (max - min) + min)
    let randomIndex2 = randomIndex1 + 1 >= max ? 0 : randomIndex1 + 1
    let tmp = this.genes[randomIndex1]
    this.genes[randomIndex1] = this.genes[randomIndex2]
    this.genes[randomIndex2] = tmp
    return this
  }

  getOrder () {
    return this.genes.map(gene => {
      return gene.getName()
    })
  }
}
