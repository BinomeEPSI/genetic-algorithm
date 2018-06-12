module.exports.City = class City {
  constructor (element) {
    this.lat = element.lan
    this.lng = element.lng
    this.name = element.city
  }

  /**
     * @see https://www.movable-type.co.uk/scripts/latlong.html
     * @see https://stackoverflow.com/a/5260472
     * @param City city
    */
  distanceTo (city, type = City.KILOMETER) {
    let R = 6371e3
    let φ1 = City.toRadian(this.lat)
    let φ2 = City.toRadian(city.lat)
    let Δφ = City.toRadian(city.lat - this.lat)
    let Δλ = City.toRadian(city.lng - this.lng)

    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    let d = R * c

    if (type === City.KILOMETER) {
      return d / 1000
    }

    return d // meters
  }

  static toRadian (number) {
    return number * Math.PI / 180
  }
}

module.exports.City.KILOMETER = 1
module.exports.City.METER = 0
