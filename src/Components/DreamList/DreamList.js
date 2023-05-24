import "./DreamList.css";
import DreamCard from "../DreamCard/DreamCard";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectCoverflow } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-coverflow";
import PropTypes from 'prop-types';

const DreamList = ({ userID, dreams, deleteDream, updateDream, updateEmotionsAndTags, setEditing, currentlyEditing, deleteCardError, saveError }) => {
    if (!dreams?.length) return <h1 className="no-dreams">Nothing logged, get dreamin!</h1>;

    const dreamCards = dreams.map(dream => {
        return <SwiperSlide key={`slide${dream.id}`}>
                    <DreamCard
                        key={dream.id}
                        userID={userID}
                        id={dream.id}
                        date={dream.dreamDate} 
                        title={dream.title} 
                        description={dream.description} 
                        emotions={dream.emotions} 
                        tags={dream.tags} 
                        lucidity={dream.lucidity}
                        deleteDream={deleteDream}
                        updateDream={updateDream}
                        updateEmotionsAndTags={updateEmotionsAndTags}
                        setEditing={setEditing}
                        deleteCardError={deleteCardError}
                        saveError={saveError}
                    />
                </SwiperSlide>
    });
    
    return (
        <>
            {currentlyEditing && <h2 className="save-changes-msg">Please save your changes to leave edit mode!</h2>}
            <Swiper
                effect="coverflow"
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
                breakpoints={{
                    1000: { slidesPerView: 3 },
                    600: { slidesPerView: 2 },
                    1: { slidesPerView: 1 }
                }}
                modules={[ Navigation, EffectCoverflow ]}
                className="mySwiper"
            >
                {dreamCards}
            </Swiper>
        </>
    )
}

DreamList.propTypes = {
    userID: PropTypes.string.isRequired,
    dreams: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
        dreamDate: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        emotions: PropTypes.arrayOf(PropTypes.string).isRequired,
        tags: PropTypes.arrayOf(PropTypes.string).isRequired,
        lucidity: PropTypes.number.isRequired,
      })
    ).isRequired,
    deleteDream: PropTypes.func.isRequired,
    updateDream: PropTypes.func.isRequired,
    updateEmotionsAndTags: PropTypes.func.isRequired,
    setEditing: PropTypes.func.isRequired,
    currentlyEditing: PropTypes.bool.isRequired,
    deleteCardError: PropTypes.object,
    saveError: PropTypes.object,
  };

export default DreamList;