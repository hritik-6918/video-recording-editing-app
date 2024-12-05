import { create } from 'zustand';
import { VideoClip, TextOverlay, AudioSettings } from '../types';

interface EditorState {
  clips: VideoClip[];
  selectedClipId: string | null;
  textOverlays: TextOverlay[];
  audioSettings: AudioSettings;
  addClip: (clip: VideoClip) => void;
  removeClip: (id: string) => void;
  setSelectedClipId: (id: string | null) => void;
  updateClipTrim: (id: string, startTime: number, endTime: number) => void;
  addTextOverlay: (overlay: TextOverlay) => void;
  removeTextOverlay: (id: string) => void;
  updateTextOverlay: (id: string, updates: Partial<TextOverlay>) => void;
  updateAudioSettings: (settings: Partial<AudioSettings>) => void;
}

export const useEditorStore = create<EditorState>((set) => ({
  clips: [],
  selectedClipId: null,
  textOverlays: [],
  audioSettings: {
    volume: 1,
    muted: false,
  },
  addClip: (clip) => set((state) => ({ 
    clips: [...state.clips, clip],
    selectedClipId: clip.id
  })),
  removeClip: (id) => set((state) => ({
    clips: state.clips.filter((clip) => clip.id !== id),
    selectedClipId: state.selectedClipId === id ? null : state.selectedClipId
  })),
  setSelectedClipId: (id) => set({ selectedClipId: id }),
  updateClipTrim: (id, startTime, endTime) => set((state) => ({
    clips: state.clips.map((clip) =>
      clip.id === id ? { ...clip, startTime, endTime } : clip
    ),
  })),
  addTextOverlay: (overlay) => set((state) => ({
    textOverlays: [...state.textOverlays, overlay]
  })),
  removeTextOverlay: (id) => set((state) => ({
    textOverlays: state.textOverlays.filter((overlay) => overlay.id !== id)
  })),
  updateTextOverlay: (id, updates) => set((state) => ({
    textOverlays: state.textOverlays.map((overlay) =>
      overlay.id === id ? { ...overlay, ...updates } : overlay
    ),
  })),
  updateAudioSettings: (settings) => set((state) => ({
    audioSettings: { ...state.audioSettings, ...settings }
  })),
}));