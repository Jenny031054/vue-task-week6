<template>
    <h1 class="text-primary fw-bold">這裡是前台頁面</h1>
    <nav class="nav justify-content-center ">
        <RouterLink to="/"> Home |</RouterLink>
        <RouterLink to="/product"> 產品 |</RouterLink>
        <RouterLink to="/cart"> 購物車 |</RouterLink>
        <RouterLink to="/dashboard"> 後台 |</RouterLink>
    </nav>
    <RouterView />
</template>
