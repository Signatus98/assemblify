import { DragDropContext } from '@hello-pangea/dnd';
import { v4 as uuidv4 } from 'uuid';
import Column from '../Column/Column';
import { useState, useEffect } from 'react';  // Usamos useEffect en caso de que necesitemos gestionar los cambios

const Board = ({ columns, onDragEnd }) => {
  // No necesitamos establecer un estado inicial aquí porque recibimos las columnas como prop
  const [localColumns, setLocalColumns] = useState(columns);

  // Este efecto se asegura de que siempre que las columnas cambien en el componente superior (Home), se actualice el estado en Board
  useEffect(() => {
    setLocalColumns(columns);
  }, [columns]);

  const addTask = (columnId) => {
    const taskContent = prompt('Introduce el contenido de la tarea:');
    if (!taskContent) return;

    const newCard = { id: uuidv4(), content: taskContent };
    const column = localColumns[columnId];
    const taskExists = column.cards.some((task) => task.content === taskContent);

    if (taskExists) {
      alert('La tarea ya existe en esta columna.');
      return;
    }

    const updatedColumns = { ...localColumns };
    updatedColumns[columnId].cards.push(newCard);

    setLocalColumns(updatedColumns);
  };

  const addColumn = () => {
    const columnName = prompt('Introduce el nombre de la nueva lista:');
    if (!columnName) return;

    const newColumnId = uuidv4();
    const newColumn = { title: columnName, cards: [] };

    // Evitamos duplicados de nombres de columna
    const columnExists = Object.values(localColumns).some((col) => col.title === columnName);
    if (columnExists) {
      alert('Ya existe una columna con ese nombre.');
      return;
    }

    const updatedColumns = { ...localColumns };
    updatedColumns[newColumnId] = newColumn;

    setLocalColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-6 p-8 bg-gray-900 min-h-screen">
        {Object.keys(localColumns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={localColumns[columnId].title}
            cards={localColumns[columnId].cards}
            addTask={() => addTask(columnId)}
          />
        ))}
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          onClick={addColumn}
        >
          + Añadir lista
        </button>
      </div>
    </DragDropContext>
  );
};

export default Board;
