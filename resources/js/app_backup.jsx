import './bootstrap';

// Función simple para probar que JavaScript funciona
function initApp() {
    const container = document.getElementById('app');
    if (container) {
        container.innerHTML = `
            <div style="padding: 20px; background-color: #f0f0f0; text-align: center;">
                <h1 style="color: #333;">JavaScript Funciona!</h1>
                <p style="color: #666;">Si ves esto, JavaScript está cargando correctamente.</p>
                <button style="background-color: #007bff; color: white; padding: 10px 20px; border: none; border-radius: 5px;">
                    Botón de Prueba
                </button>
            </div>
        `;
    }
}

// Ejecutar cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', initApp);
