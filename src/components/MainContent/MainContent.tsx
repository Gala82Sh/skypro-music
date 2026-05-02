import Link from 'next/link';
import styles from './MainContent.module.css';

export default function MainContent() {
  return (
    <div className={styles.centerblock}>
      <div className={styles.centerblock__search}>
        <svg className={styles.search__svg}>
          <use xlinkHref="/img/icon/sprite.svg#icon-search"></use>
        </svg>
        <input
          className={styles.search__text}
          type="search"
          placeholder="Поиск"
          name="search"
        />
      </div>
      <h2 className={styles.centerblock__h2}>Треки</h2>
      <div className={styles.centerblock__filter}>
        <div className={styles.filter__title}>Искать по:</div>
        <div className={styles.filter__button}>исполнителю</div>
        <div className={styles.filter__button}>году выпуска</div>
        <div className={styles.filter__button}>жанру</div>
      </div>
      <div className={styles.centerblock__content}>
        <div className={styles.content__title}>
          <div className={`${styles.playlistTitle__col} ${styles.col01}`}>Трек</div>
          <div className={`${styles.playlistTitle__col} ${styles.col02}`}>Исполнитель</div>
          <div className={`${styles.playlistTitle__col} ${styles.col03}`}>Альбом</div>
          <div className={`${styles.playlistTitle__col} ${styles.col04}`}>
            <svg className={styles.playlistTitle__svg}>
              <use xlinkHref="/img/icon/sprite.svg#icon-watch"></use>
            </svg>
          </div>
        </div>

        <div className={styles.content__playlist}>

          {/* Трек 1 */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.track__titleText}>
                  <Link href="/" className={styles.track__titleLink}>
                    Guilt <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link href="/" className={styles.track__authorLink}>Nero</Link>
              </div>
              <div className={styles.track__album}>
                <Link href="/" className={styles.track__albumLink}>Welcome Reality</Link>
              </div>
              <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:44</span>
              </div>
            </div>
          </div>

          {/* Трек 2 */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.track__titleText}>
                  <Link href="/" className={styles.track__titleLink}>
                    Elektro <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link href="/" className={styles.track__authorLink}>Dynoro, Outwork, Mr. Gee</Link>
              </div>
              <div className={styles.track__album}>
                <Link href="/" className={styles.track__albumLink}>Elektro</Link>
              </div>
              <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
              </div>
            </div>
          </div>

          {/* Трек 3 */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.track__titleText}>
                  <Link href="/" className={styles.track__titleLink}>
                    I’m Fire <span className={styles.track__titleSpan}></span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link href="/" className={styles.track__authorLink}>Ali Bakgor</Link>
              </div>
              <div className={styles.track__album}>
                <Link href="/" className={styles.track__albumLink}>I’m Fire</Link>
              </div>
              <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:22</span>
              </div>
            </div>
          </div>

          {/* Трек 4 */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.track__titleText}>
                  <Link href="/" className={styles.track__titleLink}>
                    Non Stop <span className={styles.track__titleSpan}>(Remix)</span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link href="/" className={styles.track__authorLink}>Стоункат, Psychopath</Link>
              </div>
              <div className={styles.track__album}>
                <Link href="/" className={styles.track__albumLink}>Non Stop</Link>
              </div>
              <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>4:12</span>
              </div>
            </div>
          </div>

          {/* Трек 5 */}
          <div className={styles.playlist__item}>
            <div className={styles.playlist__track}>
              <div className={styles.track__title}>
                <div className={styles.track__titleImage}>
                  <svg className={styles.track__titleSvg}>
                    <use xlinkHref="/img/icon/sprite.svg#icon-note"></use>
                  </svg>
                </div>
                <div className={styles.track__titleText}>
                  <Link href="/" className={styles.track__titleLink}>
                    Run Run <span className={styles.track__titleSpan}>(feat. AR/CO)</span>
                  </Link>
                </div>
              </div>
              <div className={styles.track__author}>
                <Link href="/" className={styles.track__authorLink}>Jaded, Will Clarke, AR/CO</Link>
              </div>
              <div className={styles.track__album}>
                <Link href="/" className={styles.track__albumLink}>Run Run</Link>
              </div>
              <div className={styles.track__time}>
                <svg className={styles.track__timeSvg}>
                  <use xlinkHref="/img/icon/sprite.svg#icon-like"></use>
                </svg>
                <span className={styles.track__timeText}>2:54</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}