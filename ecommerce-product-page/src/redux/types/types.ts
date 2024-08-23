export interface Product {
    id: number;
    name: string;
    description: string;
    price: number;
    images: string[];
    status: 'In Stock' | 'Low Stock' | 'Out of Stock';
    vendors: Vendor[];
  }
  
  export interface Vendor {
    name: string;
    price: number;
  }
  
  export interface Review {
    id: number;
    rating: number;
    comment: string;
    userImage: string;
    date: string;
  }