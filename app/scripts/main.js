import data from './data.component'
import {handler} from './handler.component'

const dataURL = 'data/template.json';
data(dataURL);
// wait for data() to generate our dom, then enable handler
window.onload = () => handler();
