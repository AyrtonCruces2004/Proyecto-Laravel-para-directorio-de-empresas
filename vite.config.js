import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx', 'resources/js/categorias.jsx', 'resources/js/components/users.jsx', 'resources/js/crudusers/actualizarusers.jsx'],
            refresh: true,
        }),
        react(),
    ],
});
