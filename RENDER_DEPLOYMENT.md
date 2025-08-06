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

1. **Asset Compilation Fails**:
   - Ensure Node.js version is specified
   - Check webpack configuration

2. **Database Connection Issues**:
   - Verify `DATABASE_URL` is set
   - Check database migrations ran successfully

3. **Missing API Keys**:
   - Add all required environment variables
   - Restart service after adding variables

4. **SSL/TLS Issues**:
   - `force_ssl` is disabled in production.rb for Render
   - Render handles SSL termination

### Build Process:
The `bin/render-build.sh` script runs:
1. `bundle install` - Install Ruby gems
2. `npm install` - Install Node.js dependencies  
3. `rails assets:precompile` - Compile assets
4. `rails assets:clean` - Clean old assets
5. `rails db:migrate` - Run database migrations

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
2. Test key functionality (login, stock search, etc.)
3. Monitor logs for any runtime errors
4. Set up custom domain (optional)

## Free Tier Limitations

- Services spin down after 15 minutes of inactivity
- Database has 1GB storage limit
- Limited to 512MB RAM per service