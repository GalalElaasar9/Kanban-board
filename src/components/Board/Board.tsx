import { useState } from 'react';
import { 
  DndContext, 
  type DragEndEvent, 
  closestCorners, 
  PointerSensor, 
  useSensor, 
  useSensors 
} from '@dnd-kit/core';
import { useBoardStore } from '../store/boardStore';
import Column  from '../Column/Column';
import AddCardForm from '../AddCardForm/AddCardForm'; 

export default function Board() {
  const [isAddOpen, setIsAddOpen] = useState(false);
  const moveCard = useBoardStore((state) => state.moveCard);
  const statuses = ['To Do', 'In Progress', 'Done'] as const;

  // Configure drag sensors with an activation constraint to prevent accidental drags
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 8 },
    })
  );

  // Handle drag end event to move the card to the new status column
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const cardId = active.id as string;
    const newStatus = over.id as any; 

    moveCard(cardId, newStatus);
  };

  return (
    <DndContext 
      sensors={sensors} 
      collisionDetection={closestCorners} 
      onDragEnd={handleDragEnd}
    >
      {/* Board Content */}
      <div className="min-h-screen w-full bg-[#f8fafc] p-8">
        
        <div className="max-w-7xl mx-auto flex justify-center md:justify-between  items-center mb-6 lg:mb-10 flex-wrap">
          <div className='mb-3 lg:mb-0'>
            <h1 className="text-3xl text-center lg:text-left font-black text-gray-900 tracking-tight">My Board</h1>
            <p className="text-gray-500 text-sm mt-1">Manage your tasks effectively</p>
          </div>
          
          <button 
            onClick={() => setIsAddOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-xl shadow-blue-200 transition-all active:scale-95 cursor-pointer"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            <span>Add New Task</span>
          </button>
        </div>
        {/* Column Headers */}
        <div className="max-w-7xl mx-auto flex gap-8 overflow-x-auto pb-4 flex-wrap">
          {statuses.map((status) => (
            <Column key={status} status={status} id={status} />
          ))}
        </div>
      </div>

      {/* Add Card Form */}
      <AddCardForm 
        isOpen={isAddOpen} 
        onClose={() => setIsAddOpen(false)} 
        mode="add" 
      />
    </DndContext>
  );
}
