import assert from 'node:assert/strict';
import test from 'node:test';
import { isPublished } from '../lib/publishing.ts';
const now=new Date('2026-11-03T12:00:00+03:00');
const published={draft:false,demo:false,publishDate:'2026-11-03'};
test('draft content never becomes public, including development',()=>{
  assert.equal(isPublished({...published,draft:true},{allowDemo:true,now}),false);
});
test('demo content requires explicit development permission',()=>{
  assert.equal(isPublished({...published,demo:true},{now}),false);
  assert.equal(isPublished({...published,demo:true},{allowDemo:true,now}),true);
});
test('future and invalid publications stay private',()=>{
  for(const publishDate of [null,'','not-a-date','2026-02-31','2026-11-04'])assert.equal(isPublished({...published,publishDate},{now}),false);
});
test('publication begins at midnight in Istanbul',()=>{
  assert.equal(isPublished(published,{now:new Date('2026-11-02T20:59:59Z')}),false);
  assert.equal(isPublished(published,{now:new Date('2026-11-02T21:00:00Z')}),true);
});
test('real published content remains readable in production',()=>{
  assert.equal(isPublished(published,{now}),true);
});
