<!doctype html>
<html lang="es">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Editar usuario</title>
  <meta name="csrf-token" content="{{ csrf_token() }}">
  <script>
    window.__USER = @json(auth()->user()?->only(['id','name','email']));
    window.__USER_EDIT_ID = @json($userId);
  </script>
  @viteReactRefresh
  @vite(['resources/css/app.css','resources/js/crudusers/actualizarusers.jsx'])
</head>
<body class="bg-gray-100 min-h-screen">
  <div id="user-edit"></div>
</body>
</html>
