export interface PaginationParams {
  page: number; // 当前页码
  pageSize: number; // 每页显示条数
}

export type RequiredPick<T, K extends keyof T> = {
  [J in keyof T]?: T[J];
} & {
  [P in K]-?: T[P];
};

export type PartialPick<T, K extends keyof T> = {
  [P in K]?: T[P];
};
