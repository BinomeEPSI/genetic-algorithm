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
  constructor (elements) {
    let nbBit = ConvertBase(elements.length - 1).getBinLength()
    this.genes = elements.map((element, index) => {
      return new Gene(element, ConvertBase(index).from(10).to(2, nbBit))
    })
  }
}
