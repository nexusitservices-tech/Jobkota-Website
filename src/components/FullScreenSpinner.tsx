export default function FullScreenSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-signal" />
        <p className="text-xs uppercase tracking-widest font-bold text-muted-foreground">
          Loading JobKota...
        </p>
      </div>
    </div>
  );
}
