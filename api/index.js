// Vercel serverless function wrapper for backend API
// This allows the backend to run as serverless functions on Vercel

import express from 'express';
import cors from 'cors';

const app = express();

// Enable CORS for all routes
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Mock Data (same as backend/server.js)
const SERVICES = [
  {
    id: 's1',
    name: 'General Consultation',
    description: 'A standard check-up to assess your overall health and vitals.',
    durationMinutes: 30,
    price: 50,
    imageUrl: 'https://images.unsplash.com/photo-1666214280557-f1b5022eb634?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 's2',
    name: 'Specialist Referral',
    description: 'Consultation to determine if you need a specialist surgeon or therapy.',
    durationMinutes: 45,
    price: 120,
    imageUrl: 'https://images.unsplash.com/photo-1537368910025-4003508ce487?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  },
  {
    id: 's3',
    name: 'Telehealth Session',
    description: 'Remote video consultation via secure HIPAA-compliant link.',
    durationMinutes: 20,
    price: 40,
    imageUrl: 'https://images.unsplash.com/photo-1576091160550-217358c7db81?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=200&q=80'
  }
];

let MOCK_BOOKINGS = [
  {
    id: 'b1',
    serviceId: 's1',
    serviceName: 'General Consultation',
    date: new Date().toISOString(),
    time: '10:00 AM',
    userDetails: { name: 'John Doe', email: 'john@example.com', phone: '+15550101' },
    status: 'confirmed',
    createdAt: new Date().toISOString()
  }
];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// API Routes
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Backend is running' });
});

app.get('/api/services', async (req, res) => {
  await delay(500);
  res.json(SERVICES);
});

app.get('/api/availability', async (req, res) => {
  await delay(600);
  const { date, serviceId } = req.query;
  
  const slots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '01:00 PM', '01:30 PM', '02:00 PM', 
    '03:30 PM', '04:00 PM'
  ];
  
  const availableSlots = slots
    .filter(() => Math.random() > 0.3)
    .map(time => ({
      time,
      available: true
    }));
  
  res.json(availableSlots);
});

app.post('/api/otp/send', async (req, res) => {
  await delay(800);
  const { phone } = req.body;
  console.log(`[Twilio Verify] Sending SMS OTP to ${phone}: 123456`);
  res.json({ success: true, message: 'OTP sent successfully' });
});

app.post('/api/otp/verify', async (req, res) => {
  await delay(600);
  const { phone, code } = req.body;
  console.log(`[Twilio Verify] Verifying code '${code}' for ${phone}`);
  const isValid = code === '123456' || code.endsWith('6');
  res.json({ success: isValid, verified: isValid });
});

app.post('/api/bookings', async (req, res) => {
  await delay(1000);
  const payload = req.body;
  
  const service = SERVICES.find(s => s.id === payload.service_id) || SERVICES[0];
  const userDetails = {
    name: payload.name || payload.userDetails?.name || payload.user?.name || 'Guest',
    email: payload.email || payload.userDetails?.email || payload.user?.email || 'guest@example.com',
    phone: payload.phone || payload.userDetails?.phone || payload.user?.phone || '0000000000'
  };

  const newBooking = {
    id: `b${Date.now()}`,
    serviceId: service.id,
    serviceName: service.name,
    date: payload.date || new Date().toISOString(),
    time: payload.time || payload.slot_id || '10:00 AM',
    userDetails,
    status: 'confirmed',
    createdAt: new Date().toISOString()
  };
  
  MOCK_BOOKINGS.push(newBooking);
  res.json(newBooking);
});

app.put('/api/bookings/:id/reschedule', async (req, res) => {
  await delay(1000);
  const { id } = req.params;
  const { date, time, slot_id } = req.body;
  
  const index = MOCK_BOOKINGS.findIndex(b => b.id === id);
  if (index !== -1) {
    MOCK_BOOKINGS[index].date = date || MOCK_BOOKINGS[index].date;
    MOCK_BOOKINGS[index].time = time || slot_id || MOCK_BOOKINGS[index].time;
    MOCK_BOOKINGS[index].status = 'confirmed';
    MOCK_BOOKINGS[index].id = `b${Date.now()}`;
    res.json(MOCK_BOOKINGS[index]);
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

app.get('/api/bookings', async (req, res) => {
  await delay(700);
  const { email } = req.query;
  
  if (email) {
    const bookings = MOCK_BOOKINGS.filter(b => 
      b.userDetails.email.toLowerCase().includes(email.toLowerCase())
    );
    res.json(bookings);
  } else {
    res.json(MOCK_BOOKINGS);
  }
});

app.delete('/api/bookings/:id', async (req, res) => {
  await delay(600);
  const { id } = req.params;
  const index = MOCK_BOOKINGS.findIndex(b => b.id === id);
  
  if (index !== -1) {
    MOCK_BOOKINGS[index].status = 'cancelled';
    res.json({ success: true, booking: MOCK_BOOKINGS[index] });
  } else {
    res.status(404).json({ error: 'Booking not found' });
  }
});

// Export for Vercel serverless
export default app;

