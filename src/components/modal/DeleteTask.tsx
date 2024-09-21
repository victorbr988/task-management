import { FormType, ITask, useFormStore, useTaskStore } from "@/lib/zustand";

interface IDeleteTask {
  task: ITask | null
}

export function DeleteTask({ task }: IDeleteTask) {
  const { setModal } = useFormStore()
  const { deleteTask } = useTaskStore()

  function handleCloseModal() {
    setModal(FormType.NONE)
  }

  function handleDeleteTask() {
    if (!task) return
    deleteTask(task)
    handleCloseModal()
  }

  return (
    <div className="task-modal">
      <div className="task-container">
        <h2 className="task-container__title">Deletar Tarefa</h2>
        <span className="task-container__description">
          Tem certeza que você deseja deletar essa tarefa?
        </span>

        <section className="task-container__actions">
          <button
            onClick={() => handleDeleteTask()}
            className="destructive"
          >
            Deletar
          </button>

          <button
            onClick={() => handleCloseModal()}
            className="secondary"
          >
            Cancelar
          </button>
        </section>
      </div>
    </div>
  );
}