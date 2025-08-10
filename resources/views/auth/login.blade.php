<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Login</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  @viteReactRefresh
  @vite(['resources/css/app.css','resources/js/components/Login.jsx'])
</head>
<body class="bg-blue-50 min-h-screen flex flex-col">
  {{-- Si quieres reusar tu header/footer Blade, puedes incluirlos aquí --}}
  <div id="app-login" class="flex-1"></div>
</body>
</html>
