<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link rel="shortcut icon" href="img/icons/icon-48x48.png" />

    <title>@yield('title')</title>

    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&display=swap" rel="stylesheet">
    @vite(['resources/scss/app.scss'])
</head>

<body>
<div class="wrapper">

    @include('layouts.parts._sidebar')

    <div class="main">
        @include('layouts.parts._topbar')

        <main class="content">
        @yield('content')
        </main>
        @include('layouts.parts._footer')
        @include('layouts.parts._dialogs')
    </div>
</div>

@vite(['resources/js/app.js'])
</body>
</html>
