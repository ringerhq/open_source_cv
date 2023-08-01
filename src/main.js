import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import globalMixin from './globalMixin'

const app = createApp(App)

app.mixin(globalMixin)

app.mount('#app')