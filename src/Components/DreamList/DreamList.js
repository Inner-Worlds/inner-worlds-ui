import "./DreamList.css"
import DreamCard from "../DreamCard/DreamCard";
import { useCarousel } from "use-carousel-hook";

const DreamList = ({ dreams }) => {
    const { ref, previous, next } = useCarousel();

    const dreamCards = dreams.map(dream => <DreamCard key={dream.id} id={dream.id} date={dream.date} title={dream.title} description={dream.description} emotions={dream.emotions} tags={dream.tags} lucidity={dream.lucidityLevel}/>)
    
    return (
        <main className="dream-list">
            <button className="carousel-button prev fa-solid fa-chevron-left" onClick={() => previous()}></button>
            <ul ref={ref} className="carousel__list dream-carousel">
                {dreamCards}
            </ul>
            <button className="carousel-button next fa-solid fa-chevron-right" onClick={() => next()}></button>
        </main>
    )
}

export default DreamList;