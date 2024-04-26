const reviews = [
  {
    id: '1edd393a-ce19-40dd-be87-72642766027e',
    productId: '30347',
    userId: 'user123',
    userName: 'Олександр',
    userEmail: 'oleksandr@gmail.com',
    rating: 5,
    comment: 'Чудовий бойлер, працює відмінно',
    date: '01.03.2023',
    replies: [
      {
        userId: 'admin',
        userName: 'Адміністратор',
        userEmail: 'admin@example.com',
        comment: 'Дякуємо за ваш відгук!',
        date: '02.03.2023',
      },
    ],
  },
  {
    id: '2add393a-ce19-40dd-be87-72642766027e',
    productId: '30347',
    userId: 'user124',
    userName: 'Анастасія',
    userEmail: 'nastya@gmail.com',
    rating: 4,
    comment: 'Дуже подобається, але доставка зайняла багато часу',
    date: '22.04.2024',
    replies: [],
  },
];
export default reviews;
