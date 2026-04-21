import { useDroppable } from '@dnd-kit/core';
import { useBoardStore } from '../store/boardStore';
import Card  from '../Card/Card';
import { useMemo } from 'react';

interface ColumnProps {
  status: 'To Do' | 'In Progress' | 'Done';
  id: string; 
}

export default function Column({ status, id }: ColumnProps) {
  const statusColors = {
    'To Do': 'bg-blue-500',
    'In Progress': 'bg-amber-500',
    'Done': 'bg-emerald-500',
  };
  
  const { setNodeRef } = useDroppable({
    id: id,
  });

  const allCards = useBoardStore((state) => state.cards);

  // Memoize the filtered cards for the column to optimize performance and prevent unnecessary re-renders
  const columnCards = useMemo(() => {
    return allCards.filter((card) => card.status === status);
  }, [allCards, status]);

  return (
    <div ref={setNodeRef} className="w-80 min-h-[500px] flex flex-col bg-gray-100/50 rounded-2xl p-4 border border-gray-200">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${statusColors[status]}`}></span>
          <h2 className="font-bold text-gray-700">{status}</h2>
        </div>
        <span className={`${statusColors[status]} bg-opacity-10 ${statusColors[status]} px-2.5 py-0.5 rounded-full text-xs font-bold shadow-sm`}>
          {columnCards.length === 0 ? 'No Tasks' : `${columnCards.length} ${columnCards.length === 1 ? 'Task' : 'Tasks'}`}
        </span>
      </div>
      {/* Column Content */}
      <div className="flex flex-col gap-3 flex-1">
        {columnCards.length === 0 ? (
          <p className="text-sm text-gray-400 text-center mt-6 italic">
            {status === 'To Do' && 'No tasks to do yet'}
            {status === 'In Progress' && 'No tasks in progress yet'}
            {status === 'Done' && 'No completed tasks yet'}
          </p>
        ) : (
          columnCards.map((card) => (
            <Card key={card.id} card={card} />
          ))
        )}
      </div>
    </div>
  );
}
