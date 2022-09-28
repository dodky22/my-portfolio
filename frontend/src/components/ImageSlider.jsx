import React from 'react'
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const SampleNextArrow = ({ customClass, style, onClick }) => {
  return (
    <div
      className={customClass}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <em></em>
    </div>
  );
}

const  SamplePrevArrow = ({customClass, style, onClick}) => {
  return (
    <div
      className={customClass}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    >
      <em></em>
    </div>
  );
}

const ImageSlider = ({images}) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    cssEase: "cubic-bezier(0.05, 0.65, 0.18, 1)",
    pauseOnHover: true,
    dotsClass: "my_slick_dots my_slick_thumb",
    focusOnSelect: false,
    nextArrow: <SampleNextArrow customClass={"my_next_arr"}/>,
    prevArrow: <SamplePrevArrow customClass={"my_prev_arr"}/>
  };

  return (
        <div id="quitFadeUp" style={{borderBottomLeftRadius: '5px !important'}}>
          <div style={{ borderBottom: '1px solid rgb(74, 74, 74)', height: '40px',padding: '2px', background: '#1b1b1b', display: 'flex', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius:'5px',borderTopRightRadius:'5px'}}>
            <h4 style={{color: '#999', padding: '2px 20px',minWidth:'150px', background: '#252525', borderRadius: '20px', margin: 0}}>PROJECT GALLERY</h4>
          </div>
          <Slider {...settings}>
            { images && images.map((el,id) => (
                <img key={id} src={el} alt="" width="100%" height="100%" style={{marginBottom: '-25px'}} />
            ))}
          </Slider>
        </div>   
  )
}

export default ImageSlider

