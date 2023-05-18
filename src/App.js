import './App.css';
import Title from './components/Title/Title';
import Header from './components/Header/Header';
import { useEffect, useState } from 'react';
import Form from './components/Form/Form';
import TodoList from './components/ToDoList/ToDoList';
import Time from './components/Time/Time';
import Searchbar from './components/Searchbar/Searchbar';

function App() {
  const [inputText, setInputText] = useState('');
  const [todos, setTodos] = useState([]);
  const [status, setStatus] = useState('all');
  const [filteredTodos, setFilteredTodos] = useState([]);

  const filterHandler = () => {
    switch (status) {
      case 'completed':
        setFilteredTodos(todos.filter((todo) => todo.completed === true));
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setFilteredTodos(todos);
        break;
    }
  };

  useEffect(() => {
    getLocalStorage();
  }, []);

  useEffect(() => {
    filterHandler();
  }, [todos, status]);

  const sortToAddDate = () => {
    const sortedTodosAdd = [...todos].sort((a, b) => {
      return a.dateAdded > b.dateAdded ? 1 : -1;
    });
    setTodos(sortedTodosAdd);
  };

  const compareFn = (a) => {
    if (a.completed === true) {
      return 1;
    } else if (a.completed === false) {
      return -1;
    }
    return 0;
  };
  todos.sort(compareFn);

  const countFn = () => {
    const count = todos.length;

    return count;
  };

  const searchHandler = (term) => {
    const fiteredDodos = todos.filter((x) =>
      x.text.toLowerCase().includes(term.toLowerCase())
    );
    setTodos(fiteredDodos);
  };

  const saveToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getLocalStorage = () => {
    if (localStorage.getItem('todo') === null) {
      localStorage.setItem('todo', JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem('todo'));
      setTodos(todoLocal);
      console.log(todoLocal);
    }
  };

  const allCompleteHendler = () => {
    const completeAll = todos.map((item) => {
      if (item.completed === false) {
        return {
          ...item,
          completed: true,
        };
      }
      return item;
    });
    setTodos(completeAll);
  };

  return (
    <div className="App">
      <Header />
      <Time />
      <Title />
      <Searchbar
        getLocalStorage={getLocalStorage}
        onSearch={(term) => searchHandler(term)}
      />

      <Form
        inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        setStatus={setStatus}
        saveToLocalStorage={saveToLocalStorage}
      ></Form>

      <h2>Zadań: {countFn()} </h2>
      <div className="divButton">
        <button className="btn btn-outline-dark" onClick={allCompleteHendler}>
          All completed
        </button>
        <button className="btn btn-outline-dark" onClick={sortToAddDate}>
          Sort
        </button>
      </div>

      <TodoList
        filteredTodos={filteredTodos}
        setTodos={setTodos}
        todos={todos}
        saveToLocalStorage={saveToLocalStorage}
      />
    </div>
  );
}

export default App;
