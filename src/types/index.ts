export interface Recipe {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  method: string;
  source: string;
  era: string;
  region: string;
  imageUrl?: string;
}

export interface FoodEntity {
  id: string;
  name: string;
  type: 'dish' | 'restaurant' | 'ingredient' | 'person' | 'place';
  description: string;
  stories: string[];
  relatedEntities: string[];
  location?: {
    lat: number;
    lng: number;
    city: string;
  };
}

export interface Document {
  id: string;
  title: string;
  content: string;
  author: string;
  year: number;
  source: string;
  entities: FoodEntity[];
}

export interface MapLocation {
  id: string;
  name: string;
  coordinates: [number, number];
  type: 'restaurant' | 'market' | 'landmark';
  description: string;
  dishes: string[];
  stories: string[];
}