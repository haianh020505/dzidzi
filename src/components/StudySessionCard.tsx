import { CheckCircle2, Clock, FileText, GraduationCap, StickyNote } from "lucide-react";
import type { StudySession, Subject } from "../types";

interface StudySessionCardProps {
  session: StudySession;
  subject?: Subject;
  completed: boolean;
  note: string;
  onToggle: (sessionId: string) => void;
  onNoteChange: (sessionId: string, note: string) => void;
}

export function StudySessionCard({
  session,
  subject,
  completed,
  note,
  onToggle,
  onNoteChange,
}: StudySessionCardProps) {
  const accent = subject?.color ?? "#cbd5e1";
  const soft = subject?.softColor ?? "#f1f5f9";
  const text = subject?.textColor ?? "#475569";

  return (
    <article
      className={`rounded-3xl border bg-white p-4 shadow-sm transition-all ${
        completed ? "border-emerald-200 bg-emerald-50/70" : "border-slate-200 hover:-translate-y-0.5 hover:shadow-soft"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={() => onToggle(session.id)}
          className={`mt-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border transition ${
            completed ? "border-emerald-500 bg-emerald-500 text-white" : "border-slate-300 bg-white text-transparent"
          }`}
          aria-label={completed ? "Bỏ đánh dấu hoàn thành" : "Đánh dấu hoàn thành"}
        >
          <CheckCircle2 className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600">
              <Clock className="h-3.5 w-3.5" />
              Ca {session.slot} · {session.time}
            </span>
            <span
              className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: soft, color: text }}
            >
              {session.isExam ? <GraduationCap className="h-3.5 w-3.5" /> : <FileText className="h-3.5 w-3.5" />}
              {session.subjectName}
            </span>
            {completed && <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-700">Completed</span>}
          </div>

          <p className={`mt-3 text-sm leading-6 ${completed ? "text-slate-500 line-through decoration-emerald-500/50" : "text-slate-700"}`}>
            {session.content}
          </p>

          <label className="mt-4 block">
            <span className="mb-2 flex items-center gap-1.5 text-xs font-semibold text-slate-500">
              <StickyNote className="h-3.5 w-3.5" />
              Note
            </span>
            <textarea
              value={note}
              onChange={(event) => onNoteChange(session.id, event.target.value)}
              placeholder="Ghi chú nhanh cho ca học này..."
              className="min-h-20 w-full rounded-2xl border border-slate-200 bg-white/80 px-3 py-2 text-sm text-slate-700 outline-none transition focus:border-sky-300 focus:ring-4 focus:ring-sky-100"
              style={{ boxShadow: `inset 3px 0 0 ${accent}` }}
            />
          </label>
        </div>
      </div>
    </article>
  );
}
