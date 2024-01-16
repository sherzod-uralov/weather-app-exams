import { useContext, useEffect, useState } from 'react'
import night from '../assets/png/image(2).png'
import day from '../assets/png/image(1).png'
import { MyContext } from '../Context.jsx'
import temperatures from '../assets/svg/Icons.svg'
import rain from '../assets/svg/Icons(1).svg'
import wind from '../assets/svg/Icons(2).svg'
import humidity from '../assets/svg/Icons(3).svg'
import sun from '../assets/svg/Icons(4).svg'
import { FaTemperatureEmpty } from 'react-icons/fa6'
import { IoIosOptions } from 'react-icons/io'

const Hero = () => {
    const [date, setDate] = useState(new Date())

    const {
        temperature,
        isSunUp,
        currentLocation,
        currentWaether,
        data,
        getWeather,
        getLocation,
        fullDate,
    } = useContext(MyContext)

    useEffect(() => {
        getWeather()
        const intervalId = setInterval(() => {
            setDate(new Date())
        }, 10000)
        getLocation()
        return () => clearInterval(intervalId)
    }, [])

    return (
        <main className="mt-3 dark:text-white mb-4">
            <div className="container">
                <div className="xl:flex  block gap-[15px]">
                    <div className="relative p-3 rounded-md bg-gray-200 dark:bg-[#16161F]">
                        <img
                            className="rounded-md w-full xl:min-w-[600px] h-[500px]"
                            src={isSunUp ? day : night}
                            alt="day"
                        />
                        <div className="absolute text-white top-[32px] left-[32px]">
                            <h2 className="lato-regular inline font-bold text-2xl">
                                {currentLocation?.country},{' '}
                                {currentLocation?.tz_id.split('/')[0]}
                            </h2>
                            <h2 className="lato-regular  font-bold text-sm">
                                {' '}
                                {currentLocation?.name},
                                {' ' + date.toLocaleDateString().split('/')[1]}
                                {' ' + fullDate(date.toLocaleDateString())}
                                {'  ' +
                                    date
                                        .toLocaleDateString()
                                        .split('/')[2]}{' '}
                                year
                            </h2>
                        </div>
                        <div className="absolute top-[32px] right-[32px] lato-regular font-bold text-[20px] text-white">
                            {date.toLocaleTimeString().split(':')[0]}:
                            {date.toLocaleTimeString().split(':')[1]}
                        </div>
                        <div className="sm:w-32 sm:h-32 w-28 h-28 right-8 sm:right-12 rounded-xl bg-white bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-10  absolute bottom-12">
                            <img
                                className="w-[110px] h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                                src={currentWaether?.condition?.icon}
                                alt="icon"
                            />
                        </div>
                        <div className="absolute bottom-[50px] left-[36px]">
                            <h1 className="text-white sm:text-[70px] text-[40px] lato-regular font-bold">
                                {!temperature
                                    ? currentWaether?.temp_c + '° C'
                                    : currentWaether?.temp_f + '° F'}
                            </h1>
                            <p className="inter-regular text-white text-[20px] sm:text-[35px] pl-1">
                                {currentWaether?.condition?.text}
                            </p>
                        </div>
                    </div>
                    <div className="w-full h-[524px] mt-3 xl:mt-0 rounded-md bg-gray-200 dark:bg-[#16161F]">
                        <div className="pl-[24px] pr-[24px] pt-[20px]">
                            <div className="flex items-center justify-between">
                                <h2 className="dark:text-white text-black lato-regular text-[16px] font-thin">
                                    Climate details
                                </h2>
                                <IoIosOptions className="text-2xl" />
                            </div>
                            <div className="flex flex-col pt-[60px] inter-regular font-bold">
                                <div className="flex justify-between items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <img
                                            src={temperatures}
                                            alt="tempature"
                                        />
                                        <h2>Temperature</h2>
                                    </div>
                                    <div>
                                        <p>
                                            {' '}
                                            {!temperature
                                                ? currentWaether?.temp_c + '° C'
                                                : currentWaether?.temp_f +
                                                  '° F'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <img src={rain} alt="tempature" />
                                        <h2>amount of rain</h2>
                                    </div>
                                    <div>
                                        <p>{currentWaether?.precip_mm}%</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <img src={wind} alt="tempature" />
                                        <h2>Wind speed</h2>
                                    </div>
                                    <div>
                                        <p>{currentWaether?.wind_kph} km/h</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <img src={humidity} alt="tempature" />
                                        <h2>Air humidity</h2>
                                    </div>
                                    <div>
                                        <p>{currentWaether?.humidity}%</p>
                                    </div>
                                </div>
                                <div className="flex justify-between items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <img src={sun} alt="tempature" />
                                        <h2>UV index</h2>
                                    </div>
                                    <div>
                                        <p>{currentWaether?.uv}</p>
                                    </div>
                                </div>
                                <div className="flex justify-between pl-1 items-center py-[16px] border-b-[1px] border-[#1C1C27]">
                                    <div className="flex items-center gap-2">
                                        <FaTemperatureEmpty className="text-2xl text-[#3B3B55]" />
                                        <h2>Pressure</h2>
                                    </div>
                                    <div>
                                        <p>{currentWaether?.pressure_mb} m/b</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Hero
