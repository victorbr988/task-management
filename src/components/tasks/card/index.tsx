import { MouseEvent, useMemo } from "react";
import { FiCheck, FiTrash } from "react-icons/fi";
import { If } from "../../conditionalRender/If";
import { FormType, ITask, useFormStore, useTaskStore } from "@/lib/zustand";

interface ICardTask {
  task: ITask
  setTaskSelected: (task: ITask) => void
}

export function CardTask({ task, setTaskSelected }: ICardTask) {
  const { updateTask }  = useTaskStore()
  const { setModal } = useFormStore()

  const classToApplyStyleOnCheckbox = useMemo(() => {
    return task.todo ? "checkbox-checked" : "checkbox-unchecked";
  }, [task.todo]);

  const classToApplyStyleOnText = useMemo(() => {
    return task.todo ? "text-task-checked" : "";
  }, [task.todo]);

  function handleDelete(event: MouseEvent) {
    event.stopPropagation();
    setTaskSelected(task)
    setModal(FormType.DELETE_TASK)
  }

  function updateTaskState(event: MouseEvent) {
    event.stopPropagation();
    updateTask({ ...task, todo: !task.todo })
  }

  return (
    <section 
      className="card-task-container"
      onClick={(event) => updateTaskState(event)}
    >
      <section className="card-task-container__content">
        <button 
          className={classToApplyStyleOnCheckbox} 
          onClick={(event) => updateTaskState(event)}
          >
          <If condition={task.todo}>
            <FiCheck />
          </If>
        </button>

        <p className={classToApplyStyleOnText}>{task.name}</p>
      </section>

      <button
        id="delete-task"
        onClick={(event) => handleDelete(event)}
      >
        <FiTrash 
          className="trash-icon" 
        />
      </button>
    </section>
  );
}
