import hello from './hello';
import world from './world';

const divDom = document.createElement('div');

const h1Dom = document.createElement('h1');

h1Dom.innerHTML = `${hello} ${world}`;

document.querySelector('h1').appendChild(h1Dom);
