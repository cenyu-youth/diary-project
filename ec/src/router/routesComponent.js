class RoutesComponent {
  home(){
    return import('../views/Home.vue')
  }

  about(){
    return import('../views/About.vue')
  }

  login(){
    return import('../views/Logins/Login.vue')
  }

  register(){
    return import('../views/Logins/Register.vue')
  }

}

export const routesComponent = new RoutesComponent();
