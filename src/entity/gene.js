module.exports.Gene = class Gene {
  constructor (element, id) {
    this.lat = element.lan
    this.lng = element.lng
    this.name = element.city
    this.id = id
  }

  getName () {
    return this.name
  }

  /**
     * @see https://www.movable-type.co.uk/scripts/latlong.html
     * @see https://stackoverflow.com/a/5260472
     * @param City city
    */
  distanceTo (gene, type = Gene.KILOMETER) {
    let R = 6371e3
    let φ1 = Gene.toRadian(this.lat)
    let φ2 = Gene.toRadian(gene.lat)
    let Δφ = Gene.toRadian(gene.lat - this.lat)
    let Δλ = Gene.toRadian(gene.lng - this.lng)

    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    let d = R * c

    if (type === Gene.KILOMETER) {
      return d / 1000
    }

    return d // meters
  }

  static toRadian (number) {
    return number * Math.PI / 180
  }
}

module.exports.Gene.KILOMETER = 1
module.exports.Gene.METER = 0
