import React, { useState } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { Type, Plus } from 'lucide-react';

export function TextOverlayEditor() {
  const { textOverlays, addTextOverlay, removeTextOverlay, updateTextOverlay } = useEditorStore();
  const [newText, setNewText] = useState('');

  const handleAddText = () => {
    if (!newText.trim()) return;

    addTextOverlay({
      id: crypto.randomUUID(),
      text: newText,
      position: { x: 50, y: 50 },
      fontSize: 24,
      color: '#ffffff',
      timestamp: 0
    });
    setNewText('');
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center gap-2 mb-4">
        <Type className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Text Overlays</h3>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Enter text overlay"
          className="flex-1 px-3 py-2 border rounded-lg"
        />
        <button
          onClick={handleAddText}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          <Plus className="w-4 h-4" />
          Add
        </button>
      </div>

      <div className="space-y-2">
        {textOverlays.map((overlay) => (
          <div
            key={overlay.id}
            className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg"
          >
            <input
              type="text"
              value={overlay.text}
              onChange={(e) =>
                updateTextOverlay(overlay.id, { text: e.target.value })
              }
              className="flex-1 px-2 py-1 border rounded"
            />
            <input
              type="color"
              value={overlay.color}
              onChange={(e) =>
                updateTextOverlay(overlay.id, { color: e.target.value })
              }
              className="w-8 h-8 rounded cursor-pointer"
            />
            <button
              onClick={() => removeTextOverlay(overlay.id)}
              className="p-1 text-red-500 hover:bg-red-50 rounded"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}