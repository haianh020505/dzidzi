import type { Phase, StudyDay, StudySession, Subject } from "../types";

export const todayIso = "2026-06-19";

export const phases: Phase[] = [
  { id: "phase-1", name: "Giai đoạn 1", range: "20/06 - 01/07" },
  { id: "phase-2", name: "Giai đoạn 2", range: "02/07 - 08/07" },
  { id: "phase-3", name: "Giai đoạn 3", range: "09/07 - 14/07" },
  { id: "final", name: "Giai đoạn thi cuối", range: "15/07 - 17/07" },
];

export const subjects: Subject[] = [
  {
    id: "pt-tkht",
    name: "PT và TKHT",
    examDate: "2026-07-01",
    color: "#93c5fd",
    softColor: "#dbeafe",
    textColor: "#1d4ed8",
    strategy: "Học bằng cách vẽ sơ đồ UML, use case, class diagram, sequence diagram.",
  },
  {
    id: "ai",
    name: "Nhập môn AI",
    examDate: "2026-07-01",
    color: "#c4b5fd",
    softColor: "#ede9fe",
    textColor: "#6d28d9",
    strategy: "Học bằng bảng so sánh thuật toán BFS, DFS, UCS, A*, greedy, ML metrics.",
  },
  {
    id: "lsd",
    name: "Lịch sử Đảng",
    examDate: "2026-07-04",
    color: "#fecdd3",
    softColor: "#ffe4e6",
    textColor: "#be123c",
    strategy: "Học theo đề cương, gạch ý, mốc thời gian.",
  },
  {
    id: "attt",
    name: "Nhập môn ATTT",
    examDate: "2026-07-07",
    color: "#99f6e4",
    softColor: "#ccfbf1",
    textColor: "#0f766e",
    strategy: "Học cả lý thuyết và bài tính RSA, Diffie-Hellman, hash, MAC.",
  },
  {
    id: "ppd",
    name: "PPD",
    examDate: "2026-07-08",
    color: "#fde68a",
    softColor: "#fef3c7",
    textColor: "#b45309",
    strategy: "Học theo tài liệu, tóm tắt chương, trả lời câu hỏi trọng tâm.",
  },
  {
    id: "qtptpm",
    name: "QTPTPM",
    examDate: "2026-07-15",
    color: "#bbf7d0",
    softColor: "#dcfce7",
    textColor: "#15803d",
    strategy: "Học bằng bảng so sánh Waterfall, Agile, Scrum, kiểm thử, quản lý dự án.",
  },
  {
    id: "toan-roi-rac",
    name: "Toán rời rạc",
    examDate: "2026-07-16",
    color: "#bfdbfe",
    softColor: "#eff6ff",
    textColor: "#2563eb",
    strategy: "Học bằng bài tập logic, tổ hợp, quan hệ, đồ thị, cây.",
  },
  {
    id: "ktmt",
    name: "KTMT",
    examDate: "2026-07-17",
    color: "#ddd6fe",
    softColor: "#f5f3ff",
    textColor: "#7c3aed",
    strategy: "Học bằng sơ đồ CPU, memory, cache, pipeline, I/O.",
  },
];

const timeSlots = {
  1: "09:00 - 11:00",
  2: "15:00 - 17:00",
  3: "21:00 - 23:00",
} as const;

const subjectByName = new Map(subjects.map((subject) => [subject.name, subject.id]));

function session(
  date: string,
  phaseId: StudySession["phaseId"],
  slot: StudySession["slot"],
  subjectName: string,
  content: string,
  isExam = false,
): StudySession {
  return {
    id: `${date}-${slot}`,
    date,
    slot,
    time: timeSlots[slot],
    subjectId: subjectByName.get(subjectName) ?? null,
    subjectName,
    content,
    phaseId,
    isExam,
  };
}

function day(date: string, label: string, phaseId: StudySession["phaseId"], items: Array<[StudySession["slot"], string, string, boolean?]>): StudyDay {
  return {
    date,
    label,
    phaseId,
    sessions: items.map(([slot, subjectName, content, isExam]) => session(date, phaseId, slot, subjectName, content, isExam)),
  };
}

