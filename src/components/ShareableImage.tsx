import { forwardRef } from "react";
import { FormData } from "../types/form";

interface ShareableImageProps {
  data: FormData;
}

// esto es lo que se renderiza en la img

export const ShareableImage = forwardRef<HTMLDivElement, ShareableImageProps>(
  ({ data }, ref) => {
    return (
      <div
        ref={ref}
        className="w-[450px] h-1200px p-6  text-white space-y-4"
        style={{
          fontFamily: "Sora, sans-serif",
          position: "relative",
          overflow: "hidden",
          backgroundColor: "#992336",
        }}
      >
        {/* Header */}
        <div className="flex items-center space-x-4 mb-4">
          <h1 className="text-3xl font-bold">gabit</h1>
          <div className="h-10 w-0.5 bg-white"></div>
          <div className="w-[10rem]">
            <p className="text-lg pt-2">galería de biomateriales textiles</p>
          </div>
        </div>
        <div
          className="space-y-3  p-3"
          style={{
            backgroundColor: "#682336",
          }}
        >
          <div>
            {/* Formulario  Tipo proyecto */}
            <p className="text-lg p-3 ">{data.projectType}</p>
          </div>
          {/* Formulario  Nombre */}
          <p className="text-xl font-semibold">{data.name}</p>

          {/* Formulario  Foto */}
          {data.photo && (
            <div className="relative w-full h-48 mb-4">
              <img
                src={data.photo}
                alt="Project"
                className="w-full h-full object-cover"
                crossOrigin="anonymous"
              />
            </div>
          )}

          <div className="space-y-2">
            {/* Formulario  Descripción  y otros */}
            <p className="text-md pb-3">{data.description}</p>
            <p className="text-sm">Región: {data.region}</p>
            <p className="text-sm">Biopolímero: {data.biopolymer}</p>
          </div>
        </div>

        <p className="text-sm font-bold mt-4 ps-3">#biotextil chileno</p>
      </div>
    );
  }
);
