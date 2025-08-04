# Use official Node.js LTS image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy entire backend project
COPY . .



# Expose port
EXPOSE 5000

# Default command
CMD ["node", "src/index.js"]