export const scheduleDays: StudyDay[] = [
  day("2026-06-20", "20/06", "phase-1", [
    [1, "PT và TKHT", "Tổng quan môn, mô hình hóa hệ thống"],
    [2, "Nhập môn AI", "Tổng quan AI, agent, tìm kiếm"],
    [3, "Lịch sử Đảng", "Đọc đề cương, chia chương"],
  ]),
  day("2026-06-21", "21/06", "phase-1", [
    [1, "PT và TKHT", "Yêu cầu, use case, actor"],
    [2, "Nhập môn AI", "Search BFS, DFS, UCS"],
    [3, "Nhập môn ATTT", "Tổng quan an toàn thông tin"],
  ]),
  day("2026-06-22", "22/06", "phase-1", [
    [1, "PT và TKHT", "Biểu đồ use case và đặc tả use case"],
    [2, "Nhập môn AI", "Heuristic search, A*, greedy"],
    [3, "PPD", "Đọc tài liệu, lập checklist kiến thức"],
  ]),
  day("2026-06-23", "23/06", "phase-1", [
    [1, "PT và TKHT", "Class diagram, object diagram"],
    [2, "Nhập môn AI", "Logic, suy diễn, tri thức"],
    [3, "Lịch sử Đảng", "Chương 1"],
  ]),
  day("2026-06-24", "24/06", "phase-1", [
    [1, "PT và TKHT", "Sequence diagram, activity diagram"],
    [2, "Nhập môn AI", "Machine learning cơ bản"],
    [3, "Nhập môn ATTT", "Mã hóa đối xứng, bất đối xứng"],
  ]),
  day("2026-06-25", "25/06", "phase-1", [
    [1, "PT và TKHT", "Ôn toàn bộ sơ đồ UML"],
    [2, "Nhập môn AI", "Thuật toán học máy, đánh giá mô hình"],
    [3, "PPD", "Học phần lý thuyết chính"],
  ]),
  day("2026-06-26", "26/06", "phase-1", [
    [1, "PT và TKHT", "Làm đề, ôn câu hỏi"],
    [2, "Nhập môn AI", "Làm đề, ôn câu hỏi"],
    [3, "Lịch sử Đảng", "Chương 2"],
  ]),
  day("2026-06-27", "27/06", "phase-1", [
    [1, "PT và TKHT", "Chữa lỗi, học phần yếu"],
    [2, "Nhập môn AI", "Chữa lỗi, học phần yếu"],
    [3, "Nhập môn ATTT", "Hash, MAC, chữ ký số"],
  ]),
  day("2026-06-28", "28/06", "phase-1", [
    [1, "PT và TKHT", "Tổng ôn lần 1"],
    [2, "Nhập môn AI", "Tổng ôn lần 1"],
    [3, "PPD", "Tổng hợp ý chính"],
  ]),
  day("2026-06-29", "29/06", "phase-1", [
    [1, "PT và TKHT", "Làm đề trong điều kiện thi"],
    [2, "Nhập môn AI", "Làm đề trong điều kiện thi"],
    [3, "Lịch sử Đảng", "Chương 3"],
  ]),
  day("2026-06-30", "30/06", "phase-1", [
    [1, "PT và TKHT", "Tổng ôn lần cuối"],
    [2, "Nhập môn AI", "Tổng ôn lần cuối"],
    [3, "Nghỉ ngơi", "Chuẩn bị đồ thi, ngủ sớm"],
  ]),
  day("2026-07-01", "01/07", "phase-1", [
    [1, "PT và TKHT", "Thi / xem lại nhanh trước thi", true],
    [2, "Nhập môn AI", "Thi / nghỉ sau thi", true],
    [3, "Lịch sử Đảng", "Ôn nhẹ chương 1-2"],
  ]),
  day("2026-07-02", "02/07", "phase-2", [
    [1, "Lịch sử Đảng", "Chương 1-2"],
    [2, "Lịch sử Đảng", "Chương 3-4"],
    [3, "Nhập môn ATTT", "Mã hóa, hash, MAC"],
  ]),
  day("2026-07-03", "03/07", "phase-2", [
    [1, "Lịch sử Đảng", "Ôn đề cương"],
    [2, "Lịch sử Đảng", "Câu hỏi trọng tâm"],
    [3, "Lịch sử Đảng", "Tổng ôn, học ý chính"],
  ]),
  day("2026-07-04", "04/07", "phase-2", [
    [1, "Lịch sử Đảng", "Thi Lịch sử Đảng", true],
    [2, "Nghỉ ngơi", "Nghỉ sau thi"],
    [3, "Nhập môn ATTT", "Tổng quan và câu hỏi lý thuyết"],
  ]),
  day("2026-07-05", "05/07", "phase-2", [
    [1, "Nhập môn ATTT", "Mã hóa cổ điển, đối xứng"],
    [2, "Nhập môn ATTT", "RSA, Diffie-Hellman, chữ ký số"],
    [3, "PPD", "Học phần 1"],
  ]),
  day("2026-07-06", "06/07", "phase-2", [
    [1, "Nhập môn ATTT", "Hash, MAC, tấn công cơ bản"],
    [2, "Nhập môn ATTT", "Làm đề và chữa đề"],
    [3, "PPD", "Học phần 2"],
  ]),
  day("2026-07-07", "07/07", "phase-2", [
    [1, "Nhập môn ATTT", "Thi Nhập môn ATTT", true],
    [2, "Nghỉ ngơi", "Nghỉ sau thi"],
    [3, "PPD", "Tổng ôn nhẹ"],
  ]),
  day("2026-07-08", "08/07", "phase-2", [
    [1, "PPD", "Thi PPD", true],
    [2, "Nghỉ ngơi", "Nghỉ sau thi"],
    [3, "QTPTPM", "Đọc tổng quan môn"],
  ]),
  day("2026-07-09", "09/07", "phase-3", [
    [1, "QTPTPM", "Tổng quan quy trình phần mềm"],
    [2, "Toán rời rạc", "Logic mệnh đề, vị từ"],
    [3, "KTMT", "Tổng quan kiến trúc máy tính"],
  ]),
  day("2026-07-10", "10/07", "phase-3", [
    [1, "QTPTPM", "Mô hình thác nước, Agile, Scrum"],
    [2, "Toán rời rạc", "Tập hợp, quan hệ, hàm"],
    [3, "KTMT", "Biểu diễn dữ liệu, số nhị phân"],
  ]),
  day("2026-07-11", "11/07", "phase-3", [
    [1, "QTPTPM", "Quản lý dự án, yêu cầu phần mềm"],
    [2, "Toán rời rạc", "Tổ hợp, chỉnh hợp, hoán vị"],
    [3, "KTMT", "CPU, bộ nhớ, lệnh máy"],
  ]),
  day("2026-07-12", "12/07", "phase-3", [
    [1, "QTPTPM", "Kiểm thử, bảo trì, chất lượng phần mềm"],
    [2, "Toán rời rạc", "Đồ thị, cây"],
    [3, "KTMT", "Cache, pipeline, I/O"],
  ]),
  day("2026-07-13", "13/07", "phase-3", [
    [1, "QTPTPM", "Làm đề và học câu hỏi trọng tâm"],
    [2, "Toán rời rạc", "Làm bài tập dạng khó"],
    [3, "KTMT", "Làm câu hỏi lý thuyết"],
  ]),
  day("2026-07-14", "14/07", "phase-3", [
    [1, "QTPTPM", "Tổng ôn lần cuối"],
    [2, "Toán rời rạc", "Tổng ôn công thức"],
    [3, "KTMT", "Tổng ôn phần yếu"],
  ]),
  day("2026-07-15", "15/07", "final", [
    [1, "QTPTPM", "Thi QTPTPM", true],
    [2, "Nghỉ ngơi", "Nghỉ sau thi"],
    [3, "Toán rời rạc", "Tổng ôn đề và công thức"],
  ]),
  day("2026-07-16", "16/07", "final", [
    [1, "Toán rời rạc", "Thi Toán rời rạc", true],
    [2, "Nghỉ ngơi", "Nghỉ sau thi"],
    [3, "KTMT", "Tổng ôn cuối"],
  ]),
  day("2026-07-17", "17/07", "final", [
    [1, "KTMT", "Thi KTMT", true],
    [2, "Nghỉ ngơi", "Nghỉ"],
    [3, "Nghỉ ngơi", "Nghỉ"],
  ]),
];

export const allSessions = scheduleDays.flatMap((studyDay) => studyDay.sessions);
