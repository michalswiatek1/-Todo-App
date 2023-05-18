import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './Form.module.css';

const Form = (props) => {
  const dateAdded = new Date().getTime();
  const inputTextHandler = (e) => {
    props.setInputText(e.target.value);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    if (!props.inputText) {
      alert('Uzupełnij zadanie!');
      return;
    }

    const newArrTodos = [
      ...props.todos,
      {
        text: props.inputText,
        completed: false,
        id: Math.floor(Math.random() * 1000),
        dateAdded: dateAdded,
      },
    ];

    props.setTodos(newArrTodos);
    props.setInputText('');

    props.saveToLocalStorage('todo', newArrTodos);

    const showToastMessage = () => {
      toast.success('Dodane!', {
        position: toast.POSITION.BOTTOM_RIGHT,
        autoClose: 3000,
      });
    };
    setTimeout(showToastMessage, 2000);
  };

  const statsuHandler = (e) => {
    props.setStatus(e.target.value);
  };

  return (
    <div>
      <form>
        <input
          className={styles.inputAdd}
          value={props.inputText}
          onChange={inputTextHandler}
          type="text"
        />

        <button
          onClick={submitTodoHandler}
          className="btn btn-dark"
          type="submit"
        >
          ADD
        </button>
        <ToastContainer />

        <fieldset className={styles.fieldset}>
          <div className={styles.divSelect}>
            <input
              className={styles.inputSelect}
              type="radio"
              id="statusAll"
              name="status"
              value="all"
              onChange={statsuHandler}
            />
            <label className={styles.labelSelect} htmlFor="statusAll">
              ALL
            </label>

            <input
              className={styles.inputSelect}
              type="radio"
              id="statusCompleted"
              name="status"
              value="completed"
              onChange={statsuHandler}
            />
            <label className={styles.labelSelect} htmlFor="statusCompleted">
              COMPLETED
            </label>

            <input
              className={styles.inputSelect}
              type="radio"
              id="statusUnCompleted"
              name="status"
              value="uncompleted"
              onChange={statsuHandler}
            />
            <label className={styles.labelSelect} htmlFor="statusUnCompleted">
              UNCOMPLETED
            </label>
          </div>
        </fieldset>
      </form>
    </div>
  );
};

export default Form;
