<template>
    <div class="card-flex" style="background: #b8c7cc; z-index: 1;">
        <nav style="min-height: 25%;">
          <ul class="menu">
            <li class="menu-item">
              <RouterLink to="/export" class="menu-link">
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
              <RouterLink to="/profile" class="menu-link">
                <i class="fas fa-user"></i>
                <span class="menu-text">Profile</span>
              </RouterLink>
            </li>
          </ul>
        </nav>
      </div>
  </template>
  
  <style>
  .menu-body {
    background: #b8c7cc;
    min-height: 100%;
    max-width: 25%;
    min-width: 20%;
    z-index: -100000;
    display: flex;
    flex-direction: column;
    border-radius: 10px 20px 10px 20px;
  }
  
  .menu {
    padding: 0;
    list-style: none;
  }
  
  .menu-item {
    padding: 10px;
    display: flex;
    align-items: center;
  }
  
  .menu-link {
    text-decoration: none;
    color: #d61b1b;
    display: flex;
    align-items: center;
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
      max-width: 100%;
      min-width: 0;
    }
  }
  </style>
  <script setup>

</script>