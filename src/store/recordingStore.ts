import { create } from 'zustand';

interface RecordingState {
  isRecording: boolean;
  recordingType: 'webcam' | 'screen' | null;
  mediaRecorder: MediaRecorder | null;
  recordedChunks: Blob[];
  recordedVideo: string | null;
  setIsRecording: (isRecording: boolean) => void;
  setRecordingType: (type: 'webcam' | 'screen' | null) => void;
  setMediaRecorder: (recorder: MediaRecorder | null) => void;
  addRecordedChunk: (chunk: Blob) => void;
  clearRecordedChunks: () => void;
  setRecordedVideo: (url: string | null) => void;
}

export const useRecordingStore = create<RecordingState>((set) => ({
  isRecording: false,
  recordingType: null,
  mediaRecorder: null,
  recordedChunks: [],
  recordedVideo: null,
  setIsRecording: (isRecording) => set({ isRecording }),
  setRecordingType: (type) => set({ recordingType: type }),
  setMediaRecorder: (recorder) => set({ mediaRecorder: recorder }),
  addRecordedChunk: (chunk) => 
    set((state) => ({ recordedChunks: [...state.recordedChunks, chunk] })),
  clearRecordedChunks: () => set({ recordedChunks: [] }),
  setRecordedVideo: (url) => set({ recordedVideo: url }),
}));