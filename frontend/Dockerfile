
# Stage 1: Build the React application
FROM node:22-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install frontend dependencies
RUN npm ci

# Copy the frontend source code
COPY . .

# Build the production application
RUN npm run build

# Stage 2: Serve the application using Nginx
FROM nginx:alpine

# Copy the production build into Nginx
COPY --from=builder /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose the frontend port
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
