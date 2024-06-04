import banner from '../assets/banner/banner.jpg';
import banner3 from '../assets/banner/banner3.webp';
// import banner2 from '../assets/banner/banner2.jpg';
// import banner4 from '../assets/banner/banner4.jpg';

export const banners = [
  {
    title: 'Новинки',
    image: banner,
    route: '/novelty',
    class: 'novelty'
  },
  {
    title: 'Акції',
    image: banner3,
    route: '/sale',
    class: 'discountedProduct'
  }
  // {
  //   title: 'ТОП-товари',
  //   image: banner2,
  //   route: '/tools',
  //   class: 'tools'
  // },
  // {
  //   title: 'Популярне',
  //   image: banner4,
  //   route: '/popular',
  //   class: 'popular'
  // }
];
