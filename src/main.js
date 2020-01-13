import './css.css'
import './less.less'
console.log('第一个webpack测试文件');

const arr = new Array(5).fill('').map(item => Object.assign({}, {a: item}))
console.log(arr);
