import React from 'react';
import { useRecordingStore } from '../store/recordingStore';

export function VideoPreview() {
  const { recordedVideo } = useRecordingStore();

  if (!recordedVideo) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      <video
        src={recordedVideo}
        controls
        className="w-full rounded-lg shadow-lg"
      />
    </div>
  );
}