# 🤝 Guía de Contribución

¡Gracias por tu interés en contribuir a nuestro proyecto! Aunque este es un proyecto personal, siempre estamos abiertos a sugerencias y mejoras.

## 📋 Cómo Contribuir

### 1. 🍴 Fork del Proyecto
```bash
# 1. Fork el repositorio en GitHub
# 2. Clona tu fork localmente
git clone https://github.com/tu-usuario/nuestro-primer-mes-siendo-novios.git
cd nuestro-primer-mes-siendo-novios

# 3. Agrega el repositorio original como upstream
git remote add upstream https://github.com/tony-ssr/nuestro-primer-mes-siendo-novios.git
```

### 2. 🌿 Crear una Rama
```bash
# Crear y cambiar a una nueva rama
git checkout -b feature/nueva-funcionalidad
# o
git checkout -b fix/correccion-bug
```

### 3. 💻 Hacer Cambios
- Mantén el código limpio y bien documentado
- Sigue las convenciones existentes
- Prueba tus cambios en diferentes navegadores
- Asegúrate de que sea responsive

### 4. ✅ Probar Cambios
```bash
# Ejecutar servidor local
python server.py
# o
npx http-server

# Probar en diferentes dispositivos
# - Desktop (Chrome, Firefox, Safari, Edge)
# - Tablet (iPad, Android)
# - Mobile (iPhone, Android)
```

### 5. 📝 Commit
```bash
# Agregar cambios
git add .

# Commit con mensaje descriptivo
git commit -m "feat: agregar nueva sección interactiva"
# o
git commit -m "fix: corregir problema de responsive en móviles"
```

### 6. 🚀 Push y Pull Request
```bash
# Push a tu fork
git push origin feature/nueva-funcionalidad

# Crear Pull Request en GitHub
# - Título descriptivo
# - Descripción detallada de los cambios
# - Screenshots si es necesario
```

## 🎯 Tipos de Contribuciones

### 🐛 Reportar Bugs
- Usar el template de issues
- Incluir pasos para reproducir
- Especificar navegador y dispositivo
- Incluir screenshots si es posible

### ✨ Sugerir Mejoras
- Describir la funcionalidad deseada
- Explicar por qué sería útil
- Proporcionar ejemplos si es posible

### 📚 Mejorar Documentación
- Corregir errores tipográficos
- Mejorar explicaciones
- Agregar ejemplos
- Traducir a otros idiomas

### 🎨 Mejoras de Diseño
- Optimizar animaciones
- Mejorar responsive design
- Agregar nuevos efectos visuales
- Mejorar accesibilidad

## 📏 Estándares de Código

### HTML
```html
<!-- Usar HTML semántico -->
<section class="nueva-seccion">
    <header class="seccion-header">
        <h2 class="seccion-titulo">Título</h2>
    </header>
    <div class="seccion-contenido">
        <!-- Contenido -->
    </div>
</section>
```

### CSS
```css
/* Usar BEM para naming */
.nueva-seccion {
    /* Estilos base */
}

.nueva-seccion__titulo {
    /* Elementos */
}

.nueva-seccion--modificador {
    /* Modificadores */
}

/* Comentar código complejo */
/* Animación de entrada suave */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

### JavaScript
```javascript
// Usar funciones descriptivas
function setupNuevaFuncionalidad() {
    // Comentar lógica compleja
    const elementos = document.querySelectorAll('.nuevo-elemento');
    
    elementos.forEach((elemento, index) => {
        // Lógica aquí
    });
}

// Usar arrow functions cuando sea apropiado
const manejarClick = (evento) => {
    evento.preventDefault();
    // Lógica aquí
};
```

## 🧪 Testing

### Navegadores Soportados
- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+

### Dispositivos
- ✅ Desktop (1920x1080, 1366x768)
- ✅ Tablet (768x1024, 1024x768)
- ✅ Mobile (375x667, 414x896)

### Funcionalidades a Probar
- [ ] Navegación entre secciones
- [ ] Reproductor de música
- [ ] Carta interactiva
- [ ] Galería de fotos
- [ ] Juego de emojis
- [ ] Videos
- [ ] Responsive design

## 📝 Convenciones de Commits

### Formato
```
tipo(scope): descripción

Cuerpo del commit (opcional)

Footer (opcional)
```

### Tipos
- `feat`: Nueva funcionalidad
- `fix`: Corrección de bug
- `docs`: Cambios en documentación
- `style`: Cambios de formato
- `refactor`: Refactorización de código
- `test`: Agregar o modificar tests
- `chore`: Cambios en build, dependencias, etc.

### Ejemplos
```bash
git commit -m "feat(gallery): agregar animación de hover a las imágenes"
git commit -m "fix(mobile): corregir problema de touch en el juego"
git commit -m "docs(readme): actualizar instrucciones de instalación"
```

## 🎨 Guía de Diseño

### Colores
- **Rosa Principal**: `#FF6B9D`
- **Rosa Suave**: `#FFB3D1`
- **Amarillo**: `#FFE066`
- **Blanco**: `#FFFFFF`
- **Gris Suave**: `#F8F9FA`

### Tipografía
- **Títulos**: Cursive, bold
- **Texto**: Sans-serif, regular
- **Enlaces**: Sans-serif, medium

### Espaciado
- **Márgenes**: 20px, 40px, 60px
- **Padding**: 15px, 30px, 45px
- **Border-radius**: 8px, 15px, 25px

## 🚫 Qué NO Hacer

- ❌ No cambiar la estructura principal sin consultar
- ❌ No agregar dependencias externas innecesarias
- ❌ No romper la funcionalidad existente
- ❌ No usar colores que no estén en la paleta
- ❌ No hacer cambios que afecten el rendimiento

## 📞 Contacto

Si tienes preguntas sobre las contribuciones:
- 📧 Email: 10antonysalcedo@gmail.com
- 💬 GitHub: [@tony-ssr](https://github.com/tony-ssr)
- 🐛 Issues: [GitHub Issues](https://github.com/tony-ssr/nuestro-primer-mes-siendo-novios/issues)

## 🎉 Reconocimientos

Todas las contribuciones serán reconocidas en:
- README.md
- CHANGELOG.md
- Releases de GitHub

---

**¡Gracias por hacer este proyecto aún más especial! 💕**
