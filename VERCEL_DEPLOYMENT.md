# 🚀 Deploy to Vercel - FREE PDF Generation (NO LIMITS!)

## ✨ What's Different in This Version?

Instead of using paid services like PDFShift (50 credits/month), this version uses:
- **@sparticuz/chromium-min**: Free, serverless-optimized Chromium
- **puppeteer-core**: Lightweight Puppeteer for serverless
- **100% FREE**: No API costs, no credit limits!

The only limits are Vercel's:
- **Hobby Plan (FREE)**: 10 seconds execution time
- **Pro Plan ($20/month)**: 60 seconds execution time
- **Unlimited PDF generations** on both plans!

---

## 📋 Prerequisites

1. GitHub account
2. Vercel account (free) - https://vercel.com
3. MongoDB Atlas account (free) - https://cloud.mongodb.com

---

## 🎯 Quick Deployment (5 Minutes)

### Step 1: Push to GitHub

```bash
cd receipt-generator-vercel
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/receipt-generator.git
git push -u origin main
```

### Step 2: Deploy to Vercel

1. Go to https://vercel.com
2. Click "Add New" → "Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Next.js
   - **Root Directory**: `./`
   - **Build Command**: `npm run build`
   - **Output Directory**: `.next`

5. **Add Environment Variable**:
   - Name: `MONGODB_URI`
   - Value: Your MongoDB connection string

6. Click "Deploy"

Wait 2-3 minutes... Done! 🎉

---

## 🔧 MongoDB Atlas Setup

### Step 1: Create Free Cluster

1. Go to https://cloud.mongodb.com
2. Sign up (free)
3. Create new cluster:
   - **Cloud Provider**: AWS
   - **Region**: Choose closest to you
   - **Tier**: M0 Sandbox (FREE)
   - **Cluster Name**: receipt-cluster

### Step 2: Whitelist IP

1. Click "Network Access" (left sidebar)
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere"
4. Click "Confirm"

### Step 3: Create Database User

1. Click "Database Access" (left sidebar)
2. Click "Add New Database User"
3. **Username**: receiptuser
4. **Password**: Click "Autogenerate Secure Password" (copy it!)
5. **Database User Privileges**: Read and write to any database
6. Click "Add User"

### Step 4: Get Connection String

1. Go to "Database" (left sidebar)
2. Click "Connect" button
3. Choose "Connect your application"
4. Copy the connection string:

```
mongodb+srv://receiptuser:<password>@receipt-cluster.xxxxx.mongodb.net/?retryWrites=true&w=majority
```

5. Replace `<password>` with your actual password
6. Add database name before the `?`:

```
mongodb+srv://receiptuser:YOUR_PASSWORD@receipt-cluster.xxxxx.mongodb.net/receipt-generator?retryWrites=true&w=majority
```

### Step 5: Add to Vercel

1. Go to your Vercel project dashboard
2. Click "Settings" → "Environment Variables"
3. Add variable:
   - **Name**: `MONGODB_URI`
   - **Value**: Your full connection string
   - **Environment**: Production, Preview, Development (all)
4. Click "Save"
5. Redeploy: "Deployments" → Latest → "..." → "Redeploy"

---

## 🧪 Testing Your Deployment

1. Open your Vercel URL: `https://your-app.vercel.app`
2. Fill out the receipt form
3. Click "Generate Receipt"
4. Click "Download PDF & Save"
5. PDF downloads AND saves to MongoDB! ✅

---

## 💰 Cost Breakdown

### FREE Option (What We're Using):
- **Vercel Hobby**: FREE
  - 100GB bandwidth/month
  - 100 deployments/day
  - 10s serverless function timeout
  - **Unlimited PDF generations!**

- **MongoDB Atlas M0**: FREE
  - 512 MB storage
  - Shared RAM
  - ~100 receipts per MB
  - **= ~50,000 receipts FREE!**

**Total Monthly Cost: $0** 🎉

### Upgrade If Needed:
- **Vercel Pro ($20/month)**:
  - 1TB bandwidth
  - 60s timeout (for complex PDFs)
  - 100 deployments/day

- **MongoDB Atlas M10 ($57/month)**:
  - 10GB storage
  - Dedicated 2GB RAM
  - Auto-scaling

---

## 🔍 How It Works

