export function isKeystaticEnabled() {
  if (process.env.NODE_ENV === 'development') return true;
  return (
    process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE_KIND === 'github' &&
    Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_OWNER) &&
    Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO)
  );
}
