import { Draggable } from '@hello-pangea/dnd';

const Card = ({ card, index, columnId }) => {
  const getCardColor = () => {
    switch (columnId) {
      case 'todo':
        return 'bg-red-300 border-red-300'; // Rojo para tareas pendientes
      case 'inProgress':
        return 'bg-yellow-300 border-yellow-300'; // Amarillo para tareas en progreso
      case 'done':
        return 'bg-green-300 border-green-300'; // Verde para tareas completadas
      default:
        return 'bg-gray-300 border-gray-300'; // Gris por defecto
        
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className={`p-4 rounded-lg shadow-md border text-black ${getCardColor()}`}
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
