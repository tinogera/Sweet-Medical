import { Skeleton } from "@heroui/react";
import TurnosPasados from "./TurnosPasados";

export default function TurnosPasadosSection({ loading, error, past }) {
  return error ? null : loading ? (
    <section className="flex flex-col gap-4">
      <div className="border-b border-border pb-4">
        <h2 className="font-sans text-2xl font-semibold text-surface-foreground">
          Turnos Pasados{" "}
          <span className="text-base font-normal text-muted ml-2">
            (Últimos 3 meses)
          </span>
        </h2>
      </div>
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="grid grid-cols-5 gap-4 p-4 border-b border-border bg-surface-secondary">
          <Skeleton className="h-4 w-16 rounded" />
          <Skeleton className="h-4 w-24 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-20 rounded" />
          <Skeleton className="h-4 w-16 rounded" />
        </div>
        {Array.from({ length: 3 }).map((_, i) => (
          <div
            key={i}
            className="grid grid-cols-5 gap-4 p-4 border-b border-border last:border-b-0 items-center"
          >
            <div className="flex flex-col gap-1">
              <Skeleton className="h-4 w-16 rounded" />
              <Skeleton className="h-3 w-12 rounded" />
            </div>
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-20 rounded" />
            <Skeleton className="h-4 w-28 rounded" />
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        ))}
      </div>
    </section>
  ) : (
    <TurnosPasados turnos={past} />
  );
}
