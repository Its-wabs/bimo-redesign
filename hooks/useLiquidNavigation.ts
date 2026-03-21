import gsap from 'gsap';
import { useRouter } from 'next/navigation';
import { useEffect, useRef } from 'react';

export const useLiquidNavigation = () => {
  const router = useRouter();
  const overlayRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    
    let overlay = document.getElementById('liquid-nav-overlay') as HTMLDivElement;

    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'liquid-nav-overlay';
      overlay.style.cssText = `
        position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
        z-index: 9999; pointer-events: none; display: flex;
        transform: translate3d(115%, 0, 0); 
        will-change: transform;
      `;
      overlay.setAttribute('dir', 'ltr');

      overlay.innerHTML = `
        <div style="height: 130%; width: 15vw; margin-left: -14.8vw; position: relative; flex-shrink: 0; z-index: 2;">
          <svg style="width:100%; height:100%" viewBox="0 0 320 1440" preserveAspectRatio="none">
            <path fill="#3D1E12" d="M320,0 L160,0 C0,120 320,240 160,360 C0,480 320,600 160,720 C0,840 320,960 160,1080 C0,1200 320,1320 160,1440 L320,1440 Z" />
          </svg>
        </div>
        <div style="flex: 1; background: #3D1E12; position: relative; z-index: 1;"></div>
        <div style="height: 130%; width: 15vw; margin-right: -14.8vw; position: relative; flex-shrink: 0; transform: scaleX(-1); z-index: 2;">
          <svg style="width:100%; height:100%" viewBox="0 0 320 1440" preserveAspectRatio="none">
            <path fill="#3D1E12" d="M320,0 L160,0 C0,120 320,240 160,360 C0,480 320,600 160,720 C0,840 320,960 160,1080 C0,1200 320,1320 160,1440 L320,1440 Z" />
          </svg>
        </div>
      `;
      document.body.appendChild(overlay);
    }

    overlayRef.current = overlay;

   
    return () => {
     
      overlayRef.current = null;
    };
  }, []);

  const navigate = (href: string) => {
    const el = document.getElementById('liquid-nav-overlay');
    if (!el) {
      router.push(href);
      return;
    }

    const tl = gsap.timeline();

    // Reset position instantly just in case
    gsap.set(el, { xPercent: 0, x: '115%', filter: 'hue-rotate(0deg)' });

    tl.to(el, {
      x: '0%',
      duration: 0.8,
      ease: 'power4.out',
      onComplete: () => {
        router.push(href);

        
        gsap.delayedCall(0.4, () => {
          gsap.to(el, {
            x: '-130%',
            duration: 0.9,
            ease: 'power4.inOut',
            onComplete: () => {
              
              gsap.set(el, { x: '115%' });
            },
          });
        });
      },
    });

// THE RAINBOW
tl.to(
  el,
  {
    filter: 'hue-rotate(360deg)', 
    duration: 0.8, 
    ease: 'none',
  },
  0
);
  };

  return { navigate };
};