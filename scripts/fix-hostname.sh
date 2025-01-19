#!/bin/bash

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${YELLOW}Current hostname configuration:${NC}"
echo "-------------------------"
echo -n "Hostname: "
hostname
echo -n "From /etc/hostname: "
cat /etc/hostname
echo -e "\nFrom /etc/hosts:"
cat /etc/hosts
echo "-------------------------"

echo -e "\n${YELLOW}Changing hostname to 'vpsserver'...${NC}"

# Set the hostname
hostnamectl set-hostname vpsserver
echo -e "${GREEN}✓ Hostname set${NC}"

# Update /etc/hostname
echo "vpsserver" > /etc/hostname
echo -e "${GREEN}✓ /etc/hostname updated${NC}"

# Backup hosts file
cp /etc/hosts /etc/hosts.backup
echo -e "${GREEN}✓ Backed up /etc/hosts${NC}"

# Update /etc/hosts
sed -i 's/mail/vpsserver/g' /etc/hosts
echo -e "${GREEN}✓ /etc/hosts updated${NC}"

echo -e "\n${YELLOW}New hostname configuration:${NC}"
echo "-------------------------"
echo -n "Hostname: "
hostname
echo -n "From /etc/hostname: "
cat /etc/hostname
echo -e "\nFrom /etc/hosts:"
cat /etc/hosts
echo "-------------------------"

echo -e "\n${GREEN}Hostname update complete!${NC}"
echo "Note: If you need to revert changes, /etc/hosts.backup contains the original configuration."
