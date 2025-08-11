<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Admin · Users</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script>window.__USER = @json(auth()->user()?->only(['id','name','email']));</script>
  @viteReactRefresh
  @vite(['resources/css/app.css','resources/js/components/users.jsx'])
</head>
<body class="bg-gray-100 min-h-screen">
  <div id="admin-users"></div>
</body>
</html>
