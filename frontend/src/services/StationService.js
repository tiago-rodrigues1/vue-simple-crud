import axios from 'axios'

export class StationService {
  static async store(stationData) {
    const url = 'http://localhost:3000/stations/create'

    try {
      const response = await axios.post(url, stationData)

      if (response.status === 200) {
        return true
      }

      return false
    } catch (error) {
      console.error(error)
    }
  }

  static async listAll() {
    const url = 'http://localhost:3000/stations/'

    try {
      const response = await axios.get(url)

      if (response.status === 200) {
        return response.data
      }

      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }

  static async destroy(stationId) {
    const url = `http://localhost:3000/stations/${stationId}/destroy`

    try {
      const response = await axios.delete(url)

      if (response.status === 200) {
        return true
      }

      return false
    } catch (error) {
      console.error(error)
      return false
    }
  }
}
