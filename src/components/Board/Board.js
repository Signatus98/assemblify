import { DragDropContext } from 'react-beautiful-dnd';
import Column from '../Column/Column';

const Board = ({ columns, onDragEnd }) => {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex space-x-4">
        {Object.keys(columns).map((columnId) => (
          <Column
            key={columnId}
            columnId={columnId}
            title={columns[columnId].title}
            cards={columns[columnId].cards}
          />
        ))}
      </div>
    </DragDropContext>
  );
};

export default Board;
