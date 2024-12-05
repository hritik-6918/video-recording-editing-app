import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { Scissors, Trash2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export function Timeline() {
  const { clips, selectedClipId, setSelectedClipId, removeClip } = useEditorStore();

  return (
    <div className="w-full bg-gray-800 p-4 rounded-lg mt-4">
      <div className="flex gap-2 overflow-x-auto pb-2">
        {clips.map((clip) => (
          <div
            key={clip.id}
            className="relative group"
          >
            <div
              onClick={() => setSelectedClipId(clip.id)}
              className={cn(
                "relative min-w-[200px] h-20 rounded cursor-pointer transition-all",
                "hover:ring-2 hover:ring-blue-300",
                selectedClipId === clip.id && "ring-2 ring-blue-500"
              )}
            >
              <video
                src={clip.url}
                className="w-full h-full object-cover rounded"
              />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedClipId(clip.id);
                    }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                  >
                    <Scissors className="w-4 h-4 text-white" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      removeClip(clip.id);
                    }}
                    className="p-1.5 rounded-full bg-white/20 hover:bg-red-500/50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-700">
              <div
                className="absolute h-full bg-blue-500"
                style={{
                  left: `${(clip.startTime / clip.endTime) * 100}%`,
                  right: `${100 - ((clip.endTime / clip.endTime) * 100)}%`
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}