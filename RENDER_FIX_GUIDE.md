# Fix Render Deployment - Manual Dashboard Configuration

## Current Problem
Your deployment is failing because Render is running `npm` instead of your custom build script. This indicates Render is not using the Blueprint configuration from `render.yaml`.

## Solution: Update Build Command Manually

### Step 1: Go to Render Dashboard
1. Visit your Render dashboard: https://dashboard.render.com
2. Click on your `roberthood` web service

### Step 2: Update Build Settings
1. Click **Settings** tab in your service dashboard
2. Scroll down to **Build & Deploy** section
3. Find **Build Command** field
4. **Replace** the current build command with:
   ```bash
   ./build.sh
   ```

### Step 3: Update Start Command (if needed)
1. In the same **Build & Deploy** section
2. Find **Start Command** field  
3. **Ensure** it says:
   ```bash
   bundle exec puma -C config/puma.rb
   ```

### Step 4: Environment Variables
Make sure these environment variables are set:
1. Go to **Environment** tab
2. Add/verify these variables:
   - `RAILS_MASTER_KEY`: Copy value from your `config/master.key` file
   - `FINANCIAL_MODELING_API_KEY`: Your Financial Modeling Prep API key
   - `RAILS_ENV`: `production`
   - `NODE_ENV`: `production`

### Step 5: Manual Deploy
1. Click **Manual Deploy** button
2. Select **Deploy latest commit**
3. Wait for deployment to complete

## Alternative: Delete and Recreate Service

If the above doesn't work, try this:

### Option A: Use Blueprint (Recommended)
1. **Delete** current service from Render dashboard
2. Create new service: **New** → **Blueprint** 
3. Connect your GitHub repository
4. Render should detect `render.yaml` automatically
5. Review settings and deploy

### Option B: Manual Service Creation
1. **Delete** current service
2. Create new service: **New** → **Web Service**
3. Connect GitHub repository
4. Set these manually:
   - **Name**: `roberthood`
   - **Environment**: `Ruby`
   - **Build Command**: `./build.sh`
   - **Start Command**: `bundle exec puma -C config/puma.rb`
   - **Plan**: Free

## Build Script Contents
The `build.sh` script contains:
```bash
#!/usr/bin/env bash
set -o errexit

# Install dependencies
bundle install
npm install

# Build production assets
NODE_ENV=production npm run build

# Precompile Rails assets  
RAILS_ENV=production bundle exec rails assets:precompile
RAILS_ENV=production bundle exec rails assets:clean

# Run migrations
RAILS_ENV=production bundle exec rails db:migrate
```

## Expected Success Output
After fixing, your build log should show:
```
==> Running build command './build.sh'...
==> Starting custom build process
==> Installing Ruby gems
==> Installing Node.js packages  
==> Building production assets with webpack
==> Precompiling Rails assets
==> Cleaning old assets
==> Running database migrations
==> Build process completed successfully
```

## Verification
Once deployed successfully:
1. Visit your Render URL
2. Check that the app loads
3. Test login/signup functionality
4. Verify stock search works

## Common Issues After Fix
- **Database not connected**: Ensure PostgreSQL database is created and `DATABASE_URL` is set
- **Missing API keys**: Add `FINANCIAL_MODELING_API_KEY` to environment variables  
- **Assets not loading**: Check that `RAILS_ENV=production` and assets compiled correctly