import React from 'react';
import { Camera, Monitor, StopCircle } from 'lucide-react';
import { useRecordingStore } from '../store/recordingStore';
import { useEditorStore } from '../store/editorStore';
import { startMediaRecording, startScreenRecording, createMediaRecorder } from '../lib/utils';

export function RecordingControls() {
  const {
    isRecording,
    recordingType,
    setIsRecording,
    setRecordingType,
    setMediaRecorder,
    addRecordedChunk,
    clearRecordedChunks,
    setRecordedVideo
  } = useRecordingStore();

  const { addClip } = useEditorStore();

  const startRecording = async (type: 'webcam' | 'screen') => {
    try {
      clearRecordedChunks();
      setRecordedVideo(null);
      
      const stream = type === 'webcam'
        ? await startMediaRecording({ video: true, audio: true })
        : await startScreenRecording();

      const mediaRecorder = createMediaRecorder(stream, (event) => {
        if (event.data.size > 0) {
          addRecordedChunk(event.data);
        }
      });

      mediaRecorder.onstop = () => {
        const recordedBlob = new Blob(useRecordingStore.getState().recordedChunks, {
          type: 'video/webm'
        });
        const url = URL.createObjectURL(recordedBlob);
        setRecordedVideo(url);
        
        // Add the clip to the editor
        addClip({
          id: crypto.randomUUID(),
          startTime: 0,
          endTime: 0, // Will be updated once video metadata is loaded
          blob: recordedBlob,
          url
        });
        
        stream.getTracks().forEach(track => track.stop());
      };

      setMediaRecorder(mediaRecorder);
      setRecordingType(type);
      setIsRecording(true);
      mediaRecorder.start();
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = () => {
    const { mediaRecorder } = useRecordingStore.getState();
    if (mediaRecorder && mediaRecorder.state !== 'inactive') {
      mediaRecorder.stop();
      setIsRecording(false);
      setRecordingType(null);
      setMediaRecorder(null);
    }
  };

  return (
    <div className="flex gap-4 justify-center mt-4">
      <button
        onClick={() => startRecording('webcam')}
        disabled={isRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isRecording && recordingType === 'webcam'
            ? 'bg-red-500 text-white'
            : 'bg-blue-500 hover:bg-blue-600 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Camera size={20} />
        Webcam
      </button>

      <button
        onClick={() => startRecording('screen')}
        disabled={isRecording}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
          isRecording && recordingType === 'screen'
            ? 'bg-red-500 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
      >
        <Monitor size={20} />
        Screen
      </button>

      {isRecording && (
        <button
          onClick={stopRecording}
          className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white"
        >
          <StopCircle size={20} />
          Stop
        </button>
      )}
    </div>
  );
}