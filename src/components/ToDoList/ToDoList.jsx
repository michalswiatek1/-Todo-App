import Todo from '../Todo/Todo';

const TodoList = (props) => {
  const deleteHandler = (deletedElementId) => {
    const conf = window.confirm('Are you sure you want to delete?');

    if (conf === true) {
      const arrayWhithOutDeletedTodo = props.todos.filter((currentTodo) => {
        return currentTodo.id !== deletedElementId;
      });

      props.setTodos(arrayWhithOutDeletedTodo);
      props.saveToLocalStorage('todo', arrayWhithOutDeletedTodo);
    }
  };

  const completeHendler = (completedElementId) => {
    const newArrTodosCompleted = props.todos.map((item) => {
      if (item.id === completedElementId) {
        return {
          ...item,
          completed: !item.completed,
        };
      }
      return item;
    });

    props.setTodos(newArrTodosCompleted);

    props.saveToLocalStorage('todo', newArrTodosCompleted);
  };

  return (
    <div className="container">
      <ul>
        {props.filteredTodos.map((todo) => (
          <Todo
            setTodos={props.setTodos}
            key={todo.id}
            todo={todo}
            text={todo.text}
            saveToLocalStorage={props.saveToLocalStorage}
            onDelete={deleteHandler}
            onComplete={completeHendler}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
