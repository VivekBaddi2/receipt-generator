# Deployment Guide

## Overview

This receipt generator can be deployed to various platforms. This guide covers the most common deployment scenarios.

---

## 🚀 Option 1: Local Production Server

### Requirements
- Node.js 18+
- 2GB+ RAM
- MongoDB Atlas account

### Steps

1. **Build the application**
```bash
npm run build
```

2. **Start production server**
```bash
npm start
```

The app will run on http://localhost:3000

3. **Keep it running** (Linux/Mac)
```bash
# Using PM2
npm install -g pm2
pm2 start npm --name "receipt-generator" -- start
pm2 save
pm2 startup
```

---

## ☁️ Option 2: Vercel Deployment

**⚠️ Important**: Vercel has limitations with Puppeteer. Consider alternatives below.

### Quick Deploy

1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variable:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string
5. Deploy

### Puppeteer Alternative on Vercel

Replace Puppeteer with a cloud PDF service:

**Option A: Use PDFShift API**
```javascript
// In src/lib/pdf.js
const response = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
  method: 'POST',
  headers: {
    'Authorization': `Basic ${Buffer.from('api:' + process.env.PDFSHIFT_API_KEY).toString('base64')}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    source: htmlContent,
    landscape: false,
    use_print: true
  })
});
```

**Option B: Use Puppeteer on Railway/Render instead**

---

## 🚂 Option 3: Railway Deployment (Recommended)

Railway supports Puppeteer out of the box.

### Steps

1. Go to [railway.app](https://railway.app)
2. Sign up with GitHub
3. Click "New Project" → "Deploy from GitHub repo"
4. Select your repository
5. Add environment variable:
   - `MONGODB_URI`: Your connection string
6. Deploy

Railway will automatically:
- Detect Next.js
- Install Puppeteer dependencies
- Deploy your app

### Custom Start Command (if needed)
```bash
npm run build && npm start
```

---

## 🎨 Option 4: Render Deployment

Render also supports Puppeteer.

### Steps

1. Go to [render.com](https://render.com)
2. Create new "Web Service"
3. Connect GitHub repository
4. Configure:
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Environment**: Node
5. Add environment variable:
   - Key: `MONGODB_URI`
   - Value: Your connection string
6. Deploy

---

## 🐳 Option 5: Docker Deployment

### Dockerfile

```dockerfile
FROM node:18-alpine

# Install Chromium for Puppeteer
RUN apk add --no-cache \
    chromium \
    nss \
    freetype \
    harfbuzz \
    ca-certificates \
    ttf-freefont

# Tell Puppeteer to use installed Chromium
ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium-browser

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy source code
COPY . .

# Build Next.js
RUN npm run build

# Expose port
EXPOSE 3000

# Start application
CMD ["npm", "start"]
```

### docker-compose.yml

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - NODE_ENV=production
    restart: unless-stopped
```

### Deploy

```bash
# Build image
docker build -t receipt-generator .

# Run container
docker run -p 3000:3000 -e MONGODB_URI="your_uri" receipt-generator

# Or use docker-compose
docker-compose up -d
```

---

## 🖥️ Option 6: VPS Deployment (DigitalOcean, Linode, etc.)

### Ubuntu 22.04 Setup

1. **SSH into your VPS**
```bash
ssh root@your-server-ip
```

2. **Install Node.js**
```bash
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs
```

3. **Install Chromium (for Puppeteer)**
```bash
sudo apt-get install -y chromium-browser
```

4. **Install PM2**
```bash
sudo npm install -g pm2
```

5. **Clone your repository**
```bash
git clone https://github.com/yourusername/receipt-generator.git
cd receipt-generator
```

6. **Install dependencies**
```bash
npm install
```

7. **Create .env.local**
```bash
nano .env.local
# Add: MONGODB_URI=your_connection_string
```

8. **Build and start**
```bash
npm run build
pm2 start npm --name "receipt-app" -- start
pm2 save
pm2 startup
```

9. **Setup Nginx (optional)**
```bash
sudo apt install nginx

sudo nano /etc/nginx/sites-available/receipt-generator
```

Nginx config:
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/receipt-generator /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

10. **SSL with Let's Encrypt**
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

---

## 📊 Performance Optimization

### 1. Enable Caching
```javascript
// In next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
}
```

### 2. Optimize Images
Use Next.js Image component for any future images.

### 3. Database Connection Pooling
Already implemented in `src/lib/mongodb.js`

### 4. PDF Generation Optimization
```javascript
// In src/lib/pdf.js
const browser = await puppeteer.launch({
  headless: 'new',
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',  // Important for low-memory VPS
    '--disable-gpu',
  ],
});
```

---

## 🔒 Security Checklist

- [ ] Use HTTPS in production
- [ ] Set secure environment variables
- [ ] Enable CORS only for trusted domains
- [ ] Implement rate limiting for API routes
- [ ] Validate all user inputs
- [ ] Use MongoDB IP whitelist
- [ ] Regular security updates: `npm audit fix`
- [ ] Enable MongoDB audit logs
- [ ] Use read-only database users where possible

---

## 📈 Monitoring

### Add Basic Logging
```javascript
// In API routes
console.log(`[${new Date().toISOString()}] Receipt generated: ${receiptNo}`);
```

### Health Check Endpoint
Create `src/app/api/health/route.js`:
```javascript
export async function GET() {
  return Response.json({ status: 'ok', timestamp: new Date().toISOString() });
}
```

### Monitor with Uptime Robot
- Add your URL to [uptimerobot.com](https://uptimerobot.com)
- Monitor /api/health endpoint
- Get alerts if site goes down

---

## 🆘 Troubleshooting Deployment

### Issue: Puppeteer fails on deployment

**Solution**: Install Chromium dependencies
```bash
# Ubuntu/Debian
sudo apt-get install -y \
  chromium-browser \
  fonts-liberation \
  libasound2 \
  libatk-bridge2.0-0 \
  libatk1.0-0 \
  libcups2 \
  libdbus-1-3 \
  libgdk-pixbuf2.0-0 \
  libnspr4 \
  libnss3 \
  libx11-xcb1 \
  libxcomposite1 \
  libxdamage1 \
  libxrandr2 \
  libxss1 \
  libxtst6
```

### Issue: MongoDB connection timeout

**Solution**: 
1. Whitelist deployment server IP in MongoDB Atlas
2. Check connection string format
3. Verify network access rules

### Issue: Port already in use

**Solution**:
```bash
# Kill process on port 3000
npx kill-port 3000

# Or change port
PORT=3001 npm start
```

### Issue: Build fails

**Solution**:
```bash
# Clear cache and rebuild
rm -rf .next node_modules
npm install
npm run build
```

---

## 🎯 Recommended Setup

For production, we recommend:

1. **Hosting**: Railway or Render (Puppeteer support)
2. **Database**: MongoDB Atlas (Free tier)
3. **Domain**: Namecheap or Google Domains
4. **SSL**: Automatic (Railway/Render)
5. **Monitoring**: UptimeRobot (Free)

**Total Cost**: $0 - $5/month (depending on traffic)

---

## 📞 Support

If you encounter deployment issues:
1. Check server logs
2. Verify environment variables
3. Test MongoDB connection
4. Review this guide
5. Check platform-specific documentation
