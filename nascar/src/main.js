import {compile, createApp} from 'vue';
import App from './App.vue';
import PrimeVue from 'primevue/config';
import router from './routes'
import { createPinia} from 'pinia'



import 'primevue/resources/themes/lara-light-indigo/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeicons/primeicons.css';
import '/node_modules/primeflex/primeflex.css';



import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import ColumnGroup from 'primevue/columngroup';     
import Row from 'primevue/row';
import Button from 'primevue/button'; 
import Dialog from 'primevue/dialog';
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Toast from 'primevue/toast';
import ToastService from 'primevue/toastservice';
import Card from 'primevue/card';
import Calendar from 'primevue/calendar';
import Password from 'primevue/password';
import Dock from 'primevue/dock';
import SpeedDial from 'primevue/speeddial';
import RadioButton from 'primevue/radiobutton';
import Sidebar from 'primevue/sidebar';
import Rating from 'primevue/rating';
import Menu from 'primevue/menu';
import Divider from 'primevue/divider';
import Avatar from 'primevue/avatar';
import ToggleButton from 'primevue/togglebutton';
import Chart from 'primevue/chart';
import ProgressSpinner from 'primevue/progressspinner';

const pinia = createPinia()
const app = createApp(App);


app.component('Chart', Chart)
app.component('Avatar', Avatar)
app.component('ProgressSpinner', ProgressSpinner)
app.component('ToggleButton', ToggleButton)
app.component('Divider', Divider)
app.component('Rating', Rating)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('ColumnGroup', ColumnGroup)
app.component('Row', Row)
app.component('Button', Button)
app.component('Dialog', Dialog)
app.component('InputMask', InputMask)
app.component('InputText', InputText)
app.component('Toast', Toast)
app.component('Card', Card)
app.component('Calendar', Calendar)
app.component('Password', Password)
app.component('Dock', Dock)
app.component('SpeedDial', SpeedDial)
app.component('RadioButton', RadioButton)
app.component('Sidebar', Sidebar)
app.component('Menu', Menu)

app.use(PrimeVue);
app.use(pinia);
app.use(router);
app.use(ToastService);


app.mount('#app');