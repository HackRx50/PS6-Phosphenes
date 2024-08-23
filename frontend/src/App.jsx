import React from 'react';
import PdfUploader from './components/uploader';

function App() {
  return (
    <div className="App">
      <header className="text-center my-8">
        <h1 className="text-3xl font-bold">PDF Text Extractor</h1>
      </header>
      <PdfUploader />
    </div>
  );
}

export default App;
