import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api/all'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather"

const getAll = () => {
  return axios.get(baseUrl).then(res => res.data)
}


const getDetails = (id) => {
  return axios.get(`https://restcountries.com/v3.1/alpha/${id}`)
    .then(response => response.data[0])
}

const getWeather = (city) => {
  return axios
    .get(`${weatherUrl}?q=${city}&appid=${apiKey}&units=metric`)
    .then(response => response.data)
}

export default { getAll, getDetails, getWeather }
