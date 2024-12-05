import React from 'react';
import { Timeline } from './Timeline';
import { TextOverlayEditor } from './TextOverlayEditor';
import { AudioControls } from './AudioControls';
import { TrimControls } from './TrimControls';
import { useRecordingStore } from '../../store/recordingStore';
import { useEditorStore } from '../../store/editorStore';

export function VideoEditor() {
  const { recordedVideo } = useRecordingStore();
  const { clips, selectedClipId } = useEditorStore();

  if (!recordedVideo && clips.length === 0) return null;

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Video Editor</h2>
      <Timeline />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {selectedClipId && <TrimControls clipId={selectedClipId} />}
        <TextOverlayEditor />
        <AudioControls />
      </div>
    </div>
  );
}