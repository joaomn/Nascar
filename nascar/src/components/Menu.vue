<template>
  <div class="menu-body">
    <nav>
      <ul class="menu">
        <li class="menu-item">
          <RouterLink to="/home" class="menu-link">
            <i class="fas fa-home"></i>
            <span class="menu-text">Home</span>
          </RouterLink>
        </li>
        <li class="menu-item">
          <RouterLink to="/dashboard" class="menu-link">
            <i class="fas fa-search"></i>
            <span class="menu-text">Search</span>
          </RouterLink>
        </li>
        <li class="menu-item">
          <RouterLink to="/messages" class="menu-link">
            <i class="fas fa-envelope"></i>
            <span class="menu-text">Messages</span>
          </RouterLink>
        </li>
        <li class="menu-item">
          <RouterLink to="/notifications" class="menu-link">
            <i class="fas fa-bell"></i>
            <span class="menu-text">Notifications</span>
          </RouterLink>
        </li>
        <li class="menu-item">
          <RouterLink to="/perfil" class="menu-link">
            <i class="fas fa-user"></i>
            <span class="menu-text">Perfil</span>
          </RouterLink>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.menu-body {
  background: #b8c7cc;
  display: flex;
  flex-direction: column; /* Alterado para coluna em telas menores */
  padding-top: 20px; /* Adaptação do padding para diferentes tamanhos de tela */
}

.menu {
  list-style: none;
  padding: 0;
}

.menu-item {
  display: flex;
  padding: 10px;
}

.menu-link {
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: flex-start; /* Alterado para início flexível para melhor adaptação */
  align-items: center; /* Adicionado para alinhar os itens verticalmente */
}

.menu-link i {
  margin-right: 10px;
}

.menu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

@media (max-width: 768px) {
  .menu-body {
    padding-top: 10px; /* Ajuste adicional de padding para telas menores */
  }

  .menu-item {
    padding: 5px; /* Redução do padding para telas menores */
  }
}
</style>
