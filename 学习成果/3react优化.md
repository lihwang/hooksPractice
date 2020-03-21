箭头函数和内联函数区别

虽然子组件是pureComponent,传入callback为内联函数每次相当于重新赋值每次都更新，虽然props上绑定数据没变但是重新绑定函数变化了（内存新开辟）；


react class痛点解决：
不相关复用困难：高阶函数，属性渲染


1.属性渲染
Resizeable作为服用组件  这一技术使得共享代码间变得相当便利
Resizeable最终返回 return this.props.render(this.state.size) ；类似闭包返回执行函数，并把自己计算的数据传递进去


export default ()=><Resizeable render={size=><Foo size={size}/>}></Resizeable>;


2.HOC高阶组件
function Resizeable(Child){
    return class extends Component{
        //内部计算流程

           render() {
            const size=this.state.size;
            return <Child size={size}/>
        }
    }    
}

内部返回组件计算流程数据再套入需要的子组件内部

缺点：组件层级冗余，复用状态逻辑，生命周期混杂

this指向问题