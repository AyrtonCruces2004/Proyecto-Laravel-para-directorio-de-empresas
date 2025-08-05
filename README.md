# Sistema de Registro - Laravel + React

Un sistema moderno de registro construido con Laravel 12, React, Tailwind CSS y Swiper.js.

## 🚀 Características

- **Frontend React**: Interfaz moderna y responsiva
- **Tailwind CSS**: Estilos modernos y personalizables
- **Swiper.js**: Componentes interactivos y carruseles
- **Laravel 12**: Backend robusto y escalable
- **Formularios Interactivos**: Validación en tiempo real
- **Navegación SPA**: Experiencia de usuario fluida

## 🛠️ Tecnologías Utilizadas

- **Backend**: Laravel 12, PHP 8.2+
- **Frontend**: React 18, Vite
- **Estilos**: Tailwind CSS
- **Componentes**: Swiper.js
- **Base de Datos**: MySQL/PostgreSQL/SQLite

## 📦 Instalación

1. **Clonar el repositorio**
```bash
git clone <tu-repositorio>
cd SistemaDeRegistro
```

2. **Instalar dependencias de PHP**
```bash
composer install
```

3. **Instalar dependencias de Node.js**
```bash
npm install
```

4. **Configurar variables de entorno**
```bash
cp .env.example .env
php artisan key:generate
```

5. **Configurar base de datos**
```bash
php artisan migrate
```

6. **Compilar assets**
```bash
npm run dev
```

7. **Ejecutar el servidor**
```bash
php artisan serve
```

## 🎯 Uso

### Desarrollo
```bash
# Terminal 1 - Servidor Laravel
php artisan serve

# Terminal 2 - Compilación de assets
npm run dev
```

### Producción
```bash
npm run build
```

## 📁 Estructura del Proyecto

```
SistemaDeRegistro/
├── app/
│   ├── Http/Controllers/
│   └── Models/
├── resources/
│   ├── js/
│   │   ├── components/
│   │   │   ├── App.jsx
│   │   │   └── RegistrationForm.jsx
│   │   └── app.js
│   ├── css/
│   │   └── app.css
│   └── views/
│       └── welcome.blade.php
├── routes/
│   └── web.php
└── vite.config.js
```

## 🎨 Componentes React

### App.jsx
Componente principal que maneja la navegación y renderiza las diferentes secciones.

### RegistrationForm.jsx
Formulario de registro con validación en tiempo real y estados de carga.

## 🎭 Características de Swiper

- **Navegación**: Botones de anterior/siguiente
- **Paginación**: Indicadores de slide
- **Autoplay**: Reproducción automática
- **Responsive**: Adaptable a diferentes tamaños de pantalla

## 🎨 Estilos Personalizados

El proyecto incluye estilos personalizados para:
- Componentes Swiper
- Animaciones CSS
- Efectos hover
- Botones interactivos

## 🔧 Configuración de Vite

El archivo `vite.config.js` está configurado para:
- Soporte de React
- Compilación de Tailwind CSS
- Hot Module Replacement
- Optimización de assets

## 📱 Responsive Design

El proyecto está completamente optimizado para:
- Dispositivos móviles
- Tablets
- Escritorio
- Pantallas de alta resolución

## 🚀 Próximos Pasos

- [ ] Implementar autenticación Laravel
- [ ] Crear API endpoints
- [ ] Agregar más componentes React
- [ ] Implementar base de datos real
- [ ] Agregar tests unitarios
- [ ] Configurar CI/CD

## 📄 Licencia

Este proyecto está bajo la Licencia MIT.

## 🤝 Contribuir

1. Fork el proyecto
2. Crear una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir un Pull Request

## 📞 Soporte

Si tienes alguna pregunta o necesitas ayuda, no dudes en contactarnos.
