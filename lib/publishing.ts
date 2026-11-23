export type PublicationState = {
  draft: boolean;
  publishDate: string | null;
  demo?: boolean;
};
export function isPublished(
  entry: PublicationState,
  options: { allowDemo?: boolean; now?: Date } = {},
) {
  const date = entry.publishDate;
  if (
    entry.draft ||
    !date ||
    !/^\d{4}-\d{2}-\d{2}$/.test(date) ||
    (entry.demo && !options.allowDemo)
  )
    return false;
  const parsed = new Date(`${date}T12:00:00Z`);
  if (
    !Number.isFinite(parsed.getTime()) ||
    parsed.toISOString().slice(0, 10) !== date
  )
    return false;
  return (
    Date.parse(`${date}T00:00:00+03:00`) <=
    (options.now ?? new Date()).getTime()
  );
}
