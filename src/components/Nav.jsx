import weatherLogo from '../assets/svg/weather.svg'
import { MyContext } from '../Context.jsx'
import { useContext, useState } from 'react'
import { FaSearch, FaTimes } from 'react-icons/fa' // Import FaTimes for the close button

const Nav = () => {
    const { setTemperature, temperature, search, setSearch } =
        useContext(MyContext)
    const [open, setOpen] = useState(false)

    const changeTheme = () => {
        document.body.classList.toggle('dark')
        document.body.classList.toggle('bg-color')
    }

    const celsiusToFahrenheit = () => {
        setTemperature(!temperature)
    }

    const closeSearch = () => {
        setOpen(false)
    }

    return (
        <nav className="py-4 sm:py-0 dark:bg-[#16161F]  border-b-[1px] border-gray-200 dark:border-none bg-gray-50 transition-all">
            <div className="container">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <img
                            className="w-12 h-12"
                            src={weatherLogo}
                            alt="weatherLogo"
                        />
                        <h2 className="text-2xl dark:text-white text-black hidden md:block lato-regular font-bold">
                            black-weather
                        </h2>
                        <FaSearch
                            className="sm:hidden text-2xl block dark:text-white"
                            onClick={() => setOpen(!open)}
                        />
                    </div>
                    <div>
                        <div
                            className={`fixed sm:sticky top-0 sm:bg-transparent bg-gray-900 transition-all py-5 w-full ${
                                open ? 'left-0' : 'left-[-100%]'
                            }`}
                        >
                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="dark:bg-[#7F7F98] w-full sm:block placeholder:text-gray-600 border-[#16161F] border-[1px] rounded-lg sm:w-[200px] md:w-[300px] xl:w-[400px] px-5 py-[7px]  outline-none dark:text-white lato-regular"
                                placeholder="search"
                            />
                            <FaTimes
                                className="absolute top-1/2 right-4 block sm:hidden transform -translate-y-1/2 text-gray-400 cursor-pointer"
                                onClick={closeSearch}
                            />
                        </div>
                    </div>
                    <div className="flex">
                        <button
                            onClick={changeTheme}
                            className="bg-[#3B3B55] inter-bold rounded-l-3xl text-white py-2 px-4"
                        >
                            dark
                        </button>
                        <button
                            onClick={celsiusToFahrenheit}
                            className={`py-2 ${!temperature && 'px-[22.6px]'} text-white inter-bold rounded-r-3xl px-6 bg-[#3B3B55] border-l-[3px] border-white dark:border-[#16161F]`}
                        >
                            {temperature ? 'F°' : 'C°'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default Nav
