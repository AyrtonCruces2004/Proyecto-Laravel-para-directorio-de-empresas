<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Registro</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  @viteReactRefresh
  @vite(['resources/css/app.css','resources/js/components/register.jsx'])
</head>
<body class="bg-blue-50 min-h-screen flex flex-col">
  <div id="app-register" class="flex-1"></div>
</body>
</html>
