import React from 'react';
import { useEditorStore } from '../../store/editorStore';
import { Volume2, VolumeX } from 'lucide-react';

export function AudioControls() {
  const { audioSettings, updateAudioSettings } = useEditorStore();

  return (
    <div className="bg-white p-4 rounded-lg shadow mt-4">
      <div className="flex items-center gap-4">
        <button
          onClick={() => updateAudioSettings({ muted: !audioSettings.muted })}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          {audioSettings.muted ? (
            <VolumeX className="w-5 h-5" />
          ) : (
            <Volume2 className="w-5 h-5" />
          )}
        </button>
        
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={audioSettings.volume}
          onChange={(e) =>
            updateAudioSettings({ volume: parseFloat(e.target.value) })
          }
          className="flex-1"
        />
        
        <span className="text-sm text-gray-600">
          {Math.round(audioSettings.volume * 100)}%
        </span>
      </div>
    </div>
  );
}