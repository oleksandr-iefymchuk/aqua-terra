import banner from '../assets/banner/banner.jpg';
import banner2 from '../assets/banner/banner2.jpg';
import banner3 from '../assets/banner/banner3.webp';
import banner4 from '../assets/banner/banner4.jpg';

export const BASE_URL = 'https://aqua-terra-server.vercel.app';

export const categories = [
  {
    name: 'Бойлери',
    linkName: 'bojleri',
    subcategories: [
      {
        name: 'Бойлери OCEAN FLAT',
        linkName: 'bojleri-ocean-flat'
      },
      {
        name: 'Бойлери OCEAN CUBE',
        linkName: 'bojleri-ocean-cube'
      },
      {
        name: 'Бойлери OCEAN FLAT серії Digital',
        linkName: 'bojleri-ocean-flat-ser-digital'
      },
      {
        name: 'Бойлер OCEAN FLAT BASIC',
        linkName: 'bojler-ocean-flat-basic'
      },
      {
        name: 'Бойлери OCEAN PRO квадратні',
        linkName: 'bojleri-ocean-pro-kvadratn'
      },
      {
        name: 'Бойлери OCEAN MINI',
        linkName: 'bojleri-ocean-mini'
      },
      {
        name: 'Бойлери Новатек',
        linkName: 'bojleri-novatek'
      }
    ]
  },
  {
    name: 'Ручні інструменти',
    linkName: 'ruchn-nstrumenti',
    subcategories: [
      {
        name: 'Набір інструментів',
        linkName: 'nab-r-nstrument-v'
      },
      { name: 'Викрутки', linkName: 'vikrutki' },
      { name: 'Молотки', linkName: 'molotki' }
    ]
  },
  {
    name: 'Спецодяг',
    linkName: 'speczodyag',
    subcategories: [
      { name: 'Жилети', linkName: 'zhileti' },
      { name: 'Штани', linkName: 'shtani' },
      { name: 'Куртки', linkName: 'kurtki' }
    ]
  },
  {
    name: 'Електроінструменти',
    linkName: 'elektro-nstrumenti',
    subcategories: [
      { name: 'Шурупокрути', linkName: 'shurupokruti' },
      { name: 'Шліфмашини', linkName: 'shl-fmashini' },
      { name: 'Електролобзики', linkName: 'elektrolobziki' }
    ]
  }
];

export const breadcrumbLinks = {
  '/': 'Головна',
  '/about': 'Про компанію',
  '/contacts': 'Контактна інформація',
  '/sale': 'Знижки',
  '/novelty': 'Новинки',
  '/delivery-info': 'Умови оплати та доставки',
  '/profile': 'Особистий кабінет',
  '/favorites': 'Список бажань',
  '/basket': 'Кошик',
  '/catalog': 'Каталог',
  '/catalog/bojleri': 'Водонагрівачі',
  '/catalog/bojleri-ocean-flat': 'Водонагрівачі OCEAN FLAT',
  '/catalog/bojleri-ocean-cube': 'Бойлери OCEAN CUBE',
  '/catalog/bojleri-ocean-flat-ser-digital': 'Бойлери OCEAN FLAT серії Digital',
  '/catalog/bojler-ocean-flat-basic': 'Бойлер OCEAN FLAT BASIC',
  '/catalog/bojleri-ocean-pro-kvadratn': 'Бойлери OCEAN PRO квадратні',
  '/catalog/bojleri-ocean-mini': 'Бойлери OCEAN MINI',
  '/catalog/bojleri-novatek': 'Бойлери Новатек'
};

export const banners = [
  {
    title: 'ТОП-товари',
    image: banner,
    route: '/tools',
    class: 'tools'
  },
  {
    title: 'Акції',
    image: banner2,
    route: '/sale',
    class: 'discountedProduct'
  },
  {
    title: 'Новинки',
    image: banner3,
    route: '/novelty',
    class: 'novelty'
  },
  {
    title: 'Популярне',
    image: banner4,
    route: '/popular',
    class: 'popular'
  }
];

export const headerNavbarLinks = [
  {
    link: '/',
    name: 'Головна'
  },
  {
    link: '/about',
    name: 'Про компанію'
  },
  {
    link: '/sale',
    name: 'Знижки'
  },
  {
    link: '/novelty',
    name: 'Новинки'
  },
  {
    link: '/delivery-info',
    name: 'Умови оплати та доставки'
  }
];

export const foterNavLinks = [
  {
    link: '/about',
    name: 'Про компанію'
  },
  {
    link: '/contacts',
    name: 'Контакти'
  },
  {
    link: '/delivery-info',
    name: 'Умови оплати та доставки'
  }
];

export const messengers = url => [
  {
    icon: 'whatsapp',
    link: `https://api.whatsapp.com/send?text=${encodeURIComponent(url)}`
  },
  {
    icon: 'telegram',
    link: `https://t.me/share/url?url=${encodeURIComponent(url)}`
  },
  {
    icon: 'facebook',
    link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
      url
    )}`
  },
  {
    icon: 'gmail',
    link: `https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Your%20Subject&body=${encodeURIComponent(
      url
    )}&ui=2&tf=1&pli=1`
  },
  {
    icon: 'skype',
    link: `https://web.skype.com/share?url=${encodeURIComponent(url)}`
  },
  {
    icon: 'twitter',
    link: `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      url
    )}&text=Check%20this%20out!`
  }
];

export const PLACEHOLDER_LABELS = {
  SEARCH_PLACEHOLDER: 'Я шукаю ...'
};

export const BUTTON_LABELS = {
  BUTTON_SEARCH: 'Знайти',
  BUTTON_CATALOG: 'Каталог товарів',
  BUTTON_LOGOUT: 'Logout',
  BUTTON_REGISTRATION: 'Registration',
  BUTTON_LOGIN: 'Login'
};

export const svgOption = {
  DEFAULT_SIZE: 25,
  DEFAULT_COLOR: '#ffffff'
};
