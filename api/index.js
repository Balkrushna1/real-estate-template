// API Routes - Vercel Serverless Function
const listings = [
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

module.exports = async (req, res) => {
  try {
    // Enable CORS
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');
    
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    const { url = '', method = 'GET' } = req;
    
    console.log('API Request:', method, url);
    
    // Parse URL to get path and query params
    const urlParts = url.split('?');
    const path = urlParts[0];
    const queryString = urlParts[1] || '';
    const queryParams = {};
    
    if (queryString) {
      queryString.split('&').forEach(param => {
        const [key, value] = param.split('=');
        if (key && value) {
          queryParams[decodeURIComponent(key)] = decodeURIComponent(value);
        }
      });
    }
    
    // GET /api/listings/:id
    if (path.match(/^\/api\/listings\/\d+$/) && method === 'GET') {
      const id = parseInt(path.split('/').pop());
      const listing = listings.find(l => l.id === id);
      if (!listing) {
        res.status(404).json({ message: "Listing not found" });
        return;
      }
      res.status(200).json(listing);
      return;
    }
    
    // GET /api/listings with filters
    if (path === '/api/listings' && method === 'GET') {
      const { minPrice, maxPrice, city, type } = queryParams;
      
      let filtered = [...listings];
      
      if (minPrice) {
        filtered = filtered.filter(l => Number(l.price) >= Number(minPrice));
      }
      if (maxPrice) {
        filtered = filtered.filter(l => Number(l.price) <= Number(maxPrice));
      }
      if (city) {
        filtered = filtered.filter(l => l.city.toLowerCase() === city.toLowerCase());
      }
      if (type) {
        filtered = filtered.filter(l => l.type === type);
      }
      
      console.log('Returning', filtered.length, 'listings');
      res.status(200).json(filtered);
      return;
    }
    
    // POST /api/contact
    if (path === '/api/contact' && method === 'POST') {
      console.log("Contact submission:", req.body);
      res.status(200).json({ 
        success: true, 
        message: "Thank you for contacting us! We will get back to you soon." 
      });
      return;
    }
    
    res.status(404).json({ message: 'API endpoint not found', path, method });
  } catch (error) {
    console.error('API Error:', error);
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};
