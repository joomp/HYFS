import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ filterer, setFilter ] = useState('')
  const [ countries, setCountries] = useState([])

  useEffect( () => {
    axios
    .get('https://restcountries.eu/rest/v2/all')
    .then( response => {
      setCountries(response.data)
    })
  }, [])

  const countriesToShow = () => {
    let regexp = new RegExp(`${filterer}`, 'i')
    return countries.filter(person => regexp.test(person.name))
  }

  return (
    <div style = {{margin: '0 auto'}}>
      <h2>Countries</h2>
      <Filter filterer = {filterer} setFilter = {setFilter}/>
      <Countries countries = {countriesToShow()} search = {setFilter} />
    </div>
  )
}

const Countries = ({countries, search}) => {
  if (countries.length > 10)
    return <div>Too many matches, please specify. </div>
  else if (countries.length === 1)
    return <CountryData country ={countries[0]} />
  else if (countries.length === 0)
    return <div>No countries found</div>
  else {
    return (
      <ul>
        {countries.map((country) => {
          return <CountryListItem key = {country.name} country = {country} search = {search}/>
        })}
      </ul>
    )
  }
}

const CountryData = ({country}) => {
  return (
    <div>
      <h2>{country.name}</h2>
      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <div>
        Languages: 
          <ul>
            {country.languages.map(lang => <li key = {`${country.name}-${lang.name}`}>{lang.name}</li>)}
          </ul>
          <img src = {country.flag} alt = {`The flag of ${country.name}`} style = {{width: '200px', margin: '0, auto'}}/>
      </div>
      <Weather country = {country} />
    </div>
  )
}

const Weather = ({country}) => {
  const [ weather, setWeather ] = useState({isValid: false})
  const api_key = process.env.REACT_APP_API_KEY
  const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?q=${country.capital},${country.alpha2Code}&appid=${api_key}`
  useEffect( () => {
    console.log(weatherUrl)
    axios
    .get(weatherUrl)
    .then( response => {
      setWeather({
        isValid: true,
        main: response.data.weather[0].main,
        description: response.data.weather[0].description,
        icon: response.data.weather[0].icon,
        temp: response.data.main.temp,
        wind: response.data.wind.speed
      })
    }).catch( (error) => {
      console.log("Couldn't load the weather. Probably bad api key or no weather was found");
    })
  }, [weatherUrl])
  
  if (weather.isValid){
    return(
      <div>
        <h3>Weather in {country.capital}</h3>
        <b>{weather.main}</b> - {weather.description}
        <div>
          <img src = {`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
            alt = {`${weather.main} weather icon`} style = {{width: '100px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'grey'}}/>
        </div>
        Temperature: {(weather.temp - 273.15).toFixed(1)} °C
        <br />
        Wind: {weather.wind} m/s
      </div>
    )
  } else {
      return null
  }
}

const Filter = ({filterer, setFilter}) => {
  
  const handleFiltererChange = (event) =>{
    setFilter(event.target.value)
  }

  return (
    <form>
      <div>
        Search: <input value = {filterer} onChange = {handleFiltererChange}/>
      </div>
    </form>
  )
}

const CountryListItem = ({country, search}) => {
  const onclick = () => { return search(country.name) }
  return(
    <li key = {country.name}>
       {country.name} &nbsp; 
       <button onClick = {onclick}>Show</button>
    </li>
  ) 
}


ReactDOM.render(<App />, document.getElementById('root')
);
