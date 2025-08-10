# Render.com Deployment Guide

## Prerequisites

1. **GitHub Repository**: Ensure your code is pushed to a GitHub repository
2. **Render Account**: Sign up at [render.com](https://render.com)
3. **API Keys**: Have your API keys ready:
   - `FINANCIAL_MODELING_API_KEY`
   - `NEWS_API_KEY` (if used)

## Deployment Steps

### 1. Environment Variables Setup
When creating your Render service, add these environment variables:

**Required:**
- `FINANCIAL_MODELING_API_KEY`: Your Financial Modeling Prep API key
- `RAILS_MASTER_KEY`: Copy from `config/master.key` file
- `RAILS_ENV`: `production`
- `NODE_VERSION`: `18.17.0`
- `RUBY_VERSION`: `3.2.2`

**Firebase Configuration (Required):**
- `REACT_APP_FIREBASE_API_KEY`: Your Firebase API key
- `REACT_APP_FIREBASE_MESSAGING_SENDER_ID`: Firebase messaging sender ID
- `REACT_APP_FIREBASE_APP_ID`: Firebase app ID
- `REACT_APP_FIREBASE_MEASUREMENT_ID`: Firebase measurement ID

**Optional:**
- `NEWS_API_KEY`: If using News API
- `WEB_CONCURRENCY`: `1` (for free tier)

### 2. Database Setup
The `render.yaml` file automatically creates a PostgreSQL database. The `DATABASE_URL` will be automatically provided.

### 3. Build Configuration
The deployment uses:
- **Build Command**: `./bin/render-build.sh`
- **Start Command**: `bundle exec puma -C config/puma.rb`

### 4. Deploy via Render Dashboard

1. **Connect Repository**:
   - Go to render.com dashboard
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will detect the `render.yaml` file

2. **Review Settings**:
   - Verify the service name and region
   - Add environment variables in the dashboard
   - Deploy

### 5. Alternative: Manual Service Creation

If not using Blueprint:

1. **Create Web Service**:
   - New + → Web Service
   - Connect GitHub repo
   - Name: `roberthood`
   - Environment: `Ruby`
   - Build Command: `./bin/render-build.sh`
   - Start Command: `bundle exec puma -C config/puma.rb`

2. **Create Database**:
   - New + → PostgreSQL
   - Name: `roberthood`
   - Connect to your web service

## Troubleshooting

### Common Issues:

1. **Build Command Failed (npm error)**:
   - **Symptom**: `==> Running build command 'npm'...` shows npm help instead of running build
   - **Solution**: The render.yaml has been updated with `chmod +x ./bin/render-build.sh && ./bin/render-build.sh`
   - **Cause**: Render wasn't finding/executing the build script properly

2. **Asset Compilation Fails**:
   - Ensure Node.js version is specified
   - Check webpack configuration respects NODE_ENV
   - Verify production build script exists

3. **Development Assets in Production**:
   - **Symptom**: Large bundle sizes, source maps in production  
   - **Solution**: Set NODE_ENV=production in build process
   - **Fix**: Updated webpack.config.js and package.json

4. **Database Connection Issues**:
   - Verify `DATABASE_URL` is set
   - Check database migrations ran successfully

5. **Missing API Keys**:
   - Add all required environment variables
   - Restart service after adding variables

6. **SSL/TLS Issues**:
   - `force_ssl` is disabled in production.rb for Render
   - Render handles SSL termination

### Build Process:
The `bin/render-build.sh` script runs:
1. `bundle install` - Install Ruby gems
2. `npm install` - Install Node.js dependencies (production mode) 
3. `NODE_ENV=production npm run build` - Build webpack assets for production
4. `rails assets:precompile` - Compile Rails assets
5. `rails assets:clean` - Clean old assets
6. `rails db:migrate` - Run database migrations

### Updated Files for Render:
- `render.yaml` - Fixed build command with proper permissions
- `bin/render-build.sh` - Updated to use production environment variables
- `package.json` - Conditional postinstall to avoid development builds
- `webpack.config.js` - Respects NODE_ENV for production builds

### Logs:
Monitor deployment at: Render Dashboard → Your Service → Logs

## Configuration Changes Made

1. **Database**: Updated to use `DATABASE_URL` environment variable
2. **Assets**: Enabled static file serving and asset compilation
3. **SSL**: Disabled force SSL (handled by Render)
4. **Puma**: Enabled worker processes and preload_app
5. **Build Scripts**: Added render-specific build commands

## Post-Deployment

After successful deployment:
1. Visit your Render URL to verify the app loads
2. Test key functionality:
   - **Authentication**: Login with demo user (Demo User button)
   - **Stock Search**: Search for stocks on dashboard
   - **Portfolio**: View portfolio page at `/portfolio`
   - **Banking**: Transfer cash between accounts at `/account/banking`
   - **Firebase Integration**: Verify user data persistence
3. Monitor logs for any runtime errors
4. Set up custom domain (optional)

## Features Available After Deployment

### 🎯 **Core Functionality**
- **User Authentication**: Firebase-based login/signup system
- **Stock Data**: Real-time quotes from Financial Modeling Prep API
- **Dashboard**: Stock search and watchlist management
- **Portfolio Page**: View cash balance and stock holdings
- **Banking**: Transfer money between accounts with live balance updates

### 💰 **Cash Management System**
- **Real-time cash balance** stored in Firebase Realtime Database
- **Transfer functionality** between external bank and Roberthood account
- **Transaction history** logging with timestamps
- **Insufficient funds protection** for withdrawals

### 📊 **Stock Features**
- **Real-time stock quotes** with proper YTD calculation
- **Buy/sell functionality** with portfolio integration
- **Watchlist management** for favorite stocks
- **Stock price charts** and company information

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- Database has 1GB storage limit
- Limited to 512MB RAM per service