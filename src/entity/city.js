module.exports.City = class City {
  constructor (name, latitude, longitude) {
    this.name = name
    this.latitude = latitude
    this.longitude = longitude
  }

  /**
  * @see https://www.movable-type.co.uk/scripts/latlong.html
  * @see https://stackoverflow.com/a/5260472
  * @param City city
  */
  distanceTo (city) {
    let R = 6371
    let φ1 = City.toRadian(this.latitude)
    let φ2 = City.toRadian(city.latitude)
    let Δφ = City.toRadian(city.latitude - this.latitude)
    let Δλ = City.toRadian(city.longitude - this.longitude)

    let a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2)
    let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))

    let d = R * c

    return d
  }

  static toRadian (degres) {
    return degres * Math.PI / 180
  }
}
