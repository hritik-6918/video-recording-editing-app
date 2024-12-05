export interface VideoClip {
  id: string;
  startTime: number;
  endTime: number;
  blob: Blob;
  url: string;
}

export interface TextOverlay {
  id: string;
  text: string;
  position: { x: number; y: number };
  fontSize: number;
  color: string;
  timestamp: number;
}

export interface AudioSettings {
  volume: number;
  muted: boolean;
}