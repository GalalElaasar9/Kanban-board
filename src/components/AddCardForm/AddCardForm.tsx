import { useState, useEffect, type FormEvent } from 'react';
import { useBoardStore, type Card } from '../store/boardStore';
import toast from 'react-hot-toast';
interface TaskModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'add' | 'edit';
  initialData?: Card;
}

export default function AddCardForm({ isOpen, onClose, mode, initialData }: TaskModalProps) {
  const { addCard, updateCard } = useBoardStore();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState<Card['status']>('To Do');

  // Initialize form fields when modal opens in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setTitle(initialData.title);
      setDescription(initialData.description);
      setStatus(initialData.status);
    } else {
      setTitle('');
      setDescription('');
      setStatus('To Do');
    }
  }, [isOpen, mode, initialData]);

  if (!isOpen) return null;

  // Handle form submission for both adding and editing tasks
  const handleSubmit = (e:FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    if (mode === 'add') {
      addCard({ title, description, status });
      toast.success('Task Added successfully!',{
        duration:2000,
        position:"top-right"
      })
    } else if (mode === 'edit' && initialData) {
      updateCard(initialData.id, { title, description, status });
      toast.success('Task Updated successfully!',{
        duration:2000,
        position:"top-right"
      })
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form onSubmit={handleSubmit} className="p-6 bg-white w-full max-w-md rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in duration-200">
        <h2 className="text-xl font-bold text-gray-800 mb-5">
          {mode === 'add' ? 'Create New Task' : 'Edit Task'}
        </h2>
          
        <div className="space-y-4">
          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 ml-1">Title</label>
          <input 
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            placeholder="What needs to be done?"
            required
          />

          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 ml-1">Description</label>
          <textarea 
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-3 rounded-xl border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none h-28 resize-none transition-all"
            placeholder="Add more details..."
            required
          />

          <label className="block text-xs font-semibold text-gray-400 uppercase mb-1 ml-1">Status</label>
          <select 
            required
            value={status}
            onChange={(e) => setStatus(e.target.value as any)}
            className="w-full p-3 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:border-blue-500 transition-all cursor-pointer"
          >
            <option value="To Do">To Do</option>
            <option value="In Progress">In Progress</option>
            <option value="Done">Done</option>
          </select>
        </div>

        <div className="flex gap-3 mt-8">
          <button type='button' onClick={onClose} className="cursor-pointer flex-1 py-3 text-gray-500 font-medium hover:bg-gray-50 rounded-xl transition-colors">
            Cancel
          </button>
          <button type='submit' className="cursor-pointer flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
            {mode === 'add' ? 'Create' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}