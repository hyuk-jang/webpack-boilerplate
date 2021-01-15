import hello from './hello';
import world from './world';

import './style.scss';

import icon from './images/icon.png';

const h1Dom = document.createElement('h1');

h1Dom.innerHTML = `${world} ${hello}`;

document.querySelector('#root').appendChild(h1Dom);

// 이미지 객체 생성
const Icon = new Image(300, 300);
// 이미지 정의
Icon.src = icon;

document.querySelector('#root').appendChild(Icon);
