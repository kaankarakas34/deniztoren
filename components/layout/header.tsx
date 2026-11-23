'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { textFor } from '@/lib/copy';
import { href, type Locale } from '@/lib/site';

export function Wordmark({ locale }: { locale: Locale }) {
  return (
    <Link
      className="wordmark"
      href={href(locale)}
      aria-label={
        locale === 'tr' ? 'Deniz Tören — Ana sayfa' : 'Deniz Tören — Home'
      }
    >
      <span className="wordmark-title">
        Deniz Tören
        <span className="wordmark-dot" aria-hidden="true">
          .
        </span>
      </span>
    </Link>
  );
}

export function Header({ locale }: { locale: Locale }) {
  const t = textFor(locale);
  const pathname = usePathname();
  const dialog = useRef<HTMLDialogElement>(null);
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  function close() {
    dialog.current?.close();
    setOpen(false);
    menuButton.current?.focus();
  }

  const primaryNavigation = [
    {
      label: t.nav.services,
      url: href(locale, 'services'),
    },
    {
      label: t.nav.education,
      url: href(locale, 'education'),
    },
    {
      label: t.nav.articles,
      url: href(locale, 'articles'),
    },
    { label: t.nav.about, url: href(locale, 'about') },
    { label: t.nav.contact, url: href(locale, 'contact') },
  ];

  const languages = (
    <nav className="languages" aria-label={t.language}>
      {(['tr', 'en'] as const).map((lang) =>
        lang === locale ? (
          <span key={lang} aria-current="page">
            {lang.toUpperCase()}
          </span>
        ) : (
          <a
            key={lang}
            href={`/api/locale?path=${encodeURIComponent(pathname)}&locale=${lang}`}
            hrefLang={lang}
            lang={lang}
          >
            {lang.toUpperCase()}
          </a>
        ),
      )}
    </nav>
  );

  return (
    <>
      <a className="skip-link" href="#main">
        {t.skip}
      </a>
      <header className="site-header">
        <div className="header-inner container">
          <Wordmark locale={locale} />
          <nav
            className="desktop-nav"
            aria-label={locale === 'tr' ? 'Ana menü' : 'Main navigation'}
          >
            {primaryNavigation.map((item) => {
              const NavigationItem = item.url.includes('#') ? 'a' : Link;
              return (
                <NavigationItem
                  key={item.url}
                  href={item.url}
                  aria-current={pathname === item.url ? 'page' : undefined}
                >
                  {item.label}
                </NavigationItem>
              );
            })}
          </nav>
          <div className="header-actions">
            <Link className="header-cta-pill" href={href(locale, 'contact')}>
              {locale === 'tr' ? 'Görüşme Planla' : 'Book Advisory'}
            </Link>
            <Link
              className="icon-button"
              href={href(locale, 'search')}
              aria-label={t.search}
            >
              <Search size={20} />
            </Link>
            <div className="desktop-language">{languages}</div>
            <button
              ref={menuButton}
              type="button"
              className="icon-button mobile-menu-button"
              aria-label={t.menu}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => {
                dialog.current?.showModal();
                setOpen(true);
              }}
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>
      <dialog
        id="mobile-menu"
        ref={dialog}
        className="mobile-drawer"
        aria-label={t.menu}
        onClose={() => {
          setOpen(false);
          menuButton.current?.focus();
        }}
      >
        <div className="drawer-top">
          <Wordmark locale={locale} />
          <button
            type="button"
            className="icon-button"
            onClick={close}
            aria-label={t.close}
          >
            <X size={24} />
          </button>
        </div>
        <nav aria-label={t.menu}>
          {primaryNavigation.map((item) => {
            const NavigationItem = item.url.includes('#') ? 'a' : Link;
            return (
              <NavigationItem
                key={item.url}
                href={item.url}
                aria-current={pathname === item.url ? 'page' : undefined}
                onClick={close}
              >
                {item.label}
              </NavigationItem>
            );
          })}
        </nav>
        <div className="drawer-bottom">
          <Link
            className="drawer-cta-button"
            href={href(locale, 'contact')}
            onClick={close}
          >
            {locale === 'tr' ? 'Görüşme Planla' : 'Book Advisory'}
          </Link>
          {languages}
        </div>
      </dialog>
    </>
  );
}
