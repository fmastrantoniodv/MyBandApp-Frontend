import React, { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
import animationData from '../../img/loading-lottie.json'; // Ruta al archivo JSON de Lottie

const LottieAnimation = ({ width, height }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: containerRef.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: animationData // Utiliza el archivo JSON de Lottie importado
        });

        return () => {
            anim.destroy(); // Limpia la animación al desmontar el componente
        };
    }, []);

    return <div ref={containerRef} style={{ width, height }} />;
};

export default LottieAnimation;