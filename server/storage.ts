import { 
  type Listing, type InsertListing, 
  type Contact, type InsertContact 
} from "@shared/schema";

export interface IStorage {
  getListings(filters?: { minPrice?: number; maxPrice?: number; city?: string; type?: string }): Promise<Listing[]>;
  getListing(id: number): Promise<Listing | undefined>;
  submitContact(contact: InsertContact): Promise<void>;
}

export class MemStorage implements IStorage {
  private listings: Listing[];
  private contacts: Contact[];
  private currentId: number;

  constructor() {
    this.listings = [
      {
        id: 1,
        title: "Modern Luxury Villa",
        description: "Stunning 5-bedroom villa with panoramic ocean views and private pool.",
        price: "2500000",
        address: "123 Ocean Drive",
        city: "Miami",
        type: "residential",
        bedrooms: 5,
        bathrooms: 6,
        sqft: 4500,
        imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop",
        isFeatured: true
      },
      {
        id: 2,
        title: "Downtown Penthouse",
        description: "Exclusive penthouse in the heart of the city with floor-to-ceiling windows.",
        price: "1800000",
        address: "456 Skyline Ave",
        city: "New York",
        type: "residential",
        bedrooms: 3,
        bathrooms: 3,
        sqft: 2800,
        imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop",
        isFeatured: true
      },
      {
        id: 3,
        title: "Prime Office Space",
        description: "Class A office space in the financial district, ready for occupancy.",
        price: "5000000",
        address: "789 Wall St",
        city: "New York",
        type: "commercial",
        bedrooms: null,
        bathrooms: 4,
        sqft: 10000,
        imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop",
        isFeatured: false
      },
      {
        id: 4,
        title: "Secluded Mountain Retreat",
        description: "Peaceful cabin estate surrounded by nature.",
        price: "1200000",
        address: "321 Pine Rd",
        city: "Aspen",
        type: "residential",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 3200,
        imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop",
        isFeatured: false
      },
      {
        id: 5,
        title: "Luxury Retail Storefront",
        description: "High-traffic retail location in premium shopping district.",
        price: "3000000",
        address: "555 Fashion Blvd",
        city: "Los Angeles",
        type: "commercial",
        bedrooms: null,
        bathrooms: 2,
        sqft: 2000,
        imageUrl: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1600&auto=format&fit=crop",
        isFeatured: true
      },
      {
        id: 6,
        title: "Contemporary Family Home",
        description: "Newly built family home with smart home features and large backyard.",
        price: "950000",
        address: "888 Suburbia Ln",
        city: "Austin",
        type: "residential",
        bedrooms: 4,
        bathrooms: 3,
        sqft: 2500,
        imageUrl: "https://images.unsplash.com/photo-1600596542815-2495db98dada?q=80&w=1600&auto=format&fit=crop",
        isFeatured: false
      }
    ];
    this.contacts = [];
    this.currentId = 1;
  }

  async getListings(filters?: { minPrice?: number; maxPrice?: number; city?: string; type?: string }): Promise<Listing[]> {
    let filtered = [...this.listings];
    
    if (filters) {
      if (filters.minPrice) {
        filtered = filtered.filter(l => Number(l.price) >= filters.minPrice!);
      }
      if (filters.maxPrice) {
        filtered = filtered.filter(l => Number(l.price) <= filters.maxPrice!);
      }
      if (filters.city) {
        filtered = filtered.filter(l => l.city.toLowerCase() === filters.city!.toLowerCase());
      }
      if (filters.type) {
        filtered = filtered.filter(l => l.type === filters.type);
      }
    }
    
    return filtered;
  }

  async getListing(id: number): Promise<Listing | undefined> {
    return this.listings.find(l => l.id === id);
  }

  async submitContact(contact: InsertContact): Promise<void> {
    const id = this.currentId++;
    // In a real app we'd save this, but for this mock we just acknowledge it
    // this.contacts.push({ ...contact, id });
    console.log("Contact submission:", contact);
  }
}

export const storage = new MemStorage();
