
import React from 'react';
import { useDrag, useDrop } from 'react-dnd';

interface DraggableCardProps {
  id: string;
  type: string;
  index: number;
  moveCard: (dragIndex: number, hoverIndex: number) => void;
  children: React.ReactNode;
  className?: string;
}

const DraggableCard: React.FC<DraggableCardProps> = ({ 
  id, 
  type, 
  index, 
  moveCard, 
  children, 
  className = "" 
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  
  const [{ handlerId }, drop] = useDrop({
    accept: type,
    collect(monitor) {
      return {
        handlerId: monitor.getHandlerId(),
      };
    },
    hover(item: any, monitor) {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top;

      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }

      moveCard(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type,
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const opacity = isDragging ? 0.4 : 1;
  drag(drop(ref));

  return (
    <div 
      ref={ref} 
      className={`${className} cursor-move`} 
      style={{ opacity }} 
      data-handler-id={handlerId}
    >
      {children}
    </div>
  );
};

export default DraggableCard;
