import { useMemo, useState } from 'react';
import { Loader2, RefreshCw, Sparkles } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useGreeting } from '@/hooks/useGreeting';

export default function HomePage() {
  const [draftName, setDraftName] = useState('');
  const [submittedName, setSubmittedName] = useState<string | undefined>(undefined);

  const trimmedDraftName = useMemo(() => draftName.trim(), [draftName]);
  const greetingQuery = useGreeting(submittedName);

  const handleSubmit = () => {
    setSubmittedName(trimmedDraftName || undefined);
  };

  const handleReset = () => {
    setDraftName('');
    setSubmittedName(undefined);
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-muted/40 px-4 py-12">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_45%),radial-gradient(circle_at_bottom,_rgba(161,161,170,0.12),_transparent_30%)] dark:bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.08),_transparent_40%),radial-gradient(circle_at_bottom,_rgba(255,255,255,0.05),_transparent_25%)]" />

      <Card className="relative w-full max-w-2xl border border-border/60 bg-card/95 shadow-2xl backdrop-blur">
        <CardHeader className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Sparkles className="size-4" />
            React + shadcn/ui + TanStack Query
          </div>
          <CardTitle className="text-3xl">Hello world, but polished.</CardTitle>
          <CardDescription className="max-w-xl text-base leading-relaxed">
            This frontend fetches a server-generated greeting from <code className="rounded bg-muted px-1.5 py-0.5 text-sm">/api/greeting</code>
            {' '}and lets you personalize it with a name.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid gap-3 sm:grid-cols-[1fr_auto_auto]">
            <Input
              aria-label="Name"
              placeholder="Enter a name for the greeting"
              value={draftName}
              onChange={(event) => setDraftName(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  handleSubmit();
                }
              }}
            />
            <Button onClick={handleSubmit}>Update greeting</Button>
            <Button variant="outline" onClick={handleReset}>
              Reset
            </Button>
          </div>

          <div className="rounded-2xl border border-border/70 bg-muted/30 p-6">
            {greetingQuery.isLoading ? (
              <div className="flex items-center gap-3 text-muted-foreground">
                <Loader2 className="size-4 animate-spin" />
                Fetching a fresh greeting...
              </div>
            ) : greetingQuery.isError ? (
              <div className="space-y-3">
                <p className="text-sm font-medium text-destructive">Could not load the greeting.</p>
                <p className="text-sm text-muted-foreground">
                  {greetingQuery.error instanceof Error ? greetingQuery.error.message : 'Unknown error'}
                </p>
                <Button variant="outline" onClick={() => void greetingQuery.refetch()}>
                  Try again
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2">
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-muted-foreground">
                    Current greeting
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
                    {greetingQuery.data?.message ?? 'No greeting loaded yet.'}
                  </h2>
                </div>
                <p className="text-sm text-muted-foreground">
                  Generated at{' '}
                  <span className="font-medium text-foreground">
                    {greetingQuery.data
                      ? new Date(greetingQuery.data.timestamp).toLocaleString()
                      : '—'}
                  </span>
                </p>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="flex flex-col items-start justify-between gap-3 border-border/70 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            {submittedName ? `Showing a personalized greeting for “${submittedName}”.` : 'Showing the default API greeting.'}
          </p>
          <Button variant="secondary" onClick={() => void greetingQuery.refetch()}>
            <RefreshCw className="size-4" />
            Refresh
          </Button>
        </CardFooter>
      </Card>
    </main>
  );
}
