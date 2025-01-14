import { Droppable } from '@hello-pangea/dnd';
import Card from '../Card/Card';

const Column = ({ columnId, title, cards, addTask }) => {
  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-80 border border-gray-700">
      <h2 className="text-2xl font-semibold mb-4">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="min-h-[150px] bg-gray-700 p-4 rounded-md space-y-4"
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} columnId={columnId} />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
      <button
        className="mt-4 bg-green-600 text-white px-4 py-2 rounded-lg"
        onClick={addTask}
      >
        + Añadir tarea
      </button>
    </div>
  );
};

export default Column;
