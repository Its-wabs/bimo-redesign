import gsap from 'gsap';
import { useRouter } from 'next/navigation';

export const useLiquidNavigation = () => {
  const router = useRouter();

  const navigate = (href: string) => {
    // dynamic overlay container
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 9999;
      pointer-events: none;
      display: flex;
      transform: translateX(115%);
      dir: ltr;
    `;
    overlay.setAttribute('dir', 'ltr');
    // left wave
    const leftWave = document.createElement('div');
    leftWave.style.cssText =
      'height: 130%; width: 15vw;  margin-left: -14.8vw; position: relative; flex-shrink: 0; z-index: 2; margin-right: -2px;';
    leftWave.innerHTML = `
      <svg class="w-full h-full" viewBox="0 0 320 1440" preserveAspectRatio="none">
        <path fill="#3D1E12" d="M320,0 L160,0 C0,120 320,240 160,360 C0,480 320,600 160,720 C0,840 320,960 160,1080 C0,1200 320,1320 160,1440 L320,1440 Z" />
      </svg>
    `;

    // the choco block
    const block = document.createElement('div');
    block.style.cssText =
      'flex: 1; background: #3D1E12; position: relative; z-index: 1;';

    // right wave

    const rightWave = document.createElement('div');
    rightWave.style.cssText =
      'height: 130%; width: 15vw; margin-right: -14.8vw; position: relative; flex-shrink: 0; transform: scaleX(-1); z-index: 2; margin-left: -2px;';
    rightWave.innerHTML = `
      <svg class="w-full h-full" viewBox="0 0 320 1440" preserveAspectRatio="none">
        <path fill="#3D1E12" d="M320,0 L160,0 C0,120 320,240 160,360 C0,480 320,600 160,720 C0,840 320,960 160,1080 C0,1200 320,1320 160,1440 L320,1440 Z" />
      </svg>
    `;

    // ordering them up
    overlay.appendChild(leftWave);
    overlay.appendChild(block);
    overlay.appendChild(rightWave);
    document.body.appendChild(overlay);

    const tl = gsap.timeline();

    tl.to(overlay, {
      x: 0,
      duration: 0.8,
      ease: 'power4.out',
      onComplete: () => {
        router.push(href);

        gsap.delayedCall(0.4, () => {
          // Uncover the new page
          gsap.to(overlay, {
            x: '-130%',
            duration: 0.8,
            ease: 'power4.in',
            onComplete: () => overlay.remove(),
          });
        });
      },
    });

    tl.to(
      overlay,
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
