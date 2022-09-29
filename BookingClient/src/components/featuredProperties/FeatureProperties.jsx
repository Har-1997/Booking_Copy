import useFetch from '../../hooks/useFetch';
import './featuredProperties.css';

const FeatureProperties = () => {


    const {data, loading, error} = useFetch(
        "/hotels?featured=true&limit=4"
    );

    const images = [
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450058.jpeg?k=2449eb55e8269a66952858c80fd7bdec987f9514cd79d58685651b7d6e9cdfcf&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450082.jpeg?k=beb101b827a729065964523184f4db6cac42900c2415d71d516999af40beb7aa&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=",
        "https://r-xx.bstatic.com/xdata/images/xphoto/300x240/45450073.jpeg?k=795a94c30433de1858ea52375e8190a962b302376be2e68aa08be345d936557d&o=",
        "https://q-xx.bstatic.com/xdata/images/xphoto/300x240/45450056.jpeg?k=251e2507d43a24a4c58bb961b8d157147d56efbf91b49f9606bc768c58f581e4&o="
    ]   


    return (
        <div className='fp'>
            {loading ? "Loading" : <>
                {data.map((item)=> {
                    return(
                        <div className="fpItem" key={item._id}>
                            <img src={item.photos[0]} alt="" className="fpImg" />
                            <span className="fpName">{item.name}</span>
                            <span className="fpCity">{item.city}</span>
                            <span className="fpPrice">Starting from ${item.cheapestPrice}</span>
                            {item.rating && <div className='fpRating'>
                                <button>{item.rating}</button>
                                <span>Excellent</span>
                            </div>}
                        </div>
                    )
                })}
            </>}
        </div>
    )
}

export default FeatureProperties
