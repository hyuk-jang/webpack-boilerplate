import hello from './hello';
import world from './world';

import './style.scss';

const h1Dom = document.createElement('h1');

h1Dom.innerHTML = `${hello} ${world}`;

document.querySelector('#root').appendChild(h1Dom);
