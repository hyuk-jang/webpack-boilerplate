const divDom = document.createElement('div');

divDom.innerText = 'Dynamic Import Third';

divDom.classList.add('red');

document.querySelector('#root').appendChild(divDom);

const init = (...params) => {
  console.log('init', params);
};

export default init;
