import './bootstrap';
import '../css/app.css';

function initApp() {
    const container = document.getElementById('app');
    if (container) {
        container.innerHTML = `
  <div class="
    container mx-auto max-w-lg p-6
    bg-gradient-to-r from-blue-50 via-white to-purple-50
    rounded-2xl shadow-xl
    text-center font-sans
  ">
    <h1 class="text-4xl font-extrabold text-gray-800 mb-4">
      ¡Tailwind Funciona!
    </h1>
    <p class="prose text-gray-600 mb-6">
      Si ves esto, Tailwind CSS se está aplicando correctamente.
    </p>
    <button class="
      bg-blue-600 hover:bg-blue-700
      text-white font-semibold
      py-2 px-6 rounded-full
      shadow-md transition
      duration-300
      hover:shadow-lg
    ">
      Botón de Prueba
    </button>
  </div>
`;
    }
}

document.addEventListener('DOMContentLoaded', initApp);
