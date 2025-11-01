export interface PropertyItem {
  _id: string; // or ObjectId if using MongoDB types
  title: string;
  description: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  price: number;
  ownerName: string;
  area: number;
  type: 'sale' | 'rent';
  images: string[];
  videos: string[];
  status: 'pending' | 'approved' | 'rejected' | 'sold' | 'rented';
  ownerId: string;
  agents: string[];
  amenities: string[];
  contactName: string;
  contactEmail: string;
  contactNumber: string;
  availableFrom: string | Date;
  currency: string;
  address: string;
  city: string;
  state: string;
  country: string;
  parkingSpaces: number;
  floorNumber: number;
  bathrooms: number;
  bedrooms: number;
  propertyType: string;
  isFurnished: boolean;
  createdAt: string | Date;
  updatedAt: string | Date;
  __v?: number;
}
