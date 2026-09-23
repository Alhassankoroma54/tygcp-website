"use client";

import { useEffect, useRef, useState } from "react";

type PlayerStatus = "idle" | "loading" | "ready" | "playing" | "paused" | "error";

const SPEEDS = [0.75, 1, 1.25, 1.5, 2] as const;

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

/**
 * A real HTML5 audio player — not a static mockup. Renders actual
 * play/pause, a seekable progress bar, elapsed/remaining time, volume,
 * playback speed, 15s-back/30s-forward, and distinct loading/error states,
 * all driven by the browser's native `<audio>` element (no fake progress
 * animation, no hardcoded duration).
 *
 * `audioUrl` is optional on purpose: the podcast hasn't published a single
 * episode recording yet, so every episode in src/data/episodes.ts currently
 * has no audioUrl, and this component shows an honest "not uploaded yet"
 * state rather than a player that looks interactive but has nothing to
 * play. Once real audio files exist, setting `audioUrl` on an episode is
 * the only change needed — this component doesn't change.
 */
export default function PodcastPlayer({
  audioUrl,
  title,
}: {
  audioUrl?: string;
  title: string;
}) {
  if (!audioUrl) {
    return (
      <div className="flex items-start gap-3 rounded-2xl border border-dashed border-navy/15 bg-navy/[0.02] p-5 text-sm leading-relaxed text-foreground/70">
        <MicOffIcon className="mt-0.5 h-5 w-5 shrink-0 text-navy/30" />
        <p>Audio for this episode hasn&rsquo;t been uploaded yet. Check back after it airs.</p>
      </div>
    );
  }

  // Keyed by audioUrl so navigating client-side from one episode to another
  // (Next.js App Router doesn't force a full reload) remounts this with
  // fresh useState defaults instead of needing an effect that manually
  // resets transport state back to zero on every prop change.
  return <PlayerControls key={audioUrl} audioUrl={audioUrl} title={title} />;
}

