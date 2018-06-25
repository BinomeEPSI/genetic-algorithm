module.exports.Journey = class Journey {
  constructor (firstCity) {
    this.firstCity = firstCity
    this.steps = []
    this.lastCity = firstCity
    this.distance = { total: 0, step: 0 }
  }

  add (step) {
    this.distance.step += this.lastCity.distanceTo(step)
    this.lastCity = step
    this.steps.push(step)

    this.distance.total = this.lastCity.distanceTo(this.firstCity) + this.distance.step
  }

  print () {
    let string = this.firstCity.name
    this.steps.forEach(el => { string += '->' + el.name })
    string += '->' + this.firstCity.name
    return string
  }
}
