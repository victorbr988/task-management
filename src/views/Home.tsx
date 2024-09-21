"use client";

import { If } from "@/components/conditionalRender/If";
import { Header } from "@/components/Header";
import { AddTask } from "@/components/modal/AddTask";
import { DeleteTask } from "@/components/modal/DeleteTask";
import { BoxTasks } from "@/components/tasks/box";
import { CardTask } from "@/components/tasks/card";
import { FormType, ITask, useFormStore, useTaskStore } from "@/lib/zustand";
import { useMemo, useState } from "react";

export function HomeView() {
  const [taskSelected, setTaskSelected] = useState<ITask | null>(null)
  const { action, setModal } = useFormStore()
  const { tasks } = useTaskStore()

  const tasksTodoChildren = useMemo(() => (
    tasks
      .filter((task) => !task.todo)
      .map((task) => (
        <CardTask 
          setTaskSelected={setTaskSelected} 
          key={task.id} 
          task={task} 
        />
      ))
  ), [tasks, setTaskSelected]);
  
  const tasksDoneChildren = useMemo(() => (
    tasks
      .filter((task) => task.todo)
      .map((task) => (
        <CardTask 
          setTaskSelected={setTaskSelected}
          key={task.id}
          task={task}
        />
      ))
  ), [tasks, setTaskSelected]);

  function handleModalAction(action: FormType) {
    setModal(action)
  }

  return (
    <div className="container">
      <Header />
      <hr />
      <section className="container__tasks">
        <div className="container__tasks__content">
          <BoxTasks 
            tasksTodoChildren={tasksTodoChildren}
            tasksDoneChildren={tasksDoneChildren}
          />
          <button 
            className="primary"
            onClick={() => handleModalAction(FormType.ADD_TASK)}
          >
            Adicionar nova tarefa
          </button>
        </div>
      </section>

      <If condition={action === FormType.ADD_TASK}>
        <AddTask />
      </If>

      <If condition={action === FormType.DELETE_TASK}>
        <DeleteTask task={taskSelected} />
      </If>
    </div>
  )
}