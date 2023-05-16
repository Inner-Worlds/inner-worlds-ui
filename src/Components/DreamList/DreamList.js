import "./DreamList.css"
import DreamCard from "../DreamCard/DreamCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
// import "swiper/css/pagination";
import "swiper/css/navigation";

const DreamList = ({ dreams }) => {
    const dreamCards = dreams.map(dream => <SwiperSlide key={dream.id}><DreamCard id={dream.id} date={dream.date} title={dream.title} description={dream.description} emotions={dream.emotions} tags={dream.tags} lucidity={dream.lucidityLevel}/></SwiperSlide>)
    
    return (
        <>
            {/* <button className="carousel-button prev fa-solid fa-chevron-left"></button> */}
            <Swiper 
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                // pagination={{ clickable: true }}
                navigation={true}
                modules={[Navigation]}
                className="mySwiper"
            >
                {dreamCards}
            </Swiper>
            {/* <button className="carousel-button next fa-solid fa-chevron-right"></button> */}
        </>
    )
}

export default DreamList;