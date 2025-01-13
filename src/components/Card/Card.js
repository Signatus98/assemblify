import { Draggable } from 'react-beautiful-dnd';

const Card = ({ card, index }) => {
  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="bg-blue-100 p-4 rounded-md shadow-md"
        >
          {card.content}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
