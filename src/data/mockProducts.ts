export interface MockProduct {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export const mockProducts: MockProduct[] = [
  {
    id: 1,
    title: "Wireless Headphones",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "High-quality wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals."
  },
  {
    id: 2,
    title: "Smart Watch",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    description: "Advanced smart watch with heart rate monitor, GPS, and water resistance. Stay connected and track your fitness goals."
  },
  {
    id: 3,
    title: "Portable Charger",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1609042231364-579b0d8d6e3d?w=400&h=400&fit=crop",
    description: "20000mAh portable charger with fast charging support. Keep your devices charged on the go with this compact powerbank."
  },
  {
    id: 4,
    title: "Mechanical Keyboard",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1587829191301-4b3b03daf0b5?w=400&h=400&fit=crop",
    description: "RGB mechanical keyboard with Cherry MX switches. Perfect for gaming and typing with customizable lighting effects."
  },
  {
    id: 5,
    title: "4K Webcam",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400&h=400&fit=crop",
    description: "Crystal clear 4K video quality webcam for streaming and video calls. Built-in stereo microphones for better audio."
  },
  {
    id: 6,
    title: "Wireless Mouse",
    price: 39.99,
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    description: "Precision wireless mouse with adjustable DPI settings. Ergonomic design for comfortable use throughout the day."
  },
  {
    id: 7,
    title: "USB-C Hub",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1625948515291-69613efd103f?w=400&h=400&fit=crop",
    description: "Multi-port USB-C hub with HDMI, USB 3.0, and SD card reader. Expand your laptop connectivity with this compact hub."
  },
  {
    id: 8,
    title: "Phone Stand",
    price: 24.99,
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=400&h=400&fit=crop",
    description: "Adjustable phone stand compatible with all devices. Perfect for video calls, streaming, and hands-free viewing."
  }
];
