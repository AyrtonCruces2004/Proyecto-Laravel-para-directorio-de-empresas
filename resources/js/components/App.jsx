import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import RegistrationForm from './RegistrationForm';

// Importar estilos de Swiper
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const App = () => {
    const [currentSection, setCurrentSection] = useState('home');

    const slides = [
        {
            id: 1,
            title: "Bienvenido al Sistema de Registro",
            description: "Una plataforma moderna para gestionar registros de manera eficiente",
            image: "https://images.unsplash.com/photo-1551434678-e076c223a692?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        },
        {
            id: 2,
            title: "Gestión Intuitiva",
            description: "Interfaz fácil de usar con todas las herramientas necesarias",
            image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2015&q=80"
        },
        {
            id: 3,
            title: "Reportes en Tiempo Real",
            description: "Obtén insights valiosos con nuestros reportes avanzados",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
        }
    ];

    const renderHomeSection = () => (
        <>
            {/* Hero Section with Swiper */}
            <div className="mb-12">
                <Swiper
                    modules={[Navigation, Pagination, Autoplay]}
                    spaceBetween={30}
                    slidesPerView={1}
                    navigation
                    pagination={{ clickable: true }}
                    autoplay={{ delay: 5000 }}
                    className="hero-swiper"
                >
                    {slides.map((slide) => (
                        <SwiperSlide key={slide.id}>
                            <div className="relative h-96 rounded-2xl overflow-hidden">
                                <img
                                    src={slide.image}
                                    alt={slide.title}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                                    <div className="text-center text-white">
                                        <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                                        <p className="text-xl">{slide.description}</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>

            {/* Features Section */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white p-6 rounded-lg shadow-md interactive-card">
                    <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-white text-2xl">📝</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Registro Fácil</h3>
                    <p className="text-gray-600">Registra información de manera rápida y sencilla con nuestro formulario intuitivo.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md interactive-card">
                    <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-white text-2xl">📊</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Reportes Avanzados</h3>
                    <p className="text-gray-600">Genera reportes detallados y visualiza datos con gráficos interactivos.</p>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md interactive-card">
                    <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-4">
                        <span className="text-white text-2xl">🔒</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Seguridad Total</h3>
                    <p className="text-gray-600">Tus datos están protegidos con las mejores prácticas de seguridad.</p>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-center text-white">
                <h2 className="text-3xl font-bold mb-4">¿Listo para comenzar?</h2>
                <p className="text-xl mb-6">Únete a miles de usuarios que ya confían en nuestro sistema</p>
                <button 
                    onClick={() => setCurrentSection('register')}
                    className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                    Registrarse Ahora
                </button>
            </div>
        </>
    );

    const renderRegisterSection = () => (
        <div className="py-8">
            <RegistrationForm />
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            {/* Header */}
            <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center">
                            <h1 className="text-2xl font-bold text-gray-900">
                                Sistema de Registro
                            </h1>
                        </div>
                        <nav className="flex space-x-4">
                            <button 
                                onClick={() => setCurrentSection('home')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentSection === 'home' 
                                        ? 'text-blue-600 bg-blue-50' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Inicio
                            </button>
                            <button 
                                onClick={() => setCurrentSection('register')}
                                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                                    currentSection === 'register' 
                                        ? 'text-blue-600 bg-blue-50' 
                                        : 'text-gray-600 hover:text-gray-900'
                                }`}
                            >
                                Registrarse
                            </button>
                            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Reportes
                            </a>
                            <a href="#" className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium">
                                Contacto
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                {currentSection === 'home' ? renderHomeSection() : renderRegisterSection()}
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-white py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <p>&copy; 2024 Sistema de Registro. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default App; 