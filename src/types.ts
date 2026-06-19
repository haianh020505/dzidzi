export type SubjectStatus = "Chưa học" | "Đang học" | "Sắp thi" | "Đã thi";
export type CompletionFilter = "all" | "pending" | "completed";
export type ViewMode = "timeline" | "subject" | "today" | "upcoming";
export type PhaseId = "phase-1" | "phase-2" | "phase-3" | "final" | "all";

export interface Exam {
  subjectId: string;
  date: string;
}

export interface Subject {
  id: string;
  name: string;
  examDate: string;
  color: string;
  softColor: string;
  textColor: string;
  strategy: string;
}

export interface StudySession {
  id: string;
  date: string;
  slot: 1 | 2 | 3;
  time: string;
  subjectId: string | null;
  subjectName: string;
  content: string;
  phaseId: PhaseId;
  isExam?: boolean;
}

export interface StudyDay {
  date: string;
  label: string;
  phaseId: PhaseId;
  sessions: StudySession[];
}

export interface Phase {
  id: PhaseId;
  name: string;
  range: string;
}

export interface FilterState {
  subjectId: string;
  completion: CompletionFilter;
  phaseId: PhaseId;
  view: ViewMode;
}

export type CompletionMap = Record<string, boolean>;
export type NotesMap = Record<string, string>;
