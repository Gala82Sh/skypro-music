'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className={styles.main__nav}>
      <div className={styles.nav__logo}>
        <Image
          width={250}
          height={170}
          className={styles.logo__image}
          src="/img/logo.png"
          alt="logo"
        />
      </div>
      <div 
        className={styles.nav__burger}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
        <span className={styles.burger__line}></span>
      </div>
      {isMenuOpen && (
        <div className={styles.nav__menu}>
          <ul className={styles.menu__list}>
            <li className={styles.menu__item}>
              <Link href="/" className={styles.menu__link}>Главное</Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/playlist" className={styles.menu__link}>Мой плейлист</Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/auth/signin" className={styles.menu__link}>Войти</Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}
