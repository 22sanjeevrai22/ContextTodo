import {useState, useEffect} from 'react'

function useFetch (){

    const[loading, setLoading] = useState(true);

    const [todolist, setTodoList] = useState([])
    const fetchData = async () => {
        const data = await fetch("https://jsonplaceholder.typicode.com/todos")
        const jsonData = await data.json()
        setTodoList(jsonData)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return [todolist, setTodoList, loading]
}

export default useFetch;