'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import styles from './Sidebar.module.css';
import { RootState } from '@/store/store';

export default function Sidebar() {
  const dispatch = useAppDispatch();
 const { user } = useAppSelector((state: RootState) => state.auth);
  const [userName, setUserName] = useState('Гость');

  useEffect(() => {
    if (user?.username) {
      setUserName(user.username);
    }
  }, [user]);

  const handleLogout = () => {
    dispatch(logout());
    window.location.href = '/';
  };

  console.log('user из Redux:', user);

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
        <p className={styles.sidebar__personalName}>{userName}</p>
        <div className={styles.sidebar__icon} onClick={handleLogout} style={{ cursor: 'pointer' }}>
          <svg>
            <use xlinkHref="/img/icon/sprite.svg#logout"></use>
          </svg>
        </div>
      </div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link href="/music/selection/2" className={styles.sidebar__link}>
              <Image
                src="/img/playlist01.png"
                alt="Плейлист дня"
                width={250}
                height={170}
                loading="eager"
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link href="/music/selection/3" className={styles.sidebar__link}>
              <Image
                src="/img/playlist02.png"
                alt="Танцевальные хиты"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link href="/music/selection/4" className={styles.sidebar__link}>
              <Image
                src="/img/playlist03.png"
                alt="Инди-заряд"
                width={250}
                height={170}
              />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}