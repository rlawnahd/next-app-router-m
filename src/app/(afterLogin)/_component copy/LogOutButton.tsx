'use client';
import React from 'react';
import Image from 'next/image';
import styles from './logoutButton.module.css';

export default function LogOutButton() {
    const me = {
        id: 'zino',
        nickname: '지노',
        image: '/yRsRRjGO.jpg',
    };

    const onLogout = () => {};
    return (
        <>
            <button className={styles.logOutButton} onClick={onLogout}>
                <div className={styles.logOutUserImage}>
                    <Image src={me.image} alt={me.id} width={40} height={40} />
                </div>
                <div className={styles.logOutUserName}>
                    <div>{me.nickname}</div>
                    <div>@{me.id}</div>
                </div>
            </button>
        </>
    );
}
