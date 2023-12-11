import { motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { MdDelete, MdEdit } from 'react-icons/md';
import { useDispatch } from 'react-redux';
import { deleteTodo, updateTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import CheckButton from './CheckButton';
import TodoModal from './TodoModal';

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function TodoItem({ todo }) {
  const dispatch = useDispatch();
  const [checked, setchecked] = useState(false);
  const [updateModalOpen, setupdateModalOpen] = useState(false);

  useEffect(() => {
    if (todo.status === 'complete') {
      setchecked(true);
    } else {
      setchecked(false);
    }
  }, [todo.status]);

  const handleUpdate = () => {
    setupdateModalOpen(true);
  };

  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Todo Deleted Successfully');
  };

  const handleCheck = () => {
    setchecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? 'incomplete' : 'complete',
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} handleCheck={handleCheck} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === 'complete' && styles['todoText--completed'],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>
              {(parseInt(new Date(todo.time)).toString, 'p, MM/dd/yyyy')}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            tabIndex={0}
            role="button"
          >
            <MdEdit />
          </div>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            tabIndex={0}
            role="button"
          >
            <MdDelete />
          </div>
        </div>
      </motion.div>
      <TodoModal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setmodalOpen={setupdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
