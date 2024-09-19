import { createApp } from 'vue'
import './app/style.scss'
import App from './app/App.vue'
import router from './app/router.ts'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { faYoutube, faDiscord } from '@fortawesome/free-brands-svg-icons'

library.add(faBars, faYoutube, faDiscord)

const app = createApp(App).mount('#app')

app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router).mount('#app')