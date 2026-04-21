import { useState } from 'react';
import { type Card as CardType, useBoardStore } from '../store/boardStore';
import AddCardForm from '../AddCardForm/AddCardForm';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import toast from 'react-hot-toast';

const statusOptions = ['To Do', 'In Progress', 'Done'] as const;

export default function Card({ card }: { card: CardType }) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const { deleteCard, moveCard } = useBoardStore();

  // Set up draggable functionality using useDraggable hook from dnd-kit
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: card.id,
  });

  // Calculate dynamic styles for the card based on its dragging state and position
  const style = {
    transform: CSS.Translate.toString(transform),
    zIndex: isDragging ? 50 : 'auto',
    opacity: isDragging ? 0.6 : 1,
  };


  const borderColors = {
    'To Do': 'border-l-blue-400',
    'In Progress': 'border-l-amber-400',
    'Done': 'border-l-emerald-400',
  };

  // Handle card deletion with a confirmation toast notification
  const handleDelete = () => {
    deleteCard(card.id);
    toast.error('Task deleted successfully', {
      icon: '🗑️',
      duration: 2000,
      position: "top-right"
    });
  };


  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
        className={`relative group bg-white p-4 rounded-xl shadow-sm border border-gray-200 border-l-4 ${borderColors[card.status]}
          cursor-grab active:cursor-grabbing ${isDragging ? 'shadow-xl border-blue-400' : ''}`}
      >
        {/* Card Content */}
        <div className="flex justify-between items-start mb-2 flex-wrap">
          <h3 className="font-semibold text-gray-800 leading-tight pr-8">{card.title}</h3>

          <div className="flex gap-1 absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => setIsEditOpen(true)}
              className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
            </button>
            <button
              onPointerDown={(e) => e.stopPropagation()}
              onClick={handleDelete}
              className="p-1.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
              title="Delete"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg>
            </button>
          </div>
        </div>

        <p className="text-sm text-gray-500 mb-4 line-clamp-2">{card.description}</p>

        <div className="flex flex-wrap gap-1 mt-auto pt-3 border-t border-gray-50">
          {statusOptions.filter(s => s !== card.status).map((s) => (
            <button
              key={s}
              onPointerDown={(e) => e.stopPropagation()}
              onClick={() => moveCard(card.id , s)}
              className="text-[10px] px-2 py-1 bg-gray-50 text-gray-400 hover:bg-blue-50 hover:text-blue-600 rounded-md border border-transparent hover:border-blue-100 transition-all font-medium"
            >
              → {s}
            </button>
          ))}
        </div>
      </div>
      {/* Edit Card Form */}
      <AddCardForm
        isOpen={isEditOpen}
        onClose={() => setIsEditOpen(false)}
        mode="edit"
        initialData={card}
      />
    </>
  );
}
