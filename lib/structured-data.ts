export function serializeJsonLd(value: unknown) {
  return JSON.stringify(value).replaceAll(
    '<',
    `${String.fromCharCode(92)}u003c`,
  );
}
