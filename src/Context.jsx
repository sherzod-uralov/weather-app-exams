import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { API_URL } from './api/url.js'
import { debounce } from 'lodash' 

export const MyContext = createContext()

export const AppContext = (props) => {
    const [data, setData] = useState()
    const [location, setLocation] = useState(null)
    const [error, setError] = useState(null)
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(false)
    const token = 'c62661d95a4542f98d5213933241401'
    const isSunUp = data?.current?.is_day === 1
    const currentLocation = data?.location
    const currentWaether = data?.current

    const getWeather = async (latitude, longitude, searchQuery = '') => {
        try {
            if (latitude && longitude) {
                const query =
                    searchQuery.length === 0
                        ? `${latitude},${longitude}`
                        : searchQuery
                const response = await axios.get(
                    `${API_URL}/forecast.json?key=${token}&q=${query}`
                )
                setData(response.data)
            }
        } catch (e) {
            console.log(e)
        } finally {
        }
    }

    const getLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords
                    localStorage.setItem(
                        'location',
                        JSON.stringify([longitude, latitude])
                    )
                    setLocation({ latitude, longitude })
                    getWeather(latitude, longitude, search)
                },
                (error) => {
                    setError(error.message)
                }
            )
        } else {
            setError('Geolocation is not supported by this browser.')
        }
    }

    const fullDate = (date) => {
        const string = date.split('/')[0]
        switch (string) {
            case '1':
                return 'January'
            case '2':
                return 'February'
            case '3':
                return 'March'
            case '4':
                return 'April'
            case '5':
                return 'May'
            case '6':
                return 'June'
            case '7':
                return 'July'
            case '8':
                return 'August'
            case '9':
                return 'September'
            case '10':
                return 'October'
            case '11':
                return 'November'
            case '12':
                return 'December'
            default:
                return ''
        }
    }

    useEffect(() => {
        const loc = JSON.parse(localStorage.getItem('location'))
        if (loc && loc.length === 2) {
            setLocation({ latitude: loc[1], longitude: loc[0] })
            getWeather(loc[1], loc[0], search)
        } else {
            getLocation()
        }
    }, [search])

    const [temperature, setTemperature] = useState(false)

    const debouncedSearch = debounce((value) => {
        getWeather(location.latitude, location.longitude, value)
    }, 3000)

    const handleSearchChange = (value) => {
        setSearch(value)
        debouncedSearch(value)
    }

    return (
        <MyContext.Provider
            value={{
                temperature,
                setTemperature,
                getWeather,
                fullDate,
                location,
                setData,
                data,
                isSunUp,
                getLocation,
                currentLocation,
                currentWaether,
                search,
                setSearch,
                handleSearchChange,
                error,
            }}
        >
            {props.children}
        </MyContext.Provider>
    )
}
