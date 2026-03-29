# ---------- FRONTEND BUILD ----------
    FROM node:22 AS frontend-build

    WORKDIR /app/frontend
    
    COPY frontend/package*.json ./
    RUN npm install
    
    COPY frontend ./
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