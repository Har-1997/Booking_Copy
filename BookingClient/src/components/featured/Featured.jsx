import useFetch from "../../hooks/useFetch.js";
import "./featured.css";

const Featured = () => {

    const {data, loading, error} = useFetch(
        "/hotels/countByCity?cities=berlin,madrid,london"
    );

    // console.log(data);

    return (
        <div className="featured">
            {loading ? ("Loading please wait") : (
            <>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/city/540x270/957800.webp?k=6e50f4c36265ab07bf1c6498c298d8a9de40400f606365b83266a3e7ffe67877&o=" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Berlin</h1>
                        <h2>{data[0]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/city/540x270/690329.webp?k=330403cfa8e49ee98d01a4808f169d520e49f24348154b8cb7f637497015802f&o=" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>Madirid</h1>
                        <h2>{data[1]} properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img src="https://cf.bstatic.com/xdata/images/city/540x270/689874.webp?k=5a29b0d987e962b9ce2c78ae5dae52d02fb2ed959b1e2b00faf022306e103f8b&o=" alt="" className="featuredImg" />
                    <div className="featuredTitles">
                        <h1>London</h1>
                        <h2>{data[3]} properties</h2>
                    </div>
                </div>
            </>
            )}
        </div>
    )
}

export default Featured;



























