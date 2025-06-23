#!/bin/bash

# Build the application
npm run build

# Create .vercel directory if it doesn't exist
mkdir -p .vercel

# Create project.json
echo '{
  "projectId": "prj_your_project_id",
  "orgId": "your_org_id"
}' > .vercel/project.json

# Deploy using Vercel CLI
vercel deploy --prod
