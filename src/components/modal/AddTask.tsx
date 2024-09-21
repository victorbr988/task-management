"use client";

import { FormType, useFormStore, useTaskStore } from "@/lib/zustand";
import { useMemo, useState } from "react";

export function AddTask() {
  const [name, setName] = useState("")
  const { setModal } = useFormStore()
  const { setTask } = useTaskStore()

  const id = useMemo(() => Math.random().toString(36).substring(2), [])

  function handleCloseModal() {
    setModal(FormType.NONE)
  }

  function handleAddTask() {
    const task = {
      id,
      name,
      todo: false
    }

    setTask(task)
    handleCloseModal()
  }

  return (
    <div className="task-modal">
      <div className="task-container">
        <h2 className="task-container__title">Nova Tarefa</h2>
        <label className="task-container__label">
          <span className="task-container__label__title">
            Título
          </span>
          <input 
            type="text"
            placeholder="Digite"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="task-container__label__input"
          />
        </label>

        <section className="task-container__actions">
          <button
            disabled={!name}
            onClick={() => handleAddTask()}
            className="primary"
          >
            Adicionar
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