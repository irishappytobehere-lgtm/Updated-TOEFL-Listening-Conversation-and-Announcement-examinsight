export interface QuestionItem {
  id: number;
  source: string; // 题源 (e.g., 官方样题01)
  code: string;   // 题号 (e.g., M1C1Q9)
  point: string;  // 考点 (e.g., purpose, inference)
  question: string; // 题目 (The English question text)
}

export type ChartData = {
  name: string;
  value: number;
  [key: string]: string | number;
};
