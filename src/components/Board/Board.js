import { DragDropContext } from '@hello-pangea/dnd';
import Column from '../Column/Column';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';

const Board = ({ initialColumns }) => {
  // Columnas por defecto si no se pasan columnas iniciales
  const defaultColumns = {
    [uuidv4()]: { title: 'To Do', cards: [] },
    [uuidv4()]: { title: 'In Progress', cards: [] },
    [uuidv4()]: { title: 'Finalized', cards: [] },
  };

  const [columns, setColumns] = useState(initialColumns || defaultColumns);

  const handleDragEnd = useCallback((result) => {
    const { source, destination } = result;
    if (!destination) return; // Si no hay destino, no hacemos nada

    const sourceColumn = columns[source.droppableId];
    const destinationColumn = columns[destination.droppableId];

    // Si la columna de origen y la de destino son la misma, solo reordenamos las tarjetas
    if (source.droppableId === destination.droppableId) {
      const updatedColumns = { ...columns };
      const [removed] = updatedColumns[source.droppableId].cards.splice(source.index, 1);
      updatedColumns[destination.droppableId].cards.splice(destination.index, 0, removed);
      
      // Solo actualizamos si hay un cambio real en el orden
      if (JSON.stringify(columns) !== JSON.stringify(updatedColumns)) {
        setColumns(updatedColumns);
      }
    } else {
      // Si las columnas de origen y destino son diferentes
      const updatedColumns = { ...columns };
      const [removed] = updatedColumns[source.droppableId].cards.splice(source.index, 1);
      updatedColumns[destination.droppableId].cards.splice(destination.index, 0, removed);
      
      // Solo actualizamos si hay un cambio real en las columnas
      if (JSON.stringify(columns) !== JSON.stringify(updatedColumns)) {
        setColumns(updatedColumns);
      }
    }
  }, [columns]);

  const addTask = (columnId) => {
    const taskContent = prompt('Introduce el contenido de la tarea:');
    if (!taskContent) return;

    const newCard = { id: uuidv4(), content: taskContent };
    const column = columns[columnId];
    const taskExists = column.cards.some((task) => task.content === taskContent);

    if (taskExists) {
      alert('La tarea ya existe en esta columna.');
      return;
    }

    const updatedColumns = { ...columns };
    updatedColumns[columnId].cards.push(newCard);

    setColumns(updatedColumns);
  };

  const addColumn = () => {
    const columnName = prompt('Introduce el nombre de la nueva lista:');
    if (!columnName) return;

    const newColumnId = uuidv4();
    const newColumn = { title: columnName, cards: [] };

    // Evitamos duplicados de nombres de columna
    const columnExists = Object.values(columns).some((col) => col.title === columnName);
    if (columnExists) {
      alert('Ya existe una columna con ese nombre.');
      return;
    }

    const updatedColumns = { ...columns };
    updatedColumns[newColumnId] = newColumn;

    setColumns(updatedColumns);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="flex space-x-6 p-8 bg-gray-900 min-h-screen">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={columns[columnId].title}
            cards={columns[columnId].cards}
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
