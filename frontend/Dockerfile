# Base image
FROM node:16-alpine

# Set working directory
WORKDIR /app

# Install app dependencies
COPY package*.json ./
RUN npm install

# Copy app source code
COPY . .

# Expose the app port
EXPOSE 3000

# Define the command to run the app
CMD ["npm", "run", "dev"]