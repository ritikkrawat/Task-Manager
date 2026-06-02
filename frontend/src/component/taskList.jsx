import React from "react";
import TaskItem from './taskItem';

export default function TaskList({ tasks, onUpdate, onToggle, onDelete }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onUpdate={onUpdate}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}