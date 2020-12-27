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
    path: '/register',
    name: 'register',
    component: routesComponent.register
  },

  {
    path: '/WriteLabel',
    name: 'writeLabel',
    component: routesComponent.writeLabel
  },

  {
    path: '/label',
    name: 'label',
    component: routesComponent.label
  },



  {
    path:'*',
    redirect:{name:'Home'}
  }
]
