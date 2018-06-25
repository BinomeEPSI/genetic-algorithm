module.exports.Chromosome = class Chromosome {
  constructor (list, attribut) {
    this.list = list
    this.attribut = attribut
  }

  getGenes () {
    return this.list[this.attribut]
  }

  add (element) {
    return this.list.add(element)
  }
}
