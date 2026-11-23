import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
export function SectionHeading({
  title,
  href,
  action,
}: {
  title: string;
  href?: string;
  action?: string;
}) {
  return (
    <div className="section-heading">
      <h2>{title}</h2>
      <span className="section-rule" />
      {href && action ? (
        <Link href={href}>
          {action}
          <ArrowRight size={15} aria-hidden="true" />
        </Link>
      ) : null}
    </div>
  );
}
