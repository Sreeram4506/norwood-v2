export function PageHeader({ title, description }: { title: string; description?: string }) {
  return (
    <div className="service-counter relative isolate overflow-hidden border-b border-border">
      <div className="mx-auto max-w-7xl px-4 pb-12 pt-28 sm:px-6 sm:pt-36 lg:pt-40">
        <div className="max-w-3xl">
          <h1 className="font-display text-4xl font-black leading-[1.02] sm:text-6xl">{title}</h1>
          {description && (
            <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
