import "./hotel.css";
import Navbar from "../../components/navbar/Navbar";
import Header from "../../components/header/Header";
import MailList from "../../components/mailList/MailList";
import Footer from "../../components/footer/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft, faCircleArrowRight, faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { faCircleXmark } from "@fortawesome/free-regular-svg-icons";
import useFetch from "../../hooks/useFetch";
import { useLocation, useNavigate } from "react-router-dom";
import { SearchContext } from "../../context/SearchContext";
import { AuthContext } from "../../context/AuthContext";
import Reserve from "../../components/reserve/Reserve";


const Hotel = () => {
  const location = useLocation()
  const id = location.pathname.split("/")[2]

  const [slideNumber, setSlideNumber] = useState(0)
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)

  const {data, loading, error} = useFetch(`/hotels/find/${id}`);

  const {user} = useContext(AuthContext)
  const navigate = useNavigate();

  const {dates, options} = useContext(SearchContext)  
  // console.log(dates);

  const MILLISECONDS_PER_DAY = 1000 * 60 * 60 * 24;
  function dayDifference(date1, date2){
    const timeDiff = Math.abs(date2.getTime() - date1.getTime());
    const diffDays = Math.ceil(timeDiff / MILLISECONDS_PER_DAY);
    return diffDays; 
  }

  const days = dayDifference(dates[0].endDate, dates[0].startDate)

  const photos = [
    {
      id: 1,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/335065533.jpg?k=6a52344456e9bc0cb91592b2fb9ff88e7604f4c2916f6b4b6dc7fd3e4c065d06&o=&hp=1"
    },
    {
      id: 2,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/335065918.jpg?k=51a180e5eaf282446bb909f6fd6bd1d127c81ec6c75ba5d984134e66194d12d9&o=&hp=1"
    },
    {
      id: 3,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/335063282.jpg?k=15f6f9067f4b0a7690691c125756b0b2ca35a5ea8eb1490c0b0bc87bd70f7f21&o=&hp=1"
    },
    {
      id: 4,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/113682487.jpg?k=3f6d3618a7931ee5cefdc837954fc8b872a241520c9dba906e5a3eb2e23d0ae5&o=&hp=1"
    },
    {
      id: 5,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/335071490.jpg?k=4d84f77e349569fa3a935cd23c0b534268a5013edb0c3a92d7c0f1c7b7cb6622&o=&hp=1"
    },
    {
      id: 6,
      src: "https://cf.bstatic.com/xdata/images/hotel/max1280x900/335065902.jpg?k=dcb78aeb660f29502a18ff7bf4bd36d4e1da33b84a19fdb82f2b817ffec71696&o=&hp=1"
    }
  ];

  const handleOpen = (i)=> {
    setSlideNumber(i);
    setOpen(true);
  }

  const handleMove = (direction) => {
    let newSlideNumber;

    if (direction === "l") {
      newSlideNumber = slideNumber === 0 ? 5 : slideNumber-1
    }else{
      newSlideNumber = slideNumber === 5 ? 0 : slideNumber+1
    }

    setSlideNumber(newSlideNumber)
  };

  const handleClick = () => {
    if(user){
      setOpenModal(true);
    }else{
      navigate("/login")
    }
  }

  return (
    <div>
      <Navbar />
      <Header type="list" />
      {loading ? "Loading" :
        <div className="hotelContainer">
        {open && <div className="slider">
          <FontAwesomeIcon 
            icon={faCircleXmark} 
            className="close" 
            onClick={()=> setOpen(false)}
          />
          <FontAwesomeIcon 
            icon={faCircleArrowLeft} 
            className="arrow" 
            onClick={()=> handleMove("l")}
          />
          <div className="sliderWrapper">
            <img src={data.photos[slideNumber]} alt="" className="sliderImg" />
          </div>
          <FontAwesomeIcon 
            icon={faCircleArrowRight} 
            className="arrow" 
            onClick={()=> handleMove("r")}
          />
        </div>}
        <div className="hotelWrapper">
          <button className="bookNow">Reserve or Book Now!</button>
          <h1 className="hotelTitle">{data.name}</h1>
          <div className="hotelAddress">
            <FontAwesomeIcon icon={faLocationDot} />
            <span>{data.address}</span>
          </div>
          <span className="hotelDistance">
            Excellent location - {data.distance}m from center
          </span>
          <span className="hotelPriceHighlight">
            Book a stay over ${data.cheapestPrice} at this property and get a free airport taxi
          </span>
          <div className="hotelImages">
            {data.photos?.map((photo, i)=> {
              return (<div className="hotelImgWrapper" key={photo.id}>
                <img 
                  src={photo} 
                  alt="" 
                  className="hotelImg" 
                  onClick={()=> handleOpen(i)}
                />
              </div>)
            }) }
          </div>
          <div className="hotelDetails">
            <div className="hotelDetailsTexts">
              <h1 className="hotelTitle">{data.title}</h1>
              <p className="hotelDesc">
                {data.desc}
              </p>
            </div>
            <div className="hotelDetailsPrice">
              <h1>Perfect for a {days}-night stay!</h1>
              <span>
                Located in the heart of Krakow, this property has an
                excellent location score of 9.8!
              </span>
              <h2>
                <b>${days * data.cheapestPrice * options.room}</b> ({days} nights)
              </h2>
              <button onClick={handleClick}>Reserve or Book Now!</button>
            </div>
          </div>
        </div>
        <MailList />
        <Footer />
      </div>}
      {openModal && <Reserve setOpen={setOpenModal} hotelId={id} />}
    </div>
  )
}

export default Hotel
