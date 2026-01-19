import { useState, useRef, useCallback } from 'react';

/**
 * Custom hook for 3D glass tilt effect on mouse hover
 * @param {Object} options - Configuration options
 * @param {number} options.maxTilt - Maximum tilt angle in degrees (default: 10)
 * @param {number} options.scale - Scale on hover (default: 1.02)
 * @param {number} options.glareOpacity - Max glare opacity (default: 0.15)
 * @returns {Object} - { ref, style, onMouseMove, onMouseEnter, onMouseLeave }
 */
export const useGlassTilt = (options = {}) => {
    const {
        maxTilt = 10,
        scale = 1.02,
        glareOpacity = 0.15,
    } = options;

    const ref = useRef(null);
    const [style, setStyle] = useState({
        transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
        transition: 'transform 0.1s ease-out',
    });
    const [glareStyle, setGlareStyle] = useState({
        background: 'transparent',
        opacity: 0,
    });

    const onMouseMove = useCallback((e) => {
        if (!ref.current) return;

        const rect = ref.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const mouseX = e.clientX - centerX;
        const mouseY = e.clientY - centerY;

        const rotateY = (mouseX / (rect.width / 2)) * maxTilt;
        const rotateX = -(mouseY / (rect.height / 2)) * maxTilt;

        setStyle({
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
            transition: 'transform 0.1s ease-out',
        });

        // Calculate glare position
        const glareX = ((e.clientX - rect.left) / rect.width) * 100;
        const glareY = ((e.clientY - rect.top) / rect.height) * 100;

        setGlareStyle({
            background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`,
            opacity: 1,
        });
    }, [maxTilt, scale, glareOpacity]);

    const onMouseEnter = useCallback(() => {
        setStyle((prev) => ({
            ...prev,
            transition: 'transform 0.1s ease-out',
        }));
    }, []);

    const onMouseLeave = useCallback(() => {
        setStyle({
            transform: 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)',
            transition: 'transform 0.3s ease-out',
        });
        setGlareStyle({
            background: 'transparent',
            opacity: 0,
        });
    }, []);

    return {
        ref,
        style,
        glareStyle,
        handlers: {
            onMouseMove,
            onMouseEnter,
            onMouseLeave,
        },
    };
};

/**
 * GlassCard component with built-in 3D tilt effect
 */
export const GlassCard = ({ children, className = '', maxTilt = 8, ...props }) => {
    const { ref, style, glareStyle, handlers } = useGlassTilt({ maxTilt, scale: 1.02 });

    return (
        <div
            ref={ref}
            className={`glass-card relative overflow-hidden ${className}`}
            style={style}
            {...handlers}
            {...props}
        >
            {/* Glare overlay */}
            <div
                className="absolute inset-0 pointer-events-none transition-opacity duration-200"
                style={glareStyle}
            />
            {children}
        </div>
    );
};

/**
 * GlassButton component with built-in 3D tilt effect
 */
export const GlassButton = ({ children, className = '', as = 'button', href, ...props }) => {
    const { ref, style, glareStyle, handlers } = useGlassTilt({ maxTilt: 12, scale: 1.05 });

    const Component = href ? 'a' : as;

    return (
        <Component
            ref={ref}
            href={href}
            className={`relative overflow-hidden inline-block ${className}`}
            style={style}
            {...handlers}
            {...props}
        >
            {/* Glare overlay */}
            <div
                className="absolute inset-0 pointer-events-none rounded-xl transition-opacity duration-200"
                style={glareStyle}
            />
            {children}
        </Component>
    );
};

export default useGlassTilt;
