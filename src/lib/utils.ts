import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function startMediaRecording(constraints: MediaStreamConstraints): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getUserMedia(constraints);
  } catch (error) {
    console.error('Error accessing media devices:', error);
    throw error;
  }
}

export async function startScreenRecording(): Promise<MediaStream> {
  try {
    return await navigator.mediaDevices.getDisplayMedia({
      video: {
        cursor: 'always'
      },
      audio: true
    });
  } catch (error) {
    console.error('Error accessing screen capture:', error);
    throw error;
  }
}

export function createMediaRecorder(stream: MediaStream, onDataAvailable: (event: BlobEvent) => void): MediaRecorder {
  const mediaRecorder = new MediaRecorder(stream);
  mediaRecorder.ondataavailable = onDataAvailable;
  return mediaRecorder;
}