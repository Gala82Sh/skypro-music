'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { loginUser, registerUser, clearError } from '@/store/features/authSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import styles from './AuthForm.module.css';

interface AuthFormProps {
    type: 'login' | 'register';
}

export default function AuthForm({ type }: AuthFormProps) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { isLoading, error } = useAppSelector((state) => state.auth);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());

        if (type === 'login') {
            const result = await dispatch(loginUser({ email, password }));
            if (loginUser.fulfilled.match(result)) {
                router.push('/');
            }
        } else {
            if (password.length < 6) {
                toast.error('Пароль должен содержать не менее 6 символов');
                return;
            }
            if (password !== confirmPassword) {
                toast.error('Пароли не совпадают');
                return;
            }

            const username = email.split('@')[0];

            const result = await dispatch(registerUser({ email, password, username }));
            if (registerUser.fulfilled.match(result)) {
                toast.success('Регистрация успешна! Теперь войдите');
                router.push('/auth/login');
            }
        }
    };

    if (type === 'login') {
        return (
            <div className={styles.container}>
                <div className={styles.modal}>
                    <div className={styles.logo}>
                        <Image
                            src="/img/logo_modal.png"
                            alt="Логотип"
                            width={140}
                            height={21}
                            priority
                        />
                    </div>

                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Почта"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={styles.input}
                            required
                        />

                        <input
                            type="password"
                            placeholder="Пароль"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={styles.input}
                            required
                        />

                        {error && <div className={styles.error}>{error}</div>}

                        <button type="submit" className={styles.button} disabled={isLoading}>
                            Войти
                        </button>

                        <div className={styles.registerLink}>
                            <Link href="/auth/register">Зарегистрироваться</Link>
                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.modal}>
                <div className={styles.logo}>
                    <Image
                        src="/img/logo_modal.png"
                        alt="Логотип"
                        width={140}
                        height={21}
                        priority
                        />
                </div>

                <form className={styles.form} onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Почта"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={styles.input}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Пароль"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className={styles.input}
                        required
                    />

                    <input
                        type="password"
                        placeholder="Повторите пароль"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className={styles.input}
                        required
                    />

                    {error && <div className={styles.error}>{error}</div>}

                    <button type="submit" className={styles.button} disabled={isLoading}>
                        Зарегистрироваться
                    </button>

                    <div className={styles.link}>
                        <Link href="/auth/login">Уже есть аккаунт? Войти</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}