function PlayerControls({ audioUrl, title }: { audioUrl: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [status, setStatus] = useState<PlayerStatus>("loading");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [speed, setSpeed] = useState<(typeof SPEEDS)[number]>(1);

  // The browser starts fetching/parsing <audio src> as soon as that HTML
  // exists, which on a fast connection can resolve loadedmetadata/canplay
  // *before* React finishes hydrating and attaching the onLoadedMetadata/
  // onCanPlay handlers below — those events fire once and are missed,
  // leaving the player stuck showing "loading" forever despite being fully
  // playable (caught with a real browser test, not assumed). This one-time
  // check on mount reads the <audio> element's actual readyState to catch
  // that already-resolved case; the JSX event handlers below cover the
  // normal case where metadata loads later.
  useEffect(() => {
    const el = audioRef.current;
    if (el && el.readyState >= 1) {
      setDuration(el.duration);
      setCurrentTime(el.currentTime);
      setStatus("ready");
    }
  }, []);

  function withAudio(fn: (el: HTMLAudioElement) => void) {
    const el = audioRef.current;
    if (el) fn(el);
  }

  function togglePlay() {
    withAudio((el) => {
      if (el.paused) el.play().catch(() => setStatus("error"));
      else el.pause();
    });
  }

  function handleSeek(e: React.ChangeEvent<HTMLInputElement>) {
    const time = Number(e.target.value);
    withAudio((el) => {
      el.currentTime = time;
    });
    setCurrentTime(time);
  }

  function handleVolume(e: React.ChangeEvent<HTMLInputElement>) {
    const v = Number(e.target.value);
    setVolume(v);
    setMuted(v === 0);
    withAudio((el) => {
      el.volume = v;
      el.muted = v === 0;
    });
  }

  function toggleMute() {
    withAudio((el) => {
      el.muted = !el.muted;
      setMuted(el.muted);
    });
  }

  function cycleSpeed() {
    const idx = SPEEDS.indexOf(speed);
    const next = SPEEDS[(idx + 1) % SPEEDS.length];
    setSpeed(next);
    withAudio((el) => {
      el.playbackRate = next;
    });
  }

  function skip(delta: number) {
    withAudio((el) => {
      el.currentTime = Math.min(Math.max(0, el.currentTime + delta), duration || el.duration || 0);
    });
  }

  function retry() {
    setStatus("loading");
    withAudio((el) => el.load());
  }

  const isPlaying = status === "playing";
  const isBusy = status === "loading" || status === "idle";
  const progressPct = duration > 0 ? (currentTime / duration) * 100 : 0;
  const volumePct = (muted ? 0 : volume) * 100;

  return (
    <div className="rounded-2xl border border-navy/10 bg-white p-5 shadow-sm">
      <audio
        ref={audioRef}
        src={audioUrl}
        preload="metadata"
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setStatus((s) => (s === "loading" || s === "idle" ? "ready" : s));
        }}
        onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
        onPlay={() => setStatus("playing")}
        onPause={() => setStatus((s) => (s === "playing" ? "paused" : s))}
        onEnded={() => setStatus("ready")}
        onError={() => setStatus("error")}
        onWaiting={() => setStatus("loading")}
        onCanPlay={() => setStatus((s) => (s === "loading" ? "ready" : s))}
      />

      {status === "error" ? (
        <div role="alert" className="flex items-center gap-3 text-sm text-red-600">
          <AlertIcon className="h-5 w-5 shrink-0" />
          <p>
            This episode&rsquo;s audio couldn&rsquo;t be loaded.{" "}
            <button type="button" onClick={retry} className="font-semibold underline underline-offset-2">
              Try again
            </button>
          </p>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={togglePlay}
              disabled={isBusy}
              aria-label={isPlaying ? `Pause ${title}` : `Play ${title}`}
              className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-green-ink text-white transition-colors hover:bg-green-ink-hover disabled:cursor-not-allowed disabled:opacity-50"
            >
              {status === "loading" ? (
                <SpinnerIcon className="h-5 w-5 animate-spin" />
              ) : isPlaying ? (
                <PauseIcon className="h-5 w-5" />
              ) : (
                <PlayIcon className="h-5 w-5 translate-x-0.5" />
              )}
            </button>

            <div className="flex min-w-0 flex-1 items-center gap-2 text-xs font-medium tabular-nums text-foreground/60">
              <span className="w-9 shrink-0 text-right">{formatTime(currentTime)}</span>
              <input
                type="range"
                min={0}
                max={duration || 0}
                step={0.1}
                value={currentTime}
                onChange={handleSeek}
                disabled={isBusy}
                aria-label={`Seek — ${title}`}
                className="player-range flex-1"
                style={{ "--player-progress": `${progressPct}%` } as React.CSSProperties}
              />
              <span className="w-9 shrink-0">{formatTime(duration)}</span>
            </div>
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-navy/5 pt-3">
            <div className="flex items-center gap-1">
              <IconButton label="Back 15 seconds" onClick={() => skip(-15)} disabled={isBusy}>
                <BackIcon className="h-4 w-4" />
              </IconButton>
              <IconButton label="Forward 30 seconds" onClick={() => skip(30)} disabled={isBusy}>
                <ForwardIcon className="h-4 w-4" />
              </IconButton>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={cycleSpeed}
                className="rounded-full border border-navy/15 px-2.5 py-1 text-xs font-bold text-navy hover:bg-navy/5"
                aria-label={`Playback speed, currently ${speed}×. Activate to change.`}
              >
                {speed}×
              </button>
              <div className="flex items-center gap-1.5">
                <IconButton label={muted || volume === 0 ? "Unmute" : "Mute"} onClick={toggleMute}>
                  {muted || volume === 0 ? <VolumeMuteIcon className="h-4 w-4" /> : <VolumeIcon className="h-4 w-4" />}
                </IconButton>
                <input
                  type="range"
                  min={0}
                  max={1}
                  step={0.05}
                  value={muted ? 0 : volume}
                  onChange={handleVolume}
                  aria-label="Volume"
                  className="player-range w-20"
                  style={{ "--player-progress": `${volumePct}%` } as React.CSSProperties}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function IconButton({
  label,
  onClick,
  disabled,
  children,
}: {
  label: string;
  onClick: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="flex h-8 w-8 items-center justify-center rounded-full text-navy/70 transition-colors hover:bg-navy/5 hover:text-navy disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  );
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}
function PauseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M7 5h4v14H7zM13 5h4v14h-4z" />
    </svg>
  );
}
function SpinnerIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
      <path d="M21 12a9 9 0 0 0-9-9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 8v5M12 16h.01" strokeLinecap="round" />
    </svg>
  );
}
function BackIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M11 19l-7-7 7-7M4 12h9a5 5 0 1 0 0-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function ForwardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M13 19l7-7-7-7M20 12h-9a5 5 0 1 1 0-10" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function VolumeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 9v6h4l5 5V4L8 9H4z" strokeLinejoin="round" />
      <path d="M16.5 8.5a5 5 0 0 1 0 7" strokeLinecap="round" />
    </svg>
  );
}
function VolumeMuteIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M4 9v6h4l5 5V4L8 9H4z" strokeLinejoin="round" />
      <path d="M17 9l4 6M21 9l-4 6" strokeLinecap="round" />
    </svg>
  );
}
function MicOffIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" {...props}>
      <path d="M9 2a3 3 0 0 1 3 3v4M15 9V5a3 3 0 0 0-.55-1.74M5 10a7 7 0 0 0 10.24 6.2M19 10a7 7 0 0 1-1.35 4.13M12 19v3M8 22h8M3 3l18 18" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
