# 🚀 Guía de Despliegue

## 📋 Opciones de Despliegue

### 1. 🌐 GitHub Pages (Recomendado)
```bash
# 1. Subir el proyecto a GitHub
git add .
git commit -m "Initial commit: Nuestro primer mes siendo novios"
git push origin main

# 2. Activar GitHub Pages
# - Ir a Settings > Pages
# - Seleccionar "Deploy from a branch"
# - Elegir "main" branch
# - Seleccionar "/ (root)" folder
# - Guardar

# 3. Acceder a la página
# URL: https://tony-ssr.github.io/nuestro-primer-mes-siendo-novios
```

### 2. 🔥 Netlify
```bash
# 1. Conectar repositorio
# - Ir a netlify.com
# - Conectar con GitHub
# - Seleccionar el repositorio
# - Configurar build settings

# 2. Configuración
# Build command: (vacío)
# Publish directory: /
# Deploy

# 3. URL personalizada
# Se genera automáticamente: https://nuestro-primer-mes-siendo-novios.netlify.app
```

### 3. ☁️ Vercel
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Desplegar
vercel

# 3. Seguir las instrucciones
# - Conectar con GitHub
# - Configurar proyecto
# - Deploy automático
```

### 4. 🐳 Docker
```dockerfile
# Dockerfile
FROM nginx:alpine
COPY . /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

```bash
# Construir imagen
docker build -t nuestro-primer-mes .

# Ejecutar contenedor
docker run -p 8080:80 nuestro-primer-mes
```

## 🔧 Configuración del Servidor

### Nginx
```nginx
server {
    listen 80;
    server_name tu-dominio.com;
    root /var/www/nuestro-primer-mes;
    index index.html;
    
    location / {
        try_files $uri $uri/ /index.html;
    }
    
    # Cache para assets
    location ~* \.(css|js|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### Apache
```apache
<VirtualHost *:80>
    ServerName tu-dominio.com
    DocumentRoot /var/www/nuestro-primer-mes
    
    <Directory /var/www/nuestro-primer-mes>
        AllowOverride All
        Require all granted
    </Directory>
    
    # Cache para assets
    <FilesMatch "\.(css|js|png|jpg|jpeg|gif|ico|svg)$">
        ExpiresActive On
        ExpiresDefault "access plus 1 year"
    </FilesMatch>
</VirtualHost>
```

## 📱 Optimizaciones para Producción

### 1. Minificación
```bash
# Instalar herramientas
npm install -g html-minifier cssnano-cli uglify-js

# Minificar HTML
html-minifier --collapse-whitespace --remove-comments --minify-css --minify-js -o index.min.html index.html

# Minificar CSS
cssnano styles.css styles.min.css

# Minificar JS
uglifyjs main.js -o main.min.js
```

### 2. Compresión de Imágenes
```bash
# Instalar ImageOptim o usar online
# Optimizar todas las imágenes en assets/
# Reducir tamaño sin perder calidad
```

### 3. CDN
```html
<!-- Usar CDN para librerías externas -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

## 🔒 Seguridad

### HTTPS
```bash
# Obtener certificado SSL
# Let's Encrypt (gratuito)
certbot --nginx -d tu-dominio.com
```

### Headers de Seguridad
```nginx
# Agregar a nginx.conf
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-Content-Type-Options "nosniff" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

## 📊 Monitoreo

### Google Analytics
```html
<!-- Agregar a index.html -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### Performance
```bash
# Usar herramientas como:
# - Google PageSpeed Insights
# - GTmetrix
# - WebPageTest
```

## 🚨 Troubleshooting

### Problemas Comunes
1. **404 en rutas**: Configurar rewrite rules
2. **CORS**: Agregar headers apropiados
3. **Cache**: Configurar headers de cache
4. **HTTPS**: Redirigir HTTP a HTTPS

### Logs
```bash
# Ver logs de nginx
tail -f /var/log/nginx/access.log
tail -f /var/log/nginx/error.log

# Ver logs de apache
tail -f /var/log/apache2/access.log
tail -f /var/log/apache2/error.log
```

## 📞 Soporte

Si tienes problemas con el despliegue:
- 📧 Email: 10antonysalcedo@gmail.com
- 🐛 Issues: [GitHub Issues](https://github.com/tony-ssr/nuestro-primer-mes-siendo-novios/issues)
- 💬 Discusiones: [GitHub Discussions](https://github.com/tony-ssr/nuestro-primer-mes-siendo-novios/discussions)

---

**¡Que disfrutes tu regalo digital! 💕**
