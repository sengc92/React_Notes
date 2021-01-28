# React
1) Declarative (聲明式編碼)
2) Component-Based (組件化編碼-複用,維護,重構) 函數/類
3) Learn Once, Write Anywhere(支持客戶與服務器渲染)
4) Effective (高效)
5) Single stream (單向數據流)

### 高效原因
1) Virtual DOM 不用直接操作DOM
2) DOM Diff算法 最小化渲染

### 使用super
1) 子類constructor必須調用super才能使用this
2) constructor中可以使用this.props
3) 組件method預設為非綁定this狀態

## Angular vs React
1) Flexibility - react can use typescript, flow

## React.js
1) react.js 核心庫
2) react-dom.js 提供操作DOM的擴展庫  
3）babel.min.js 解釋JSX語法轉為純JS代碼的庫，jsx=javascript+html
   
## React安裝
create-react-app 官方生成react項目，加載react,react-dom,react-script(繼承webpack腳手架)  
npm start 開启本地服務  
npm build 打包  
npm testjest 進行單原測試  
npm eject 把webpack打包出來，不可逆  

```javascript
import React from "react"; //lib, string of libName
import {render}  from "react-dom"; //{functionName}, libName
let name = "哈哈";
let ele =(
	<>
		<h1>你好{name}</h1>
		<div>嘻嘻</div>
	</>
)
render(ele,window.root);
```
轉化注意

class => className

for => htmlFor

style標籤必須是對象 style = { {} } JS->對象

commenting use {}


1)類似於angular的bind
2)會受到XSS攻擊
```javascript
<div dangerouslySetInnerHTML={{ __html: '<div>123</div>' }} />
```

#函数组件
```javascript
组件传递的属性或方法(<组件名 title={“222”}>)会把传入的属性包成一个对象({title:“222”})传给这个组件函数props,在组件内取值时就是，{props.title}
```
函数组件会在内部添加一个render方法，把函数的返回结果作为render方法的返回结果
```javascript
Clock.render = function(){
    Clock();
}

函数组件的不足
1)没有状态 新版本有增加
2)没有生命周期的钩子 新版本有增加
3)函数组件中没有this
```
# 类组件
类组件在渲染时会默认调用render方法  
extends React.Component  
with hooks and state

# React的数据源(props(外部传入，不可修改) ,state(内部自带，可修改))
props 会把组件传入的属性or方法放在this上 ---- 取值时：this.props.name1  
this.state 状态 ---- 取值时：this.state.name1

### setState
this.setState 会刷新页面，如果不用this.setState。直接修改state 会改状态还是页面不会刷新  
this.setState 可以执行多次么？ 面试题  
如果沒有定時器(setTimeout())，this.setState只會執行一次,但是加了定時器就監測不到了，this.setState可以執行多次

# React 生命周期(钩子函数)
componentDidMount(){} 当前组件挂在完成，在render方法加载完之后执行  
unmountComponentAtNode() 卸载组件   
componentWillUnmount(){} 将要卸载,在此阶段中删掉所有的监听和卸载异步方法  

# React Event 中的this问题
在元素中绑定时加入bind(onClick = this.btnclick.bind(this)) 每次点击都产生一个新的函数  
在constructor中设置一下，然后在元素中用(οnclick={this.btnclick}) 官网推荐

# prop-types
React 内置了类型检测的功能，在组件中检测，可以赋值propTypes属性  

