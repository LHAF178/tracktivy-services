FROM node:12

# Add package file
COPY package*.json ./

# Install deps
RUN yarn

# Copy source
COPY src ./src
COPY tsconfig.json ./tsconfig.json
COPY .env.production /.env.production
COPY certificates ./certificates

# Build dist
RUN yarn build

# Expose port 3000
EXPOSE 5000

CMD yarn start