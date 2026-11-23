import Markdoc, { type Node, Tag } from '@markdoc/markdoc';
import * as React from 'react';
import Image from 'next/image';

function ContentImage({ src, alt }: { src: string; alt: string }) {
  return (
    <span className="content-image-frame">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width:760px) 100vw, 720px"
        style={{ objectFit: 'contain' }}
      />
    </span>
  );
}

function nodeText(node: Node): string {
  return typeof node.attributes.content === 'string'
    ? node.attributes.content
    : node.children.map(nodeText).join('');
}
export function headingId(text: string, index: number) {
  return `${
    text
      .toLocaleLowerCase('tr')
      .normalize('NFKD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '') || 'section'
  }-${index}`;
}
function safeLink(value: unknown) {
  if (typeof value !== 'string') return '#';
  if (
    value.startsWith('#') ||
    (value.startsWith('/') && !value.startsWith('//'))
  )
    return value;
  try {
    const url = new URL(value);
    if (['https:', 'http:', 'mailto:'].includes(url.protocol)) return value;
  } catch {}
  return '#';
}
export function prepareDocument(node: Node) {
  const headings: { id: string; title: string }[] = [];
  for (const item of node.walk()) {
    if (item.type === 'heading' && Number(item.attributes.level) <= 3) {
      const title = nodeText(item);
      const id = headingId(title, headings.length);
      item.attributes.id = id;
      headings.push({ id, title });
    }
  }
  const config = {
    nodes: {
      heading: {
        ...Markdoc.nodes.heading,
        attributes: {
          ...Markdoc.nodes.heading.attributes,
          id: { type: String },
        },
        transform(n: Node, c: Parameters<Node['transformChildren']>[0]) {
          return new Tag(
            `h${n.attributes.level}`,
            { id: n.attributes.id },
            n.transformChildren(c),
          );
        },
      },
      link: {
        ...Markdoc.nodes.link,
        transform(n: Node, c: Parameters<Node['transformChildren']>[0]) {
          return new Tag(
            'a',
            { href: safeLink(n.attributes.href) },
            n.transformChildren(c),
          );
        },
      },
      image: {
        ...Markdoc.nodes.image,
        transform(n: Node) {
          const src =
            typeof n.attributes.src === 'string' &&
            n.attributes.src.startsWith('/media/')
              ? n.attributes.src
              : undefined;
          return src
            ? new Tag('ContentImage', {
                src,
                alt:
                  typeof n.attributes.alt === 'string' ? n.attributes.alt : '',
              })
            : '';
        },
      },
    },
  };
  const errors = Markdoc.validate(node, config);
  if (errors.some((error) => error.error.level === 'critical'))
    throw new Error('Invalid article content');
  const content = Markdoc.renderers.react(
    Markdoc.transform(node, config),
    React,
    { components: { ContentImage } },
  );
  return { headings, content };
}
