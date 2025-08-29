import { createApp } from 'vue'
import { createPinia } from 'pinia'
import './assets/styles.css'

import App from './App.vue'
import router from './router'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import 'primeicons/primeicons.css'
import ToastService from "primevue/toastservice";

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: "primevue",
                order: "theme, base, primevue",
            },
            darkModeSelector: ".dark",
        },
    }
})
app.use(ToastService);

app.mount('#app')
