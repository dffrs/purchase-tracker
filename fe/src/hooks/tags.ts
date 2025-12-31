import {
  getAllOrdersStatsTag,
  getAllOrdersStatsForYearTag,
  getAllOrdersTag,
} from ".";

const controller = {
  getAllOrdersStatsTag,
  getAllOrdersStatsForYearTag,
  getAllOrdersTag,
} as const;

export function invalidateTags(tags: (keyof typeof controller)[]): void;
export function invalidateTags(tag: keyof typeof controller): void;
export function invalidateTags<T extends keyof typeof controller>(
  tags: T | T[],
): void {
  if (Array.isArray(tags)) {
    tags.forEach((tag) => controller[tag] && controller[tag].count++);
    return;
  }

  controller[tags] && controller[tags].count++;
  return;
}
