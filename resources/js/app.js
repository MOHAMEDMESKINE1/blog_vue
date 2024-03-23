import '../css/app.css';
import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { ZiggyVue } from '../../vendor/tightenco/ziggy';
import PrimeVue from 'primevue/config';
import Lara from '../presets/lara';      //import preset        
import ToastService from 'primevue/toastservice';
import 'primeicons/primeicons.css'
import Card from 'primevue/card';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import Textarea from 'primevue/textarea';
import FileUpload from 'primevue/fileupload';

const appName = import.meta.env.VITE_APP_NAME || 'Laravel';
createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) => resolvePageComponent(`./Pages/${name}.vue`, import.meta.glob('./Pages/**/*.vue')),
    setup({ el, App, props, plugin }) {
        return createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(ZiggyVue)
            .use(ToastService)
            .use(PrimeVue,{
                unstyled:true,
                pt:Lara,
                // pt: Tailwind 
            })
            .component('Card',Card)
            .component('Button',Button)
            .component('Dialog',Dialog)
            .component('InputText',InputText)
            // .component('FloatLabel',FloatLabel)
            .component('Textarea',Textarea)
            .component('FileUpload',FileUpload)
            .mount(el);
    },
    progress: {
        color: '#4B5563',
    },
});
