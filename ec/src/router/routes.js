import  {routesComponent} from "./routesComponent";

export const routes = [
  {
    path: '/home',
    name: 'Home',
    component: routesComponent.home,
    meta:{
      title:'牛逼'
    }
  },
  {
    path: '/about',
    name: 'About',
    component: routesComponent.about
  },

  {
    path: '/login',
    name: 'login',
    component: routesComponent.login
  },

  {
    path: '/registerregister',
    name: 'register',
    component: routesComponent.register
  },

  {
    path:'*',
    redirect:{name:'Home'}
  }
]
