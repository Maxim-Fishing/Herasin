import { Children, type ReactNode } from "react";

/**
 * Cuadrícula de tarjetas que se CENTRA cuando hay pocas: con 1 o 2 productos
 * no deja la mitad de la fila vacía como lo haría un grid de 4 columnas.
 * 2 por fila en celular, 3 en tablet y 4 en escritorio.
 */
export default function CardGrid({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-4 md:gap-6 ${className}`}>
      {Children.map(children, (child) => (
        <div className="w-[calc(50%-0.5rem)] md:w-[calc(33.333%-1rem)] lg:w-[calc(25%-1.125rem)]">{child}</div>
      ))}
    </div>
  );
}
