export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Content-Type', 'application/json');
  
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  
  if (req.method === 'POST') {
    return res.status(200).json({ 
      success: true, 
      message: "Thank you for contacting us! We will get back to you soon." 
    });
  }
  
  return res.status(405).json({ message: 'Method not allowed' });
}
