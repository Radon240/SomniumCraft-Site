import { createApp } from 'vue'
import './app/style.scss'
import App from './app/App.vue'
import router from './app/router.ts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons'
import {createPinia} from "pinia";

library.add(faBars, faYoutube, faDiscord)

const pinia = createPinia()
const app = createApp(App)

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(pinia)

app.mount("#app")