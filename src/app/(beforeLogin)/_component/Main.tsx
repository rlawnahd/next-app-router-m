'use client';
import styles from '@/app/(beforeLogin)/_component/main.module.css';
import Image from 'next/image';
import zLogo from '../../../../public/zlogo.png';
import Link from 'next/link';
import Script from 'next/script';
import { useEffect, useRef } from 'react';
import { NaverMap } from '@/app/types/map';

export default function Main() {
    const mapRef = useRef<NaverMap | null>(null);
    const initializeMap = () => {
        const mapOptions = {
            center: new window.naver.maps.LatLng(37.5262411, 126.99289439),
            zoom: 10,
            minZoom: 6,
        };
        const map = new window.naver.maps.Map('map', mapOptions);
        mapRef.current = map;
        if (map) {
            map.setOptions(mapOptions);
        }
        naver.maps.Event.addListener(map, 'click', function (e) {
            console.log(e);
        });
    };
    useEffect(() => {
        return () => {
            mapRef.current?.destroy();
        };
    }, []);

    return (
        <>
            <div className={styles.left}>
                <Image src={zLogo} alt="logo" />
            </div>
            <div className={styles.right}>
                <h1>지금 일어나고 있는 일</h1>
                <h2>지금 가입하세요.</h2>
                <Link href="/i/flow/signup" className={styles.signup}>
                    계정 만들기
                </Link>
                <h3>이미 트위터에 가입하셨나요?</h3>
                <Link href="/i/flow/login" className={styles.login}>
                    로그인
                </Link>
            </div>
            {/* <Script
                strategy="afterInteractive"
                type="text/javascript"
                src={`https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_MAP_KEY}`}
                onReady={initializeMap}
            />
            <div id="map" style={{ width: '100%', height: '100%' }} /> */}
        </>
    );
}
