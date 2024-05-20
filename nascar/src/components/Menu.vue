<template>
  <div class="menu-body">
    <nav>
      <ul class="menu">
        <li class="menu-item">
          <RouterLink to="/" class="menu-link">
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
          <RouterLink to="/" class="menu-link">
            <i class="fas fa-envelope"></i>
            <span class="menu-text">Messages</span>
          </RouterLink>
        </li>
        <li class="menu-item">
          <RouterLink to="/" class="menu-link">
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
  padding-top: 90px; /* Adaptação do padding para diferentes tamanhos de tela */
  
}

.menu {
  list-style: none;
  padding: 0;
}



.menu-item {
  background: #f0efee;
  border: none;
  padding: 10px 20px;
  display: flex;
  font-size: 15px;
  font-weight: 600;
  width: auto;
  text-transform: uppercase;
  cursor: pointer;
  transform: skew(-21deg);
  margin: 20px;
  box-shadow: -5px 4px 2px 1px rgb(26, 25, 25);
  

}

span {
  display: inline-block;
  transform: skew(21deg);
}

.menu-item::before {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  right: 100%;
  left: 0;
  background: rgba(196, 214, 236, 0.733);
  opacity: 0;
  z-index: -1;
  transition: all 0.5s;
}

.menu-item:hover {
  color: #fff;
}

.menu-item:hover::before {
  left: 0;
  right: 0;
  opacity: 1;
}

.menu-link {
  text-decoration: none;
  color: black;
  display: flex;
  justify-content: flex-start; /* Alterado para início flexível para melhor adaptação */
  align-items: center; /* Adicionado para alinhar os itens verticalmente */
}

.menu-link i {
  margin-right: 1px;
}

.menu-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: flex;
  padding: 0;
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
