import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card'; // Componente para las tarjetas

const Column = ({ columnId, title, cards }) => {
  return (
    <div className="bg-white rounded-md shadow-md w-80 p-4">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <Droppable droppableId={columnId}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="space-y-2"
          >
            {cards.map((card, index) => (
              <Card key={card.id} card={card} index={index} />
            ))}
            {provided.placeholder} {/* Necesario para que Droppable funcione */}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Column;
