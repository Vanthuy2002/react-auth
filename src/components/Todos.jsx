import { useState } from 'react';
import { todos } from '../static/constants';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

const TodoApp = () => {
  const [todoList, setTodoList] = useState(todos);
  const [todoName, setTodoName] = useState('');

  const handleInputChange = (e) => {
    setTodoName(e.target.value);
  };
  const handleAddNewTodo = (e) => {
    e.preventDefault();
    const newTodo = {
      id: todoList.length + 1,
      title: todoName,
      complete: false,
    };
    setTodoList([newTodo, ...todoList]);
  };

  const handleRemoveTask = (index) => {
    const todos = [...todoList];
    todos.splice(index, 1);
    setTodoList(todos);
  };

  return (
    <div className='mx-auto max-w-[500px] my-10 p-5'>
      <form onSubmit={handleAddNewTodo} className='flex items-center gap-x-5'>
        <input
          type='text'
          placeholder='New todo item'
          className='w-full border border-slate-200 rounded-lg py-3 px-5 outline-none bg-transparent'
          name='todo'
          onChange={handleInputChange}
        />
        <button className='inline-flex items-center justify-center px-8 py-3 font-sans font-semibold tracking-wide text-white bg-blue-500 rounded-lg'>
          Add
        </button>
      </form>
      <div className='mb-10'></div>
      <div className='flex flex-col gap-y-5'>
        <TransitionGroup>
          {todoList.map((item, index) => (
            <CSSTransition
              key={item.id}
              classNames='todo'
              timeout={{ enter: 500, exit: 300 }}
            >
              <li
                className={`flex items-center justify-between gap-x-3 text-base mb-3`}
              >
                <span>{item.title}</span>
                <button
                  className='p-2 rounded-lg bg-red-500 text-white'
                  onClick={() => handleRemoveTask(index)}
                >
                  Remove
                </button>
              </li>
            </CSSTransition>
          ))}
        </TransitionGroup>
      </div>
    </div>
  );
};

export default TodoApp;
