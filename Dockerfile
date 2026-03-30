# ---------- FRONTEND BUILD ----------
    FROM node:22 AS frontend-build

    # Set the workdir
    WORKDIR /app/frontend
    
    # Copy only the package files first (better caching)
    COPY frontend/package*.json ./
    RUN npm install
    
    # Copy everything INSIDE the frontend folder to the CURRENT workdir
    # Use '.' instead of 'frontend' to avoid nesting
    COPY frontend/ .
    
    # Now run the build
    RUN npm run build
    
    
    # ---------- BACKEND ----------
    FROM node:22
    
    WORKDIR /app
    
    # Copy backend
    COPY backend ./backend
    
    WORKDIR /app/backend
    
    RUN npm install
    
    # ✅ COPY frontend build INTO backend/public
    COPY --from=frontend-build /app/frontend/dist ./public
    
    # ✅ Render uses dynamic port
    EXPOSE 10000
    
    # Start backend
    CMD ["node", "backindex.js"]