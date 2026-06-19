import { Lightbulb } from "lucide-react";
import type { Subject } from "../types";

interface StudyStrategyProps {
  subjects: Subject[];
}

export function StudyStrategy({ subjects }: StudyStrategyProps) {
  return (
    <section className="rounded-[2rem] border border-white/80 bg-white/85 p-5 shadow-soft">
      <div className="mb-5 flex items-center gap-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
          <Lightbulb className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-slate-950">Chiến lược học</h2>
          <p className="text-sm text-slate-500">Cách ôn phù hợp cho từng môn.</p>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2">
        {subjects.map((subject) => (
          <article key={subject.id} className="rounded-3xl border border-slate-100 bg-slate-50/80 p-4">
            <div className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: subject.color }} />
              <h3 className="font-bold text-slate-950">{subject.name}</h3>
            </div>
            <p className="mt-2 text-sm leading-6 text-slate-600">{subject.strategy}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