### Development (Local):
```javascript
// Uses regular Puppeteer
const browser = await puppeteer.launch({
  headless: 'new',
  args: ['--no-sandbox']
});
```

### Production (Vercel):
```javascript
// Uses chromium-min (lightweight, serverless-optimized)
const browser = await puppeteer.launch({
  args: chromium.args,
  executablePath: await chromium.executablePath(
    'https://github.com/Sparticuz/chromium/releases/download/v129.0.0/chromium-v129.0.0-pack.tar'
  ),
  headless: chromium.headless
});
```

The code automatically detects the environment and uses the right Chromium!

---

## ⚡ Performance Tips

### 1. Increase Function Timeout (Vercel Pro)

In `vercel.json`:
```json
{
  "functions": {
    "src/app/api/generate-pdf/route.js": {
      "memory": 1024,
      "maxDuration": 60
    }
  }
}
```

### 2. Optimize HTML for Faster Generation

- Keep images small
- Minimize inline CSS
- Use web-safe fonts

### 3. Add Caching (Optional)

```javascript
// In your API route
const cacheKey = `receipt-${receiptNo}`;
// Check cache first, generate if not found
```

---

## 🐛 Troubleshooting

### Error: "Function timeout"

**Solution**: 
- Upgrade to Vercel Pro for 60s timeout
- OR simplify your PDF template

### Error: "Memory limit exceeded"

**Solution**:
Increase memory in `vercel.json`:
```json
{
  "functions": {
    "src/app/api/generate-pdf/route.js": {
      "memory": 3008
    }
  }
}
```

### Error: "MongoDB connection failed"

**Solutions**:
1. Check if IP is whitelisted (`0.0.0.0/0` for testing)
2. Verify connection string in environment variables
3. Check MongoDB Atlas cluster is running
4. Wait 2-3 minutes after making network changes

### PDF Missing Styles

**Solution**: 
All styles are inline in the HTML template - this is already handled!

---

## 📊 Monitoring

### Check Logs in Vercel:
1. Go to your project dashboard
2. Click "Deployments"
3. Click on latest deployment
4. Click "Functions" tab
5. Click on your function
6. View real-time logs

### MongoDB Monitoring:
1. MongoDB Atlas dashboard
2. Click "Metrics" tab
3. Monitor:
   - Connections
   - Operations
   - Storage usage

---

## 🎯 Production Checklist

- [ ] MongoDB IP whitelist configured
- [ ] Environment variables set in Vercel
- [ ] Test PDF generation on production URL
- [ ] Test MongoDB save functionality
- [ ] Monitor function execution time
- [ ] Check storage usage in MongoDB
- [ ] Set up error monitoring (optional)

---

## 🚀 Going Beyond Free Tier

When you outgrow the free tier:

### High Volume (1000+ PDFs/day)?
- Upgrade to Vercel Pro: $20/month
- Consider MongoDB Atlas M10: $57/month
- Add Redis caching for frequently generated receipts

### Enterprise Needs?
- Vercel Enterprise: Custom pricing
- MongoDB Atlas dedicated cluster
- Add CDN for PDF delivery

---

## 🆚 Comparison: This vs PDFShift

| Feature | This Solution | PDFShift |
|---------|---------------|----------|
| Monthly Cost | **$0** | $0 (50 PDFs) then $29+ |
| PDF Limit | **Unlimited*** | 50 free, then paid |
| Execution Time | 10s (free) / 60s (pro) | Variable |
| Setup Time | 5 minutes | 2 minutes |
| Customization | **Full control** | Limited |
| Database | **Included** | Separate |

*Subject to Vercel's fair use policy

---

## ✅ Summary

You now have a **100% FREE** receipt generator with:
- ✅ Unlimited PDF generations (fair use)
- ✅ MongoDB database storage
- ✅ Professional A4 receipts
- ✅ Auto-deployment via GitHub
- ✅ No API fees ever
- ✅ Scales automatically

**Your total monthly cost: $0**

Upgrade only when you need more timeout or storage!

---

## 📞 Need Help?

Common issues are in the troubleshooting section above. 

For Vercel-specific issues:
- https://vercel.com/docs
- https://vercel.com/support

For MongoDB issues:
- https://www.mongodb.com/docs/atlas/
- https://www.mongodb.com/community/forums/

Happy deploying! 🎉
