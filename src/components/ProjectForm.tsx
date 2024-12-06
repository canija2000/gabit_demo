import React, { useState } from 'react';
import { FormData } from '../types/form';
import { Upload, Trash } from 'lucide-react';

const regionesChile = [
  "XV - Arica y Parinacota",
  "I - Tarapacá",
  "II - Antofagasta",
  "III - Atacama",
  "IV - Coquimbo",
  "V - Valparaíso",
  "RM - Metropolitana",
  "VI - O'Higgins",
  "VII - Maule",
  "VIII - Biobío",
  "IX - Araucanía",
  "XIV - Los Ríos",
  "X - Los Lagos",
  "XI - Aysén",
  "XII - Magallanes y Antártica"
];

interface ProjectFormProps {
  onSubmit: (data: FormData) => void;
  isGenerating: boolean;
}

export function ProjectForm({ onSubmit, isGenerating }: ProjectFormProps) {
  const [formData, setFormData] = useState<FormData>({
    projectType: '',
    name: '',
    photo: '',
    description: '',
    region: '',
    biopolymer: ''
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, photo: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, photo: '' }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="justify-start ms-3">
      <form onSubmit={handleSubmit} className=" bg-rose-700 px-4 pt-4 max-w-md w-full"
        style={{
          fontFamily: 'Sora, sans-serif',
          position: 'relative',
          overflow: 'hidden',
          backgroundColor: '#992336',
        }}>
         {/* Header   */}
        <div className="mb-4 flex p-4">
          <h1 className="text-3xl font-bold text-white mb-1 me-2 mt-3">gabit</h1>
          <hr style={{ transform: 'rotate(180deg)', width: '1px', height: '4.5rem', backgroundColor: 'white', border: 'none' }} />
          <p className="text-md text-white ms-2 flex w-10">galería de biomateriales textiles</p>
        </div>
        <div className='px-2 '
          style={{
            backgroundColor: "#682336",
          }}>

            {/* Formulario  Tipo proyecto */}
          <div>
            <label className="block text-white text-lg  p-1 pt-2">Selecciona el tipo de proyecto</label>
            <select
              value={formData.projectType}
              onChange={(e) => setFormData(prev => ({ ...prev, projectType: e.target.value }))}
              className="w-full p-2 bg-transparent border-b-2 border-slate-300 text-slate-300 placeholder-slate-300 focus:outline-none"
              required
              disabled={isGenerating}
            >
              <option value="">Selecciona una opción</option>
              <option value="textil">Textil</option>
              <option value="biomaterial">Biomaterial</option>
            </select>
          </div>

          {/* Formulario Nombre */}
          <div>
            <label className="block text-white text-lg  p-1 mt-3">Escribe tu nombre</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="w-full p-2 bg-transparent border-b-2 border-slate-300 text-slate-300 placeholder-slate-300 focus:outline-none"
              placeholder="Escribe el nombre y apellido de los autores"
              required
              disabled={isGenerating}
            />
          </div>

          {/* Formulario Foto */}
          <div>
            <label className="block text-white text-lg mb-1 p-1 mt-3">Sube una fotografía</label>
            <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center">
              {formData.photo ? (
                <div className="relative">
                  <img src={formData.photo} alt="Preview" className="max-h-32 mx-auto" />
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="absolute top-0 right-0 mt-2 mr-2 text-slate-300 hover:text-gray-200"
                  >
                    <Trash className="w-6 h-6" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Upload className="w-10 h-10 text-white mb-1" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                    id="photo-upload"
                    required
                    disabled={isGenerating}
                  />
                  <label
                    htmlFor="photo-upload"
                    className={`cursor-pointer text-white hover:text-gray-200 ${isGenerating ? 'opacity-50' : ''}`}
                  >
                    Click para subir imagen
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Formulario Descripción */}
          <div>
            <label className="block text-white text-lg mb-1 p-1 mt-3">Escribe una descripción breve</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-transparent border-b-2 border-slate-300 text-slate-300 placeholder-slate-300 focus:outline-none"
              rows={3}
              placeholder="Escribe una descripción breve"
              required
              disabled={isGenerating}
            />
          </div>
          
          {/* Formulario Región */}
          <div>
            <label className="block text-white text-lg  p-1 mt-2">Selecciona tu macroregión</label>
            <select
              value={formData.region}
              onChange={(e) => setFormData(prev => ({ ...prev, region: e.target.value }))}
              className="w-full p-2 bg-transparent border-b-2 border-slate-300 text-slate-300 placeholder-slate-300 focus:outline-none"
              required
              disabled={isGenerating}
            >
              <option value="">Selecciona una opción</option>
              {regionesChile.map((region) => (
                <option key={region} value={region}>{region}</option>
              ))}
            </select>
          </div>
              
            {/* Formulario Biopolímero */}
          <div className='pb-3'>
            <label className="block text-white text-lg  p-1 mt-4">Escribe el biopolímero principal</label>
            <input
              type="text"
              value={formData.biopolymer}
              onChange={(e) => setFormData(prev => ({ ...prev, biopolymer: e.target.value }))}
              className="w-full p-2 bg-transparent border-b-2 border-slate-300 text-slate-300 placeholder-slate-300 focus:outline-none"
              placeholder="Escribe aquí"
              required
              disabled={isGenerating}
            />
          </div>
        </div>
        
        {/* Botón Descargar */}
        <button
        type="submit"
        className=" w-full max-w-md bg-gray-900 text-white  text-lg hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={isGenerating}
      >
        {isGenerating ? 'Generando imagen...' : 'Descargar'}
      </button>
      </form>
      
    </div>
  );
}