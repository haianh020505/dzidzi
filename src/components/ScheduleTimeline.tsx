import { CalendarDays, GraduationCap } from "lucide-react";
import type { StudyDay, StudySession, Subject, ViewMode } from "../types";
import { StudySessionCard } from "./StudySessionCard";

interface ScheduleTimelineProps {
  days: StudyDay[];
  sessions: StudySession[];
  subjects: Subject[];
  view: ViewMode;
  isCompleted: (sessionId: string) => boolean;
  getNote: (sessionId: string) => string;
  onToggle: (sessionId: string) => void;
  onNoteChange: (sessionId: string, note: string) => void;
  getDaysUntil: (date: string) => number;
}

export function ScheduleTimeline({
  days,
  sessions,
  subjects,
  view,
  isCompleted,
  getNote,
  onToggle,
  onNoteChange,
  getDaysUntil,
}: ScheduleTimelineProps) {
  const subjectMap = new Map(subjects.map((subject) => [subject.id, subject]));

  if (view === "subject") {
    return (
      <section className="space-y-4">
        {subjects.map((subject) => {
          const subjectSessions = sessions.filter((session) => session.subjectId === subject.id);
          if (subjectSessions.length === 0) return null;
          return (
            <article key={subject.id} className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
              <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{subject.name}</h2>
                  <p className="text-sm text-slate-500">Ngày thi: {new Date(subject.examDate).toLocaleDateString("vi-VN")}</p>
                </div>
                <span className="rounded-full px-3 py-1 text-sm font-bold" style={{ backgroundColor: subject.softColor, color: subject.textColor }}>
                  {subjectSessions.filter((session) => isCompleted(session.id)).length}/{subjectSessions.length} buổi
                </span>
              </div>
              <div className="grid gap-3 lg:grid-cols-2">
                {subjectSessions.map((session) => (
                  <StudySessionCard
                    key={session.id}
                    session={session}
                    subject={subject}
                    completed={isCompleted(session.id)}
                    note={getNote(session.id)}
                    onToggle={onToggle}
                    onNoteChange={onNoteChange}
                  />
                ))}
              </div>
            </article>
          );
        })}
      </section>
    );
  }

  if (view === "upcoming") {
    return (
      <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
        <div className="mb-5 flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-rose-600" />
          <h2 className="text-xl font-bold text-slate-950">Các môn sắp thi</h2>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          {subjects
            .filter((subject) => getDaysUntil(subject.examDate) >= 0)
            .sort((a, b) => a.examDate.localeCompare(b.examDate))
            .map((subject) => (
              <article key={subject.id} className="rounded-3xl border border-slate-100 bg-white p-4 shadow-sm">
                <span className="rounded-full px-3 py-1 text-xs font-bold" style={{ backgroundColor: subject.softColor, color: subject.textColor }}>
                  {getDaysUntil(subject.examDate)} ngày nữa
                </span>
                <h3 className="mt-4 text-lg font-bold text-slate-950">{subject.name}</h3>
                <p className="mt-2 text-sm text-slate-500">{new Date(subject.examDate).toLocaleDateString("vi-VN")}</p>
              </article>
            ))}
        </div>
      </section>
    );
  }

  return (
    <section className="space-y-4">
      {days.length === 0 ? (
        <div className="rounded-[2rem] border border-white/80 bg-white/85 p-8 text-center text-sm text-slate-500 shadow-soft">
          Không có ca học phù hợp với bộ lọc hiện tại.
        </div>
      ) : (
        days.map((studyDay) => (
          <article key={studyDay.date} className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-sky-700">
                  <CalendarDays className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-950">{studyDay.label}</h2>
                  <p className="text-sm text-slate-500">{new Date(studyDay.date).toLocaleDateString("vi-VN", { weekday: "long" })}</p>
                </div>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-bold text-slate-600">
                {studyDay.sessions.filter((session) => isCompleted(session.id)).length}/{studyDay.sessions.length} hoàn thành
              </span>
            </div>

            <div className="grid gap-3 xl:grid-cols-3">
              {studyDay.sessions.map((session) => (
                <StudySessionCard
                  key={session.id}
                  session={session}
                  subject={session.subjectId ? subjectMap.get(session.subjectId) : undefined}
                  completed={isCompleted(session.id)}
                  note={getNote(session.id)}
                  onToggle={onToggle}
                  onNoteChange={onNoteChange}
                />
              ))}
            </div>
          </article>
        ))
      )}
    </section>
  );
}
