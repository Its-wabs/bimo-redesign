// hooks/useLiquidNavigation.ts
import gsap from "gsap";
import { useRouter } from "next/navigation";

export const useLiquidNavigation = () => {
  const router = useRouter();

  const navigate = (href: string) => {
    // dynamic overlay container
    const overlay = document.createElement("div");
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
    `;

    // left wave
    const leftWave = document.createElement("div");
    leftWave.style.cssText = "height: 130%; width: 15vw; right: 2; margin-left: -14.8vw; position: relative; flex-shrink: 0;";
    leftWave.innerHTML = `
      <svg class="w-full h-full" viewBox="0 0 320 1440" preserveAspectRatio="none">
        <path fill="#3D1E12" d="M320,0 L160,0 C0,120 320,240 160,360 C0,480 320,600 160,720 C0,840 320,960 160,1080 C0,1200 320,1320 160,1440 L320,1440 Z" />
      </svg>
    `;

    // the choco block
    const block = document.createElement("div");
    block.style.cssText = "flex: 1; background: #3D1E12;";

    // right wave
   
    const rightWave = document.createElement("div");
    rightWave.style.cssText = "height: 130%; width: 15vw; left: 2; margin-right: -14.8vw; position: relative; flex-shrink: 0; transform: scaleX(-1);";
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

    const tl = gsap.timeline({
      onComplete: () => overlay.remove() 
    });


    tl.to(overlay, { x: 0, duration: 1, ease: "power4.inOut" })
      .fromTo(overlay, 
        { filter: "hue-rotate(0deg) brightness(2)" }, 
        { filter: "hue-rotate(360deg) brightness(1)", duration: 1.2, ease: "none" }, 0)
      .add(() => router.push(href), "-=0.1") 
      .to(overlay, { x: "-130%", duration: 1, ease: "power4.inOut" }, "-=0.4"); 
  };

  return { navigate };
};