# Quick Setup Guide

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)
```bash
npm install
```

### Step 2: Setup MongoDB (2 minutes)

1. Go to https://cloud.mongodb.com
2. Sign up (free)
3. Create cluster (M0 - Free)
4. Click "Connect" → "Connect your application"
5. Copy connection string

### Step 3: Configure Environment (1 minute)

Create `.env.local`:
```
MONGODB_URI=your_connection_string_here
```

### Step 4: Run
```bash
npm run dev
```

Open http://localhost:3000

## First Receipt Test

Fill the form:
- Name: KHANDOBA TOURS AND TRAVELS
- Address: KURNUR P O, KURNUR, PO:KURNOOR
- Amount: 300000
- Proprietor: SAVITA SANJAY GAVALI
- Model: ERTIGA VXI CNG (White)

Click "Generate Receipt" → "Download PDF & Save"

✅ Done! Your receipt is saved in MongoDB and downloaded as PDF.

## Production Build

```bash
npm run build
npm start
```

## Common Issues

**MongoDB connection failed?**
- Check your IP is whitelisted in Atlas
- Verify connection string format

**Puppeteer error?**
```bash
npm install puppeteer --force
```

**Port 3000 in use?**
```bash
PORT=3001 npm run dev
```
