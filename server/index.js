import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://aerosky:Dev%40878545@cluster0.nruh4wz.mongodb.net/aerosky?retryWrites=true&w=majority&appName=Cluster0';

// Middleware
app.use(cors({
  origin: "*", 
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
}));
app.use(express.json());

// Database Connection
mongoose.connect(MONGO_URI)
  .then(() => console.log('Connected to Database'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- MODELS ---

const ApplicationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  phone: String,
  role: String,
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});
const Application = mongoose.model('Application', ApplicationSchema);

const ClientSchema = new mongoose.Schema({
  name: String,
  phone: String,
  email: String,
  totalEvents: { type: Number, default: 0 },
  totalSpent: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});
const Client = mongoose.model('Client', ClientSchema);

const StaffSchema = new mongoose.Schema({
  name: String,
  role: String,
  assignedEvent: String,
  paid: { type: Number, default: 0 },
  balance: { type: Number, default: 0 }
});
const Staff = mongoose.model('Staff', StaffSchema);

const EventSchema = new mongoose.Schema({
  name: String,
  client: String,
  date: String,
  venue: String,
  manager: String,
  staffCount: { type: Number, default: 0 },
  status: { type: String, default: 'Upcoming' },
  createdAt: { type: Date, default: Date.now }
});
const Event = mongoose.model('Event', EventSchema);

// --- ROUTES ---

// Applications
app.get('/api/applications', async (req, res) => {
  const apps = await Application.find();
  res.json(apps);
});

app.post('/api/applications', async (req, res) => {
  const newApp = new Application(req.body);
  await newApp.save();
  res.json(newApp);
});

app.put('/api/applications/:id', async (req, res) => {
  const updatedApp = await Application.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedApp);
});

app.delete('/api/applications/:id', async (req, res) => {
  await Application.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Clients
app.get('/api/clients', async (req, res) => {
  const clients = await Client.find();
  res.json(clients);
});

app.post('/api/clients', async (req, res) => {
  const newClient = new Client(req.body);
  await newClient.save();
  res.json(newClient);
});

// Staff
app.get('/api/staff', async (req, res) => {
  const staff = await Staff.find();
  res.json(staff);
});

app.put('/api/staff/:id', async (req, res) => {
  const updatedStaff = await Staff.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedStaff);
});

// Events
app.get('/api/events', async (req, res) => {
  const events = await Event.find();
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const newEvent = new Event(req.body);
  await newEvent.save();
  res.json(newEvent);
});

app.put('/api/events/:id', async (req, res) => {
  const updatedEvent = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedEvent);
});

// --- SEED DATA FUNCTION ---
const seedData = async () => {
  try {
    const appCount = await Application.countDocuments();
    if (appCount === 0) {
      await Application.create([
        { firstName: 'Rahul', lastName: 'K.', phone: '+91 99999 11111', role: 'Waiter', status: 'Pending' },
        { firstName: 'Priya', lastName: 'S.', phone: '+91 99999 22222', role: 'Host', status: 'Approved' }
      ]);
    }

    const clientCount = await Client.countDocuments();
    if (clientCount === 0) {
      await Client.create([
        { name: 'Rahul Sharma', phone: '+91 98765 43210', email: 'rahul@example.com', totalSpent: 15.5 },
        { name: 'TechCorp Pvt Ltd', phone: '011-22334455', email: 'hr@techcorp.in', totalSpent: 32.0 }
      ]);
    }

    const staffCount = await Staff.countDocuments();
    if (staffCount === 0) {
      await Staff.create([
        { name: 'Amit Mehta', role: 'Loader', paid: 1000, balance: 800 },
        { name: 'Karan J.', role: 'Waiter', paid: 500, balance: 1200 }
      ]);
    }

    const eventCount = await Event.countDocuments();
    if (eventCount === 0) {
      await Event.create([
        { name: 'Grand Wedding', client: 'Rahul Sharma', date: '2026-06-15', venue: 'The Leela, Delhi', manager: 'Amit M.', status: 'Upcoming' },
        { name: 'Corporate Gala', client: 'TechCorp', date: '2026-07-02', venue: 'ITC Maurya', manager: 'Karan J.', status: 'Upcoming' }
      ]);
    }
    console.log('Database seeded with initial records.');
  } catch (err) {
    console.error('Seeding error:', err);
  }
};

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedData();
});
