import React from 'react';

const SimpleApp = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
            <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        🎉 ¡React está funcionando!
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Tu aplicación Laravel + React + Tailwind CSS está funcionando correctamente.
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-blue-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-blue-900 mb-2">Laravel 12</h3>
                            <p className="text-blue-700">Backend robusto y escalable</p>
                        </div>
                        <div className="bg-green-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-green-900 mb-2">React 18</h3>
                            <p className="text-green-700">Frontend moderno y reactivo</p>
                        </div>
                        <div className="bg-purple-50 p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-purple-900 mb-2">Tailwind CSS</h3>
                            <p className="text-purple-700">Estilos modernos y responsivos</p>
                        </div>
                    </div>
                    
                    <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                        ¡Comenzar Desarrollo!
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimpleApp; 