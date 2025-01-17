#!/bin/bash

# Install Certbot and Nginx plugin if not already installed
sudo apt update
sudo apt install -y certbot python3-certbot-nginx

# Stop Nginx temporarily
sudo systemctl stop nginx

# Get SSL certificates using Let's Encrypt's certbot
echo "Getting SSL certificate for csmcl.space..."
sudo certbot certonly --standalone \
    -d csmcl.space \
    -d www.csmcl.space \
    --non-interactive \
    --agree-tos \
    --register-unsafely-without-email \
    --preferred-challenges http

echo "Getting SSL certificate for cosmical.me..."
sudo certbot certonly --standalone \
    -d cosmical.me \
    -d www.cosmical.me \
    --non-interactive \
    --agree-tos \
    --register-unsafely-without-email \
    --preferred-challenges http

# Update Nginx configurations to use SSL
echo "Updating Nginx configurations..."

# Update csmcl.space configuration
sudo tee /etc/nginx/sites-available/csmcl.space << 'EOF'
server {
    listen 80;
    server_name csmcl.space www.csmcl.space;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name csmcl.space www.csmcl.space;

    ssl_certificate /etc/letsencrypt/live/csmcl.space/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/csmcl.space/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    root /var/www/csmcl.space/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "SAMEORIGIN";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
EOF

# Update cosmical.me configuration
sudo tee /etc/nginx/sites-available/cosmical.me << 'EOF'
server {
    listen 80;
    server_name cosmical.me www.cosmical.me;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl;
    server_name cosmical.me www.cosmical.me;

    ssl_certificate /etc/letsencrypt/live/cosmical.me/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/cosmical.me/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }

    # Security headers
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
    add_header X-Frame-Options "DENY";
    add_header X-XSS-Protection "1; mode=block";
    add_header X-Content-Type-Options "nosniff";
    add_header Referrer-Policy "strict-origin-when-cross-origin";
}
EOF

# Set up auto-renewal
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer

# Start Nginx
sudo systemctl start nginx

echo "SSL setup completed!"
echo "Certificates will auto-renew via systemd timer"
