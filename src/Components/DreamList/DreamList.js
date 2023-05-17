import "./DreamList.css";
import DreamCard from "../DreamCard/DreamCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";

const DreamList = ({ dreams }) => {
    const dreamCards = dreams.map(dream => {
        return <SwiperSlide key={dream.id}>
                    <DreamCard
                        id={dream.id}
                        date={dream.dreamDate} 
                        title={dream.title} 
                        description={dream.description} 
                        emotions={dream.emotions} 
                        tags={dream.tags} 
                        lucidity={dream.lucidity}
                    />
                </SwiperSlide>
    });
    
    return (
        <>
            <Swiper
                effect="coverflow"
                grabCursor={true}
                slidesPerView={3}
                spaceBetween={30}
                centeredSlides={true}
                navigation={true}
                coverflowEffect={{
                    rotate: 50,
                    stretch: 0,
                    depth: 200,
                    modifier: 1,
                    slideShadows: true,
                }}
                modules={[ Navigation, EffectCoverflow ]}
                className="mySwiper"
            >
                {dreamCards}
            </Swiper>
        </>
    )
}

export default DreamList;