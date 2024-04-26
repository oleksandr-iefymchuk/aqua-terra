import { Link } from 'react-router-dom';
import Slider from 'react-slick';

import './Banner.scss';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import { banners } from '../../../../constans/constants';

import ButtonWrapper from '../../../../common/Button/Button';

const Banner = () => {
  const settings = {
    dots: true,
    infinite: true,
    lazyLoad: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    pauseOnHover: true,
    dotsClass: 'slick-dots slick-thumb',
    nextArrow: <ButtonWrapper buttonClassName="arrowNext" icon="arrowNext" />,
    prevArrow: <ButtonWrapper buttonClassName="arrowPrev" icon="arrowPrev" />,
  };

  return (
    <div className="bannersWrapper">
      <div className="sliderContainer">
        <Slider {...settings}>
          {banners.map((banner, index) => (
            <Link to={banner.route} key={index}>
              <div className="card">
                <h2 className="bannerTitle">{banner.title}</h2>
                <img src={banner.image} alt={banner.title} />
              </div>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Banner;
