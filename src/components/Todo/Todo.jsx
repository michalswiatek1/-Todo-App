import styles from './Todo.module.css';

const Todo = (props) => {
  const forHowManyDays = () => {
    const currentDate = new Date();
    const { dateAdded } = props.todo;
    const diff = currentDate.getTime() - dateAdded;
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (days === 1) {
      return `Od 1 dnia`;
    } else {
      return `Od ${days} dni`;
    }
  };

  return (
    <div className={props.todo.completed ? 'completed' : ''}>
      <div className={styles.todo}>
        <div> {forHowManyDays()} </div>
        <input
          type="text"
          className={styles.todoLi}
          defaultValue={props.text}
        />

        <button
          onClick={() => props.onComplete(props.todo.id)}
          className="btn btn-outline-dark"
        >
          <i className="fas fa-check"></i>
        </button>
        <button
          onClick={() => props.onDelete(props.todo.id)}
          className="btn btn-danger"
        >
          <i className="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};
export default Todo;
