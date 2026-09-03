# K.D Jewellery — Full-Stack E-Commerce Website + DevOps Pipeline

A responsive jewellery e-commerce website with a Node.js backend API, fully deployed on AWS using an automated CI/CD pipeline.

## 🔗 Live Links
- Website: http://kd.jewellery.s3-website.ap-south-1.amazonaws.com
- Docker Image: https://hub.docker.com/r/qazsxedc/kd-jewellery-api

## 🛠️ Tech Stack
- **Frontend:** HTML, CSS, JavaScript (responsive, mobile-first design)
- **Backend:** Node.js, Express (REST API)
- **Data Pipeline:** Python (openpyxl) — converts product data from Excel to JSON
- **Containerization:** Docker
- **Hosting:** AWS S3 (static website hosting), AWS EC2 (API server)
- **CI/CD:** GitHub Actions — automated deployment on every push
  - Frontend changes → auto-synced to S3
  - Backend (`api/`) changes → Docker image auto-built and pushed to Docker Hub
- **Version Control:** Git, GitHub

## 📂 Project Structure
├── index.html, category.html, product.html → Frontend pages
├── style.css, script.js, category.js, product.js
├── data/products.json → Product catalog
├── convert-products.py → Excel → JSON converter script
├── api/ → Backend REST API
│ ├── server.js
│ ├── Dockerfile
│ └── package.json
└── .github/workflows/ → CI/CD pipelines
├── deploy.yml → Deploys frontend to S3
└── docker-build.yml → Builds & pushes Docker image

## 🚀 CI/CD Pipeline
This project uses two independent GitHub Actions workflows:
1. **Deploy to S3** — triggers on every push, syncs frontend files to the S3 bucket
2. **Build and Push Docker Image** — triggers only when files inside `api/` change, builds a Docker image and pushes it to Docker Hub

## 📖 How to Run Locally

**Frontend:**
Open `index.html` with a Live Server extension in VS Code.

**Backend API:**
cd api
npm install
node server.js

Visit `http://localhost:3000/products`

**Using Docker:**
cd api
docker build -t kd-jewellery-api .
docker run -p 3000:3000 kd-jewellery-api


## 🔮 Planned Improvements
- Kubernetes deployment
- Infrastructure as Code (Terraform)
- Monitoring with Prometheus + Grafana
- CloudFront (HTTPS) + custom domain