# Use the official Node.js image
FROM node:16

# Create and set the working directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies

RUN npm install
#RUN sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 8082

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE 8082

# Start the app

CMD ["node", "app.js"]