格式校验  
需下载  
propTypes 属性  
.array 数组  
.bool 布尔值  
.func 函数  
.number 数字  
.object 对象  
.string 字符串  
.symbol 符号  
.node 任何东西都可以被渲染:numbers, strings, elements,或者是包含这些类型的数组(或者是片段)。  
.element React元素
.instanceOf(Message) 类的一个实例  
.oneOf([‘News’, ‘Photos’]) 枚举值  
.oneOfType([PropTypes.string,PropTypes.number,PropTypes.instanceOf(Message)]) 多种类型其中之一  
.arrayOf(PropTypes.number) 某种类型的数组  
.objectOf(PropTypes.number) 某种类型的对象  
.shape({color: PropTypes.string,fontSize: PropTypes.number}) 特定形式的对象  
.func.isRequired 可以使用 `isRequired’ 链接上述任何一个，以确保在没有提供 prop 的情况下显示警告  
.any.isRequired 任何数据类型的值  
function(props, propName, componentName) { return new Error()} 自定义的验证器  
.arrayOf(function(propValue, key, componentName, location, propFullName) {}  

# react渲染的流程

react会把jsx语法渲染成React.createElement()格式
React.createElement() 会转为 vnode(虚拟节点)
vnode 渲染到页面上(diff算法)

# React数组迭代加上key
```javascript
arr=['apple','banana','orange']
arr.map((item,key)=>{
    return <li key={key}>{item}</li>
})
```

# 受控与非受控组件
在表单中有受(状态)控组件和非受控组件

1)受控组件就是需要添加 onChange  
2)受控好处：- 可以给输入框赋予默认值 - 实时校验  
3)受控坏处：- 每次输入都会调用setState  
```javascript
handleChange = (e) =>{ // e井不是原生的事件，但是可以通過target獲取
    this.setState({
        [e.target.name]:e.target.value
    })
}
render(){
    return 
    <div>
        <input type="text" value={this.state.username} onchange={this.handleChange} name="username"/>
        {this.state.username}
    </div>
}
```

### 非受控

非受控好处：- 简单，也不写状态

非受控坏处：- 不能实时校验

ref 相当于别名

ref设值or取值

The child to be modified could be an instance of a React component, or it could be a DOM element. For both of these cases, React provides an escape hatch.

#### There are a few good use cases for refs:
Managing focus, text selection, or media playback.  
Triggering imperative animations.  
Integrating with third-party DOM libraries.  
Avoid using refs for anything that can be done declaratively.

### Create Refs
```javascript
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```

### Accessing Refs
when a ref is passed to render, a reference to the node become accessible at the 'current' attribute of the ref.
```javascript
const node = this.myRef.current;
```

When the ref attribute is used on an HTML element, the ref created in the constructor with React.createRef() receives the underlying DOM element as its current property.  
When the ref attribute is used on a custom class component, the ref object receives the mounted instance of the component as its current.  
You may not use the ref attribute on function components because they don’t have instances.    

ES6 React.Component doesn't auto bind methods to itself. You need to bind them yourself in constructor.

## React 是单向数据流
方法1
Q：子辈不能修改父的值，那如果修改呢？  
A：通过由父辈传递给子辈一个函数，函数回调里放的就是修改的功能，当子辈执行这个函数的时候就会触发父辈的回调就可以更改这个值在传入下去。

方法2  
context Api React提供的，定义一些数据，由子孙直接消费，不必一层层下传



## React API 創建對象
1)簡單DOM對象
```Javascript
//attribute, value and content
var element = React.createElement('h1',{id:'my title'}, 'hello')
```
2) 虛擬DOM最終轉換為真實DOM變化而更新界面

```JavaScript
  <script type="text/babel">
    /*
     功能: 动态展示列表数据
     */
    /*
     技术点:
     1). 使用JSX创建虚拟DOM
     2). React能自动遍历显示数组中所有的元素
     3). array.map()的使用
     */
 
    // 数据的数组
    var names = ['jquery', 'zeptoo', 'angular', 'react全家桶', 'vue全家桶']
 
    // 数据的数组-->标签的数组
    var lis = []
    names.forEach((name, index) => lis.push(<li key={index}>{name}</li>))
    // 创建虚拟DOM
    const ul = <ul>{lis}</ul>
    // 渲染虚拟DOM
    ReactDOM.render(ul, document.getElementById('example1'))
    const ul2 = <ul>{
      names.map((name, index) => <li key={index}>{name}</li>)
    }</ul>
    ReactDOM.render(ul2, document.getElementById('example2'))
  </script>
```
//DOM element(let xxx), DOM container(getElementById)
```javascript
ReactDOM.render(e1DOM,domContainer)
```


// 数据的数组-->标签的数组
// automatic assign index
```javascript
var lis = []
names.forEach((name, index) => lis.push(<li key={index}>{name}</li>))

```

only React components can use functions
最终渲染<MyCompone/> 方法一定要return，没有直接调用函数，渲染时调用函数。
只有实例能调用方法
```JavaScript
function MyComponent () {
    return <h2>工厂函数组件(简单组件)</h2>
}

class MyComponent extends React.component{
    render(){
        return <h1>ES6 component</h1>
    }
}
// 2. 渲染组件标签
ReactDOM.render(<MyComponent />, document.getElementById('example1'))
ReactDOM.render(<MyComponent2 />, document.getElementById('example2'))
```

不用直接操作dom，this是组件對象(class/object oriented)
```javascript
//初始化狀態
constructor(props){
    super(props)
    this.state = {
        stateProp1:value1,
        stateProp2:value2
    }
}
//讀取狀態值
this.state.propertyName

//更新狀態--》組件介面更新
this.state({
    stateProp1:value1,
    stateProp2:value2,
    isLikeMe:false
})

//variable name equals to target state property, add {} to variable name
//Props参数，this.state读取状态，解构赋值不用点
const {isLikeMe} = this.state;
this.setState({isLikeMe:isLikeMe})

```

onClick事件监听(等發生)，this是组件对象(class)，调用组件对象的方法，setState是固定得到方法设置新的状态对象。左右相同名字可以省略

重写组件类render方法，新增handleClick内部this默认是undefined，让this要指向组件对象。
```
handleClick(){
    console.log('handleClick()',this) //this is undefined
    this.setState({isLikeMe)}; //bind the inner this to state
}

render(){
    return <h2 onClick={this.handleClick}>yo</h2>
}

点击的时候是通过bind产生新的handleClick函数，只是函数体一模一样
將this.handleClick(.this = undefined) 綁定到主體this對象(this)
this.handleClick = this.handleClick.bind(this)
```

也可以在onClick中 绑定，onclick绑定的是bind产生的新的函数，这种写法效率低,重写渲染。
```javascript
return <h2 onClick={this.handleClick.bind(this)}></h2>
```



   

   
