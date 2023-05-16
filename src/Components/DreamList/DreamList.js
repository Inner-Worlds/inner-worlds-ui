import "./DreamList.css"
import DreamCard from "../DreamCard/DreamCard";

const DreamList = ({ dreams }) => {
    const dreamCards = dreams.map(dream => <DreamCard key={dream.id} id={dream.id} date={dream.date} title={dream.title} description={dream.description} emotions={dream.emotions} tags={dream.tags} lucidity={dream.lucidityLevel}/>)
    
    return (
        <main className="dream-list">
            <button className="carousel-button prev fa-solid fa-chevron-left"></button>
            <ul className="carousel__list dream-carousel">
                {dreamCards}
            </ul>
            <button className="carousel-button next fa-solid fa-chevron-right"></button>
        </main>
    )
}

export default DreamList;