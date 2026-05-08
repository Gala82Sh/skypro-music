'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAppDispatch } from '@/store/store';
import { logout } from '@/store/features/authSlice';
import styles from './Sidebar.module.css';


export default function Sidebar() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
  dispatch(logout());
  window.location.replace('/auth/login');
};

  return (
    <div className={styles.main__sidebar}>
      <div className={styles.sidebar__personal}>
  <p className={styles.sidebar__personalName}>Sergey.Ivanov</p>
  <button 
    onClick={handleLogout} 
    className={styles.sidebar__icon}
    style={{ cursor: 'pointer', background: 'none', border: 'none' }}
    aria-label="Выйти"
  >
    <svg>
      <use xlinkHref="/img/icon/sprite.svg#logout"></use>
    </svg>
  </button>
</div>
      <div className={styles.sidebar__block}>
        <div className={styles.sidebar__list}>
          <div className={styles.sidebar__item}>
            <Link href="/selection/2" className={styles.sidebar__link}>
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
            <Link href="/selection/3" className={styles.sidebar__link}>
              <Image
                src="/img/playlist02.png"
                alt="Танцевальные хиты"
                width={250}
                height={170}
              />
            </Link>
          </div>
          <div className={styles.sidebar__item}>
            <Link href="/selection/4" className={styles.sidebar__link}>
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