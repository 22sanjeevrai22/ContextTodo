import './App.css';
import { createContext, useContext, useState } from 'react';
import useFetch from './hooks/customhook';

function App() {
                                        
return <Todos/>;

}

const TodoContext = createContext();

function Todos(){
    const[todolist, setTodoList] = useFetch();
   

    const onAddTodo = (todo) => {
        console.log('Parent todo', todo)
        setTodoList((prev)=>[{title : todo, id : prev.length + 1}, ...prev])

    }

    const onCancel = () => {
        setTodoList((_) => [])
    }
    

   
return(

        <div className='todo-card'>

        <TodoTitle/>

        <TodoContext.Provider value={{todolist, onCancel, onAddTodo}}>

        
        <AddTodo/>
        {todolist.length <= 0 ? 'Loading' : <TodoList/>}


        <TodoFooter/>

        </TodoContext.Provider> 
        </div>  
);

}


function TodoTitle(){
    return(
        <div className='title'>
        <h1>To-Do-List</h1>
        </div>
    )
}

function AddTodo(){
    const context = useContext(TodoContext)
    const[todo, setTodo] = useState('');
    const handleTodo =(event)=>{
        const todoValue = event.target.value;

    setTodo((_) => todoValue)
    }

    const handleTodoAdd = () =>{
        context.onAddTodo(todo)
        setTodo((prev)=>'')
    }
    
    
    return(
        <div className='input'>
            <input type='text' placeholder='What will you do next?' onChange={handleTodo} value={todo}></input>
            <button onClick = {handleTodoAdd}>+</button>
        </div>
    )
}

function TodoList(){

    const context = useContext(TodoContext)
   
    return(
        

        <div id='one'>
            {
            context.todolist.map((todo) => (
                <>
                <AtomicTodoList todo={todo} key ={todo.id}/>
                
                
                </>
             )) 
            }
        </div>

    );
}

//Making atomic Components
function AtomicTodoList({todo}){
  
    
    return(
        <div className ='oneTodo' key={todo.id}>{todo.title}</div>

    )
}


function TodoFooter(){
const context = useContext(TodoContext)
    return(
        <div className='footer'>
            <div className='pending-task' id='one'>
                You have 3 pending task.
            </div>

            
            <div>
                <button className='btn' onClick={context.onCancel}>Clear all</button>
            </div>

        </div>
    )
}



export default App;