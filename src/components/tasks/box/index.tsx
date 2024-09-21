import { ReactNode } from "react";

interface IBoxTasks {
  tasksDoneChildren: ReactNode
  tasksTodoChildren: ReactNode
}
export function BoxTasks({ tasksDoneChildren, tasksTodoChildren }: IBoxTasks) {
  return (
    <div className="box-tasks">
      <h2>Suas tarefas de hoje</h2>
      <section className="box-tasks__todo">
        { tasksTodoChildren }
      </section>

      <h2>Tarefas finalizadas</h2>
      <section className="box-tasks__done">
        { tasksDoneChildren }
      </section>
    </div>
  );
}
