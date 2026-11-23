import assert from 'node:assert/strict';
import test from 'node:test';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { serializeJsonLd } from '../lib/structured-data.ts';
test('article JSON-LD stays parseable and cannot close the script element',()=>{
  const value={headline:'Example </script><script>alert(1)</script>',description:'A "quoted" title & text'};
  const serialized=serializeJsonLd(value);
  assert.deepEqual(JSON.parse(serialized),value);
  assert.equal(serialized.includes('</script>'),false);
  const html=renderToStaticMarkup(React.createElement('script',{type:'application/ld+json'},serialized));
  const body=html.match(/<script[^>]*>([\s\S]*?)<\/script>/)?.[1];
  assert.deepEqual(JSON.parse(body),value);
});
