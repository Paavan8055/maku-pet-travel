# 🚀 MAKU Travel Platform - Production Deployment Guide

## 📋 Pre-Deployment Checklist

### Required Accounts & Services
- [ ] Hotel Beds API Account
- [ ] Amadeus API Account
- [ ] Stripe Account (Live Mode)
- [ ] SendGrid Account
- [ ] Google Cloud Platform (for Maps API)
- [ ] Netlify or Vercel Account
- [ ] Domain Registrar Account

---

## 🏨 **STEP 1: Hotel Beds API Setup**

### 1.1 Create Hotel Beds Account
1. Visit [Hotel Beds Partner Hub](https://developer.hotelbeds.com/)
2. Click "Register" and create a developer account
3. Complete business verification process
4. Request production API access

### 1.2 Obtain API Credentials
```bash
# You'll receive these credentials:
HOTELBEDS_HOTELS_API_KEY=your_production_api_key
HOTELBEDS_HOTELS_SECRET=your_production_secret
HOTELBEDS_ACTIVITIES_API_KEY=your_activities_key
HOTELBEDS_ACTIVITIES_SECRET=your_activities_secret
HOTELBEDS_TRANSFERS_API_KEY=your_transfers_key
HOTELBEDS_TRANSFERS_SECRET=your_transfers_secret
```

### 1.3 Test API Access
```bash
# Test endpoint (replace with your credentials):
curl -X GET "https://api.test.hotelbeds.com/hotel-api/1.0/hotels" \
  -H "Api-key: YOUR_API_KEY" \
  -H "X-Signature: YOUR_SIGNATURE"
```

---

## ✈️ **STEP 2: Amadeus API Setup**

### 2.1 Create Amadeus Account
1. Visit [Amadeus for Developers](https://developers.amadeus.com/)
2. Sign up for a developer account
3. Create a new application
4. Request production access

### 2.2 Obtain API Credentials
```bash
# You'll receive these credentials:
AMADEUS_API_KEY=your_production_api_key
AMADEUS_API_SECRET=your_production_secret
```

### 2.3 Test API Access
```bash
# Test authentication:
curl -X POST "https://api.amadeus.com/v1/security/oauth2/token" \
  -H "Content-Type: application/x-www-form-urlencoded" \
  -d "grant_type=client_credentials&client_id=YOUR_API_KEY&client_secret=YOUR_SECRET"
```

---

## 💳 **STEP 3: Stripe Payment Setup**

### 3.1 Activate Stripe Live Mode
1. Log into your [Stripe Dashboard](https://dashboard.stripe.com/)
2. Complete business verification
3. Switch to "Live" mode (toggle in sidebar)
4. Obtain live API keys

### 3.2 Configure API Keys
```bash
# Live Stripe credentials:
STRIPE_SECRET_KEY=sk_live_your_live_secret_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_live_publishable_key
STRIPE_WEBHOOK_SECRET=whsec_your_webhook_secret
```

### 3.3 Set Up Webhooks
1. In Stripe Dashboard → Developers → Webhooks
2. Add endpoint: `https://yourdomain.com/api/webhooks/stripe`
3. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
4. Copy webhook signing secret

---

## 📧 **STEP 4: SendGrid Email Setup**

### 4.1 Create SendGrid Account
1. Visit [SendGrid](https://sendgrid.com/)
2. Sign up for account
3. Verify your domain
4. Create API key

### 4.2 Configure Email Settings
```bash
# SendGrid credentials:
SENDGRID_API_KEY=SG.your_sendgrid_api_key
FROM_EMAIL=noreply@yourdomain.com
SUPPORT_EMAIL=support@yourdomain.com
```

### 4.3 Domain Authentication
1. SendGrid → Settings → Sender Authentication
2. Authenticate your domain
3. Add DNS records provided by SendGrid

---

## 🗺️ **STEP 5: Google Maps API Setup**

### 5.1 Create Google Cloud Project
1. Visit [Google Cloud Console](https://console.cloud.google.com/)
2. Create new project
3. Enable Maps JavaScript API
4. Create API key

### 5.2 Configure Maps API
```bash
# Google Maps credentials:
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
```

### 5.3 Restrict API Key
1. In Google Cloud Console → APIs & Services → Credentials
2. Edit your API key
3. Add HTTP referrer restrictions: `https://yourdomain.com/*`

---

## 🌐 **STEP 6: Domain & SSL Setup**

### 6.1 Purchase Domain
1. Choose domain registrar (Namecheap, GoDaddy, etc.)
2. Purchase your domain (e.g., `makutravel.com`)
3. Access DNS management

### 6.2 SSL Certificate
- Netlify/Vercel provide free SSL automatically
- For custom hosting, use Let's Encrypt or Cloudflare

---

## 🚀 **STEP 7: Deploy to Production**

### Option A: Deploy to Netlify

#### 7.1 Connect Repository
1. Log into [Netlify](https://netlify.com/)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Set build settings:
   ```bash
   Build command: npm run build
   Publish directory: .next
   ```

#### 7.2 Configure Environment Variables
In Netlify Dashboard → Site Settings → Environment Variables:
```bash
NODE_ENV=production
NEXT_TELEMETRY_DISABLED=1
HOTELBEDS_HOTELS_API_KEY=your_key
HOTELBEDS_HOTELS_SECRET=your_secret
AMADEUS_API_KEY=your_key
AMADEUS_API_SECRET=your_secret
STRIPE_SECRET_KEY=sk_live_your_key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_your_key
SENDGRID_API_KEY=SG.your_key
FROM_EMAIL=noreply@yourdomain.com
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_maps_key
```

#### 7.3 Custom Domain Setup
1. Netlify Dashboard → Domain Management
2. Add custom domain: `yourdomain.com`
3. Update DNS records at your registrar:
   ```bash
   CNAME www your-site-name.netlify.app
   A @ 75.2.60.5
   ```

### Option B: Deploy to Vercel

#### 7.1 Connect Repository
1. Log into [Vercel](https://vercel.com/)
2. Import your GitHub repository
3. Configure project settings

#### 7.2 Environment Variables
In Vercel Dashboard → Project Settings → Environment Variables:
```bash
# Add all the same environment variables as above
```

#### 7.3 Custom Domain
1. Vercel Dashboard → Domains
2. Add your custom domain
3. Configure DNS as instructed

---

## 📧 **STEP 8: Email Templates Setup**

### 8.1 Create Email Templates
I'll create professional email templates for you in the next step.

### 8.2 Test Email Delivery
```bash
# Test booking confirmation email
curl -X POST "https://yourdomain.com/api/test-email" \
  -H "Content-Type: application/json" \
  -d '{"email":"your-test@email.com","bookingId":"TEST123"}'
```

---

## ✅ **STEP 9: Production Testing**

### 9.1 Test Checklist
- [ ] Homepage loads correctly
- [ ] Hotel search returns live data
- [ ] Payment processing works with test cards
- [ ] Email confirmations send successfully
- [ ] Maps display hotel locations
- [ ] All pages load on mobile devices
- [ ] SSL certificate is active
- [ ] Custom domain resolves correctly

### 9.2 Test Payment Cards
```bash
# Stripe test cards for production testing:
4242424242424242 - Visa (Success)
4000000000000002 - Visa (Declined)
4000000000009995 - Visa (Insufficient funds)
```

---

## 🔒 **STEP 10: Security & Monitoring**

### 10.1 Security Headers
Already configured in netlify.toml:
- HTTPS enforcement
- CORS configuration
- API rate limiting

### 10.2 Monitoring Setup
1. Set up Stripe webhooks monitoring
2. Configure SendGrid delivery monitoring
3. Set up Google Analytics (optional)
4. Monitor API usage limits

---

## 📞 **Support Contacts**

### API Support
- **Hotel Beds**: partner-solutions@hotelbeds.com
- **Amadeus**: developers@amadeus.com
- **Stripe**: support@stripe.com
- **SendGrid**: support@sendgrid.com
- **Google Maps**: Google Cloud Support

### Platform Support
- **Netlify**: support@netlify.com
- **Vercel**: support@vercel.com

---

## 🎯 **Go-Live Checklist**

- [ ] All API keys configured and tested
- [ ] Payment processing tested with live mode
- [ ] Email confirmations working
- [ ] Custom domain configured with SSL
- [ ] All environment variables set
- [ ] Production deployment successful
- [ ] End-to-end booking flow tested
- [ ] Mobile responsiveness verified
- [ ] Error handling tested
- [ ] Legal pages updated (Terms, Privacy)

**Once all items are checked, your MAKU Travel Platform is ready for public launch! 🎉**
