
import { useState } from 'react';

export default function App() {
  const [texto, setTexto] = useState('');
  const [audioUrl, setAudioUrl] = useState('');

  const gerarLocucao = async () => {
    const response = await fetch("https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL", {
      method: "POST",
      headers: {
        "xi-api-key": import.meta.env.VITE_ELEVEN_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: texto,
        voice_settings: { stability: 0.5, similarity_boost: 0.75 }
      }),
    });

    const blob = await response.blob();
    setAudioUrl(URL.createObjectURL(blob));
  };

  return (
    <div className="min-h-screen bg-white text-black flex flex-col items-center justify-center gap-4 p-4">
      <h1 className="text-3xl font-bold">StreamWave - Locução</h1>
      <textarea
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="Digite o texto da locução..."
        className="w-full max-w-md h-40 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={gerarLocucao}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Gerar Locução
      </button>
      {audioUrl && <audio controls src={audioUrl} className="mt-4" />}
    </div>
  );
}
