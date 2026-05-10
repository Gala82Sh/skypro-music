import React from 'react';
import styles from './PageContent.module.css';

interface PageContentProps {
  title: string;
  children: React.ReactNode;
}

export default function PageContent({ title, children }: PageContentProps) {
  return (
    <div className={styles.content}>
      <h2 className={styles.title}>{title}</h2>
      {children}
    </div>
  );
}
