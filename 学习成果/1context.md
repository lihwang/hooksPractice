## context
一、有两个provier 和 consumer；

1.创建 createContext(初始值)   初始值一般作为单元测试使用，当上曾找不到provider就consumer默认取这个

2.不要过多使用，可以嵌套用provider  取值也是嵌套consumer（不建议）

3.版本允许使用static contextType=(createContext的返回值);然后通过解构const 取值参数=this.context;
这样可以前置取出参数，编程风格更好


父传子 -----
父执行子组件的函数 ref绑定
