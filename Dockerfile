# # Use Node.js base image
# FROM node:18-alpine

# # Set working directory
# WORKDIR /app

# # Copy package.json and package-lock.json
# COPY package.json package-lock.json ./

# # Install dependencies
# RUN npm install --force

# # Copy the entire project
# COPY . .

# # Build the Next.js app
# RUN npm run build

# # Expose port
# EXPOSE 3000

# # Start the application
# CMD ["npm", "start"]

FROM node:23-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install -f
COPY . .
RUN npm run build

# Production stage
FROM node:23-alpine
WORKDIR /app

COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

CMD ["npm", "start"]