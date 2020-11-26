import  {routesComponent} from "./routesComponent";

export const routes = [
  {
    path: '/',
    name: 'Home',
    component: routesComponent.home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: routesComponent.about
  }
]
