import { useState, useEffect } from 'react';
import Board from '../components/Board/Board';
import { v4 as uuidv4 } from 'uuid';

// Las columnas iniciales que estás pasando
const initialColumns = {
  todo: {
    id: 'todo',
    title: 'To Do',
    cards: [
      { id: uuidv4(), content: 'Tarea 1' },
      { id: uuidv4(), content: 'Tarea 2' },
    ],
  },
  inProgress: {
    id: 'inProgress',
    title: 'In Progress',
    cards: [{ id: uuidv4(), content: 'Tarea 3' }],
  },
  done: {
    id: 'done',
    title: 'Done',
    cards: [{ id: uuidv4(), content: 'Tarea 4' }],
  },
};

export default function Home() {
  const [columns, setColumns] = useState({});

  useEffect(() => {
    setColumns(initialColumns); // Inicializamos las columnas solo al montar el componente
  }, []);

  const handleDragEnd = (result) => {
    const { destination, source } = result;
    if (!destination) return;

    const newColumns = { ...columns };
    const sourceColumn = newColumns[source.droppableId];
    const destinationColumn = newColumns[destination.droppableId];

    const [movedCard] = sourceColumn.cards.splice(source.index, 1);
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    setColumns(newColumns);
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <h1 className="text-5xl font-bold text-center mb-8">Assemblify</h1>
      {/* Pasamos las columnas iniciales al componente Board */}
      <Board columns={columns} onDragEnd={handleDragEnd} />
    </div>
  );
}
