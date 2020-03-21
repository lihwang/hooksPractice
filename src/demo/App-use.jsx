// import React, { Component } from 'react';

// export class Resizeable extends Component {
//     state={
//         size:[window.innerWidth,window.innerHeight]
//     }

//     onResize=()=>{
//         this.setState({
//             size:[window.innerWidth,window.innerHeight]
//         })
//     }

//     componentDidMount(){
//         window.addEventListener('resize',this.onResize);
//         document.title=this.state.size.join('x');
//     }

//     componentDidUpdate(){
//         document.title=this.state.size.join('x');
//     }

//     componentWillUnmount(){
//         window.removeEventListener('resize',this.onResize);
//     }
//     render() {
//         return this.props.render(this.state.size)
//     }
// }

// class Foo extends Component{
//     render(){
//         const [width,height]=this.props.size;
//     return <div>{width}x{height}</div>
//     }
// }

// export default ()=><Resizeable render={size=><Foo size={size}/>}></Resizeable>;


// import React, { Component } from 'react';

// function Resizeable(Child){
//     return class extends Component{
//         state = {
//             size: [window.innerWidth, window.innerHeight]
//         }

//         onResize = () => {
//             console.log('Resizeable');

//             this.setState({
//                 size: [window.innerWidth, window.innerHeight]
//             })
//         }

//         componentDidMount() {
//             window.addEventListener('resize', this.onResize);
//             document.title = this.state.size.join('x');
//         }

//         componentDidUpdate() {
//             document.title = this.state.size.join('x');
//         }

//         componentWillUnmount() {
//             window.removeEventListener('resize', this.onResize);
//         }
//         render() {
//             const size=this.state.size;
//             return <Child size={size}/>
//         }
//     }
// }

// class Foo extends Component{
//     render(){
//         const [width,height]=this.props.size;
//     return <div>{width}x{height}</div>
//     }
// }


// export default Resizeable(Foo);

// import React,{useState,} from 'react';
// function App() {
//     const [name, setName] = useState('名称')
//     const [content,setContent] = useState('内容')
//     return (
//         <>
//           <button onClick={() => setName(new Date().getTime())}>name</button>
//           <button onClick={() => setContent(new Date().getTime())}>content</button>
//           <Button name={name}>{content}</Button>
//         </>
//     )
//   }

//   function Button({ name, children }) {
//     function changeName(name) {
//       console.log('11')
//       return name + '改变name的方法'
//     }

//     const otherName =  changeName(name)
//     return (
//         <>
//           <div>{otherName}</div>
//           <div>{children}</div>
//         </>

//     )
//   }

//   export default App;


// import React, { Component, createContext,createRef } from 'react';

// const CountContext = createContext(null);

// class Foo extends Component {
//     static contextType = CountContext;
//     haha() {
//         alert('1')
//     }
//     render() {
//         const count = this.context;
//         return <h1>
//             {count}
//         </h1>
//     }
// }

// export class App extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             count: 0
//         }
//         this.foo = React.createRef();
//       }



//     increase = () => {
//         const { count } = this.state;
//         this.setState({ count: count + 1 })
//         console.log(this.foo.current.haha());

//     }
//     render() {
//         const { count } = this.state;
//         return (
//             <div>
//                 <button onClick={this.increase}>click</button>
//                 <CountContext.Provider value={count}>
//                     <Foo ref={this.foo}/>
//                 </CountContext.Provider>
//             </div>
//         );
//     }
// }



// export default App;

import React, { Component, PureComponent, useState, useEffect, useMemo, useCallback, useRef, memo } from 'react';

// const Counter = memo(function Counter(props) {
//     console.log('Counter render');
//     return (<h1 onClick={props.onClick}>{props.count}</h1>)
// })


class Counter extends PureComponent {
    speak() {
        console.log(`speak count:${this.props.count}`)
    }
    render() {
        const { props } = this;
        return <h1 onClick={props.onClick}>{props.count}</h1>
    }
}
function App(props) {
    const [count, setCount] = useState(0);
    const [clickCount, setClickCount] = useState(0);
    let it = useRef();
    const double = useMemo(() => {
        return count * 2;
    }, [count < 3])

    const onClick = useCallback(() => {
        console.log('Click');
        setClickCount((clickCount) => clickCount + 1);
    }, [])

    useEffect(() => {
        it.current = setInterval(() => {
            console.log(count)
            setCount(count => count + 1)
        }, 1000)
    }, []);



    useEffect(() => {
        it.current&&count===10 && clearInterval(it.current)
    });



    return <div>
        <button type="button" onClick={() => { setCount(count + 1) }}>Click({count}),double({double})</button>
        <Counter count={double} onClick={onClick} />
    </div>
}

export default App;
