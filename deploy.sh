#!/bin/bash

# Script to build and push Docker image with 'latest' and date-SHA tags

# Exit immediately if a command exits with a non-zero status
set -e

# **Configuration Variables**
DOCKERHUB_USERNAME="mistryneel"  # Replace with your Docker Hub username
IMAGE_NAME="kaalpniya"                  # Replace with your Docker Hub repository name

# **Obtain Current Date and Git Commit SHA**
DATE_TAG=$(date +'%Y%m%d')
GIT_SHA=$(git rev-parse --short HEAD)
DATE_SHA_TAG="${DATE_TAG}-${GIT_SHA}"

# **Define Full Image Names with Tags**
IMAGE_LATEST="${DOCKERHUB_USERNAME}/${IMAGE_NAME}:latest"
IMAGE_DATE_SHA="${DOCKERHUB_USERNAME}/${IMAGE_NAME}:${DATE_SHA_TAG}"

# **Build and Push the Docker Image**
echo "Building and pushing Docker image..."

# Ensure Docker Buildx is initialized
docker buildx inspect multiarch-builder >/dev/null 2>&1 || \
docker buildx create --use --name multiarch-builder

# Build and push the image for the linux/amd64 platform
docker buildx build \
    --platform linux/amd64 \
    -t "${IMAGE_LATEST}" \
    -t "${IMAGE_DATE_SHA}" \
    --push \
    .

echo "Docker images have been built and pushed successfully!"
echo "Tags pushed:"
echo "  - ${IMAGE_LATEST}"
echo "  - ${IMAGE_DATE_SHA}"
