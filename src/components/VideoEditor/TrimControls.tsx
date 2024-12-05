import React, { useRef, useEffect } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { Scissors } from 'lucide-react';
import { cn } from '../../lib/utils';

export function TrimControls({ clipId }: { clipId: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const { clips, updateClipTrim } = useEditorStore();
  const clip = clips.find((c) => c.id === clipId);

  useEffect(() => {
    if (videoRef.current && clip) {
      videoRef.current.addEventListener('loadedmetadata', () => {
        updateClipTrim(clipId, clip.startTime, videoRef.current!.duration);
      });
    }
  }, [clipId, clip, updateClipTrim]);

  if (!clip) return null;

  const handleTrimChange = (type: 'start' | 'end', value: number) => {
    if (type === 'start') {
      updateClipTrim(clipId, value, clip.endTime);
    } else {
      updateClipTrim(clipId, clip.startTime, value);
    }
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <div className="flex items-center gap-2 mb-4">
        <Scissors className="w-5 h-5" />
        <h3 className="text-lg font-semibold">Trim Video</h3>
      </div>

      <video ref={videoRef} src={clip.url} className="hidden" />

      <div className="space-y-4">
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            Start Time (seconds)
          </label>
          <input
            type="range"
            min="0"
            max={clip.endTime}
            step="0.1"
            value={clip.startTime}
            onChange={(e) => handleTrimChange('start', parseFloat(e.target.value))}
            className={cn(
              "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
          />
          <span className="text-sm text-gray-600">{clip.startTime.toFixed(1)}s</span>
        </div>

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-gray-700">
            End Time (seconds)
          </label>
          <input
            type="range"
            min={clip.startTime}
            max={videoRef.current?.duration || 0}
            step="0.1"
            value={clip.endTime}
            onChange={(e) => handleTrimChange('end', parseFloat(e.target.value))}
            className={cn(
              "w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer",
              "focus:outline-none focus:ring-2 focus:ring-blue-500"
            )}
          />
          <span className="text-sm text-gray-600">{clip.endTime.toFixed(1)}s</span>
        </div>
      </div>
    </div>
  );
}