'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppSelector, useAppDispatch } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import styles from './Header.module.css';

export default function Header() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { accessToken } = useAppSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    window.location.replace('/');
  };

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
              <Link href="/" className={styles.menu__link} onClick={() => setIsMenuOpen(false)}>Главное</Link>
            </li>
            <li className={styles.menu__item}>
              <Link href="/music/favorites" className={styles.menu__link} onClick={() => setIsMenuOpen(false)}>
                Мой плейлист
              </Link>
            </li>
            {accessToken ? (
              <li className={styles.menu__item}>
                <button onClick={handleLogout} className={styles.menu__link} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                  Выйти
                </button>
              </li>
            ) : (
              <li className={styles.menu__item}>
                <Link href="/auth/login" className={styles.menu__link} onClick={() => setIsMenuOpen(false)}>Войти</Link>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
}