import React from 'react';
import { Camera, MonitorUp } from 'lucide-react';
import { RecordingControls } from './components/RecordingControls';
import { VideoPreview } from './components/VideoPreview';
import { VideoEditor } from './components/VideoEditor';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Camera className="h-8 w-8 text-blue-500" />
              <MonitorUp className="h-8 w-8 text-green-500" />
              <h1 className="text-2xl font-bold text-gray-900">Screen & Webcam Recorder</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              Record your screen or webcam with ease
            </h2>
            <p className="text-gray-600">
              Choose your recording source and click the button to start recording
            </p>
          </div>

          <RecordingControls />
          <VideoPreview />
          <VideoEditor />
        </div>
      </main>
    </div>
  );
}

export default App;