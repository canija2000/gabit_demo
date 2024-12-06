import  { useRef, useState } from 'react';
import { ProjectForm } from './components/ProjectForm';
import { ShareableImage } from './components/ShareableImage';
import { FormData } from './types/form';

import * as htmlToImage from 'html-to-image';

export default function App() {
  const [formData, setFormData] = useState<FormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const imageRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (data: FormData) => {
    setFormData(data);

    setIsGenerating(true);
    
    // 
    setTimeout(async () => {
      if (imageRef.current) {
        try {
          const dataUrl = await htmlToImage.toCanvas(imageRef.current, {
            quality: 1.0,
            pixelRatio: 2,
            skipAutoScale: true,
            cacheBust: true,
          }).then(canvas => canvas.toDataURL('image/png'));

          const link = document.createElement('a');
          link.download = `${data.name}-gabit-share.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error('Error generating image:', error);
        } finally {
          setIsGenerating(false);
        }
      }
    }, 500); // para que renderize [mas seguro*]
  };

  return (
    <div className="bg-slate-100  p-3 min-h-screen flex">
    <div className="max-w-2xl w-full">
      <ProjectForm onSubmit={handleSubmit} isGenerating={isGenerating} />
      {formData && (
        <div className="fixed left-0 top-0 opacity-0 pointer-events-none">
          <ShareableImage ref={imageRef} data={formData} />
        </div>
      )}
    </div>
   
  </div>
);
}