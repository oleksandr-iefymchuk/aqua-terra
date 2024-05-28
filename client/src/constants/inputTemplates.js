export const loginInputTemplates = [
  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    id: 'password'
  }
];

export const registrationInputTemplates = [
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },
  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'password',
    name: 'password',
    label: 'Пароль',
    id: 'password'
  }
];

export const personalInfoInputTemplates = [
  {
    type: 'text',
    name: 'surname',
    label: 'Прізвище',
    id: 'surname'
  },
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },

  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
    id: 'phone',
    placeholder: '+38 (0__) ___ __ __'
  },
  {
    type: 'text',
    name: 'city',
    label: 'Місто',
    id: 'city'
  },
  {
    type: 'text',
    name: 'address',
    label: 'Адреса',
    id: 'address'
  }
];

export const passwordInputTemplates = [
  {
    type: 'password',
    name: 'currentPassword',
    label: 'Старий пароль',
    id: 'currentPassword'
  },
  {
    type: 'password',
    name: 'newPassword',
    label: 'Новий пароль',
    id: 'newPassword'
  },
  {
    type: 'password',
    name: 'passwordConfirmation',
    label: 'Підтвердити новий пароль',
    id: 'passwordConfirmation'
  }
];

export const userOrderInputTemplates = [
  {
    type: 'text',
    name: 'surname',
    label: 'Прізвище',
    id: 'surname'
  },
  {
    type: 'text',
    name: 'name',
    label: "Ім'я",
    id: 'name'
  },

  {
    type: 'email',
    name: 'email',
    label: 'Е-пошта',
    id: 'email'
  },
  {
    type: 'tel',
    name: 'phone',
    label: 'Телефон',
    id: 'phone',
    placeholder: '+38 (0__) ___ __ __'
  }
];

export const adressInputTemplates = [
  {
    type: 'text',
    name: 'city',
    label: 'Місто',
    id: 'city'
  },
  {
    type: 'text',
    name: 'address',
    label: 'Вулиця, будинок, квартира',
    id: 'address'
  }
];

export const deliveryOptions = [
  'Доставка Новою поштою',
  'Доставка Укрпоштою',
  'Самовивіз'
];

export const paymentOptions = ['Оплата онлайн', 'Оплата при отриманні'];
