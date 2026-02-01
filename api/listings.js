export default function handler(req, res) {
  const listings = [
    { id: 1, title: "Modern Luxury Villa", description: "Stunning 5-bedroom villa with panoramic ocean views and private pool.", price: "2500000", address: "123 Ocean Drive", city: "Miami", type: "residential", bedrooms: 5, bathrooms: 6, sqft: 4500, imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=1600&auto=format&fit=crop", isFeatured: true },
    { id: 2, title: "Downtown Penthouse", description: "Exclusive penthouse in the heart of the city with floor-to-ceiling windows.", price: "1800000", address: "456 Skyline Ave", city: "New York", type: "residential", bedrooms: 3, bathrooms: 3, sqft: 2800, imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=1600&auto=format&fit=crop", isFeatured: true },
    { id: 3, title: "Prime Office Space", description: "Class A office space in the financial district, ready for occupancy.", price: "5000000", address: "789 Wall St", city: "New York", type: "commercial", bedrooms: null, bathrooms: 4, sqft: 10000, imageUrl: "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1600&auto=format&fit=crop", isFeatured: false },
    { id: 4, title: "Secluded Mountain Retreat", description: "Peaceful cabin estate surrounded by nature.", price: "1200000", address: "321 Pine Rd", city: "Aspen", type: "residential", bedrooms: 4, bathrooms: 3, sqft: 3200, imageUrl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?q=80&w=1600&auto=format&fit=crop", isFeatured: false },
    { id: 5, title: "Luxury Retail Storefront", description: "High-traffic retail location in premium shopping district.", price: "3000000", address: "555 Fashion Blvd", city: "Los Angeles", type: "commercial", bedrooms: null, bathrooms: 2, sqft: 2000, imageUrl: "https://images.unsplash.com/photo-1556740714-a8395b3bf30f?q=80&w=1600&auto=format&fit=crop", isFeatured: true },
    { id: 6, title: "Contemporary Family Home", description: "Newly built family home with smart home features and large backyard.", price: "950000", address: "888 Suburbia Ln", city: "Austin", type: "residential", bedrooms: 4, bathrooms: 3, sqft: 2500, imageUrl: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1600&auto=format&fit=crop", isFeatured: false }
  ];

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { query } = req;
  const { minPrice, maxPrice, city, type, id } = query;
  
  // If ID is provided, return single listing
  if (id) {
    const listing = listings.find(l => l.id === parseInt(id));
    if (!listing) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(listing);
  }
  
  // Filter listings
  let result = [...listings];
  
  if (minPrice) result = result.filter(l => Number(l.price) >= Number(minPrice));
  if (maxPrice) result = result.filter(l => Number(l.price) <= Number(maxPrice));
  if (city) result = result.filter(l => l.city.toLowerCase() === city.toLowerCase());
  if (type) result = result.filter(l => l.type === type);
  
  return res.status(200).json(result);
}
