import React, { useState } from 'react';
import { format } from 'date-fns';
import { MdDelete, MdEdit } from 'react-icons/md';
import { toast } from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { deleteTodo } from '../slices/todoSlice';
import styles from '../styles/modules/todoItem.module.scss';
import { getClasses } from '../utils/getClasses';
import Modal from './Modal';


function TodoItem({ todo }) {
  const dispatch = useDispatch();
  
  const [updateModalOpen, setUpdateModalOpen] = useState(false);



  const handleDelete = () => {
    dispatch(deleteTodo(todo.id));
    toast.success('Task deleted successfully');
  };
  const handleUpdate = () => {
    setUpdateModalOpen(true);
  };
  const date = todo.time;
  const NewDateTime = date.split(',');
  const newdatetobeformatted = NewDateTime[0].split('/');
  const day = newdatetobeformatted[0];
  const month = newdatetobeformatted[1];
  const year = newdatetobeformatted[2];

  return (
    <>
      <div className={styles.item}>
        <div className={styles.todoDetails}>
         
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
              {format(new Date(year, month, day), 'MM/dd/yyyy')}
              {NewDateTime[1]}
            </p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={handleDelete}
            onKeyDown={handleDelete}
            role="button"
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={handleUpdate}
            onKeyDown={handleUpdate}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </div>
      <Modal
        type="update"
        todo={todo}
        modalOpen={updateModalOpen}
        setModalOpen={setUpdateModalOpen}
      />
    </>
  );
}

export default TodoItem;
