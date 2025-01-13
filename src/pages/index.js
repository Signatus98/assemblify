import { useState } from 'react';
import Board from '../components/Board/Board';
import { v4 as uuidv4 } from 'uuid';

// Función para obtener las columnas en el servidor (Simulación de datos)
export async function getServerSideProps() {
  const columns = {
    todo: {
      id: 'todo',
      title: 'To Do',
      cards: [
        { id: uuidv4(), content: 'Task 1' },
        { id: uuidv4(), content: 'Task 2' },
      ],
    },
    inProgress: {
      id: 'inProgress',
      title: 'In Progress',
      cards: [{ id: uuidv4(), content: 'Task 3' }],
    },
    done: {
      id: 'done',
      title: 'Done',
      cards: [{ id: uuidv4(), content: 'Task 4' }],
    },
  };

  return {
    props: { columns },
  };
}

export default function Home({ columns }) {
  // Estado para manejar las columnas
  const [columnsState, setColumns] = useState(columns);

  // Función que maneja el arrastre y su colocación en la nueva columna
  const handleDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    // Si no hay un destino, no hacer nada
    if (!destination) return;

    // Si el destino es el mismo que el origen, no hacer nada
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    // Clonamos las columnas para no mutar el estado directamente
    const newColumns = { ...columnsState };
    const sourceColumn = newColumns[source.droppableId];
    const destinationColumn = newColumns[destination.droppableId];

    // Extraemos la tarjeta de la columna de origen
    const [movedCard] = sourceColumn.cards.splice(source.index, 1);

    // Colocamos la tarjeta en la nueva columna y en la nueva posición
    destinationColumn.cards.splice(destination.index, 0, movedCard);

    // Actualizamos el estado
    setColumns(newColumns);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-8">
      <h1 className="text-5xl font-bold mb-8">Assemblify</h1>

      {/* Pasamos las columnas y la función de drag and drop al componente Board */}
      <Board columns={columnsState} onDragEnd={handleDragEnd} />
    </div>
  );
}
