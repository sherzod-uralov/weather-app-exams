import { useContext } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/swiper-bundle.css'
import { MyContext } from '../Context.jsx'
import 'swiper/css'
import 'swiper/swiper-bundle.css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules'
const WeatherSwiper = () => {
    const { data, temperature } = useContext(MyContext)
    console.log(data)

    const breakpoints = {
        320: {
            slidesPerView: 1,
            spaceBetween: 10,
        },
        480: {
            slidesPerView: 2,
            spaceBetween: 20,
        },
        768: {
            slidesPerView: 3,
            spaceBetween: 30,
        },
        1024: {
            slidesPerView: 4,
            spaceBetween: 40,
        },
        1280: {
            slidesPerView: 6,
            spaceBetween: 50,
        },
    }

    return (
        <div className="container2 dark:bg-[#16161F] bg-gray-200 w-full rounded-md  h-52">
            <Swiper
                modules={[Navigation, Pagination, Scrollbar, A11y]}
                breakpoints={breakpoints}
                autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
                navigation={{
                    nextEl: '.swiper-button-next',
                    prevEl: '.swiper-button-prev',
                }}
                pagination={false}
                scrollbar={false}
            >
                {data?.forecast?.forecastday[0]?.hour?.map(
                    (dataPoint, index) => (
                        <SwiperSlide key={index}>
                            <div className="pt-6 px-5">
                                <p className="text-center text-black dark:text-white inter-regular font-bold pb-[12px]">
                                    {dataPoint.time?.slice(11, 16)}
                                </p>
                                <img
                                    className="mx-auto"
                                    src={dataPoint?.condition?.icon}
                                    alt=""
                                />
                                <p className="text-center text-black dark:text-white inter-regular font-bold pt-[10px]">
                                    {dataPoint?.condition?.text}
                                </p>
                                <p className="text-center text-black dark:text-white inter-regular font-bold pt-[5px]">
                                    {!temperature
                                        ? dataPoint?.temp_c + '° C'
                                        : dataPoint?.temp_f + '° F'}
                                </p>
                            </div>
                        </SwiperSlide>
                    )
                )}
            </Swiper>
        </div>
    )
}

export default WeatherSwiper
