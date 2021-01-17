import hello from './hello';
import world from './world';

import './style.scss';

import icon from './images/icon.png';

// 코드 스플리팅 방법 1
import('./third')
  .then(thrid => {
    thrid.default(1);
  })
  .catch(console.error);

// 코드 스플리팅 방법 2
// require.ensure([], require => {
//   const dynamicModule = require('./third');

//   dynamicModule.default(1, 2, 3);
// });

const h1Dom = document.createElement('h1');

h1Dom.innerHTML = `${hello} ${world}`;

document.querySelector('#root').appendChild(h1Dom);

// 이미지 객체 생성
const Icon = new Image(300, 300);
// 이미지 정의
Icon.src = icon;

document.querySelector('#root').appendChild(Icon);
