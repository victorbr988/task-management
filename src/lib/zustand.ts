import { create } from "zustand"
import { persist } from "zustand/middleware"

export enum FormType {
  ADD_TASK,
  DELETE_TASK,
  NONE
}

interface IForm {
  action: FormType
  setModal: (action: FormType) => void
}

export const useFormStore = create<IForm>((set) => ({
  action: FormType.NONE,
  setModal: (action: FormType) => set({ action })
}))

export interface ITask {
  id: string
  name: string
  todo: boolean  
}

interface ITasks {
  tasks: ITask[]
  setTask: (task: ITask) => void
  updateTask: (task: ITask) => void
  deleteTask: (task: ITask) => void
  setTasks: (tasks: ITask[]) => void
}

export const useTaskStore = create<ITasks>()(
  persist(
    set => ({
      tasks: [],
      setTask: (task: ITask) => set((state) => ({ tasks: [...state.tasks, task] })),
      updateTask: (task: ITask) => set((state) => {
        const index = state.tasks.findIndex((t) => t.id === task.id)
        return { tasks: [...state.tasks.slice(0, index), task, ...state.tasks.slice(index + 1)] }
      }),
      deleteTask: (task: ITask) => set((state) => {
        return { tasks: [...state.tasks.filter((t) => t.id !== task.id)] }
      }),
      setTasks: (tasks: ITask[]) => set({ tasks })
    }),
    { 
      name: "tasks", 
    }
  )
)