export interface Product {
  id: string;
  images: string[];
  title: string;
  slug: string;
  price: number;
  quantity: number;
  discount: number;
  subcategory: string;
  dateAdded: string;
  param: {
    [key: string]: string | number;
  };
  description: string;
}

export interface Review {
  productId: string;
  userName: string;
  userEmail: string;
  rating: number;
  comment: string;
  date: Date;
  replies?: Reply[];
}

interface Reply {
  userName: string;
  userEmail: string;
  comment: string;
  date: Date;
}
