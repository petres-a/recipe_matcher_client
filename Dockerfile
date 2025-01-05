# Define Node version
FROM node:20-slim AS base

# Set the working directory inside the container
WORKDIR /app

# Install base dependencies
RUN apt-get update -qq && \
    apt-get install --no-install-recommends -y \
    build-essential \
    curl \
    && rm -rf /var/lib/apt/lists/* /var/cache/apt/archives/*

# Build stage to install dependencies
FROM base AS build

# Copy package files from the correct path
COPY recipe_matcher_client/package.json recipe_matcher_client/yarn.lock ./

# Install application dependencies
RUN yarn install --frozen-lockfile

# Copy all app code from the correct path
COPY recipe_matcher_client/ ./

# Final stage for the app image
FROM base

# Copy the built dependencies and application code from the build stage
COPY --from=build /app /app

# Setup user and permissions
RUN groupadd --system --gid 1000 node && \
    useradd node --uid 1000 --gid 1000 --create-home --shell /bin/bash && \
    chown -R node:node /app

USER node

# Define the environment variable for the app's port
ENV PORT=3001

# Expose the frontend port
EXPOSE 3001

# Default command to start the React development server
CMD ["yarn", "start"]
