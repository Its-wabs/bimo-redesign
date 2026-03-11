"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import NavBar from "@/components/navbar";
import Hero from "@/components/hero";
import RollingCookie from "@/components/rollingcookie";
import VideoPortal from "@/components/VideoPortal";
import ProductSection from "@/components/product";
import BuddyCookie from "@/components/buddycookie";
import TestimonialSection from "@/components/testimonials";
import FindStore from "@/components/findstore";



gsap.registerPlugin(ScrollTrigger);

export default function Page() {
  const containerRef = useRef<HTMLDivElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const productRef = useRef<HTMLDivElement>(null);
  const masterSceneRef = useRef<HTMLDivElement>(null);
  const storeRef = useRef<HTMLDivElement>(null);

  const testimonialsRef = useRef<HTMLDivElement>(null);
  
  const [entranceDone, setEntranceDone] = useState(false);

  // Reload scroll management

  useEffect(() => {
    if(typeof window !== "undefined") {
      window.history.scrollRestoration = "manual";
      window.scrollTo(0, 0);
    }
    if (!entranceDone) {
       document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => { document.body.style.overflow = "auto"; };
  }, [entranceDone]);

  

  // Entrance animation

  useGSAP(() => {

    gsap.set(".main-cookie", { 
      xPercent: -50, 
      yPercent: -50, 
      y: "120vh",
      rotation: -180,
      autoAlpha: 1,
    });

    gsap.to(".main-cookie", {
      y: "43vh",
      rotation: 0,
      duration: 1.8,
      ease: "power4.out",
      delay: 0.3,
      onComplete: () => {
        setEntranceDone(true);
      }
    });

  }, {scope : containerRef});

  // Master scene Logic

  useGSAP(() => {
    if(!entranceDone) return;

    const mm = gsap.matchMedia();

    mm.add({
       isMobile: "(max-width: 768px)",
      isDesktop: "(min-width: 769px)"
    }, (context) => {

      const { isMobile } = context.conditions as { isMobile: boolean };

      // SCENE 1 : HERO TO VIDEO 

       const scene1 = gsap.timeline({
        scrollTrigger: {
          trigger: introRef.current,
          start: "top top",
          end: () => `+=${isMobile ? window.innerHeight * 3 : window.innerHeight * 5}`,
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      scene1.to(".hero-text",{
         y: -150,
         autoAlpha: 0,
         duration: 1
             }, 0.2)

      .to("nav", { 
        y: -100,
        autoAlpha: 0,
        duration: 0.6,
        ease: "power2.in" }, 0)

      .to(".main-cookie", { 
                y: 0, 
                scale: isMobile ? 0.45 : 0.35,
                rotation: 720, 
                ease: "power2.inOut", 
                duration: 1,
                immediateRender: false,
                autoAlpha: 1
            }, 0);

    if(isMobile) {
      scene1.to(".main-cookie", {
         autoAlpha: 0,
         scale: 0.2,
         duration: 0.5,
         ease: "power2.in" 
      })

      .set(".video-portal", { autoAlpha: 1, rotationY: 0 })

      .to(".video-frame", { 
        clipPath: "circle(100% at 50% 50%)", 
        width: "100vw", 
        height: "100vh", 
        duration: 0.6,  
        ease: "power2.out" 
      }, "-=0.2") 

      .to(".main-cookie", { 
        autoAlpha: 1, 
        rotation: 900, 
        scale: 0.20, 
        y: "-48vh", 
        duration: 0.6,  
        ease: "power2.inOut" 
      }, "+=0.3")

      .to(".main-cookie", { 
        scale: 0.22, 
        duration: 0.2, 
        yoyo: true, 
        repeat: 1, 
        ease: "back.out(2)" 
      });

    }
    else {
        scene1.to(".main-cookie", { 
          rotationY: 90, 
          autoAlpha: 0, 
          duration: 0.4 
        })
        
        .fromTo(".video-portal", { 
          rotationY: -90, 
          autoAlpha: 0 },
           { 
            rotationY: 0, 
            autoAlpha: 1, 
            duration: 0.4 
          }, "-=0.4")
          
          .to(".video-frame", {
             clipPath: "circle(100% at 50% 50%)", 
             width: "100vw", 
             height: "100vh", 
             duration: 1.5, 
             ease: "power3.inOut"

             })
             .to(".main-cookie", { 
              autoAlpha: 1, 
              rotationY: 0, 
              rotation: 900, 
              scale: 0.20, 
              y: "-48vh", 
              duration: 1.2, 
              ease: "power2.inOut",
              pointerEvents: "auto", 
    cursor: "pointer"
             }, "<")
             
             .to(".main-cookie", { 
              scale: 0.22, 
              duration: 0.35, 
              yoyo: true, 
              repeat: 1, 
              ease: "back.out(2)" 
            });

      }

     scene1.to(".video-content", { autoAlpha: 1, duration: 0.4 })
     
     .to(".video-logo-wrapper",
       { 
        autoAlpha: 0, 
        y: -30, 
        duration: 0.4 
      })
      .to(".video-bg", { 
        filter: "blur(8px)", 
        scale: 1.1, 
        duration: 0.6 
      }, "-=0.3")
      
      .to(".video-since", { 
        autoAlpha: 1, 
        x: 10, 
        duration: 0.4 
      }, "-=0.2")
      
      .to(".video-content-inner", { 
        y: 50, 
        duration: 0.5 
      })
      
      .fromTo(".video-cta", { autoAlpha: 0, y: 0 }, { autoAlpha: 1, y: 0, duration: 0.6 }, "-=0.4")
      
      .to(".main-cookie", { 
        y: "-65vh", 
        autoAlpha: 0, 
        duration: 0.8, 
        ease: "back.in(1.7)" ,
        pointerEvents: "none",
    cursor: "default"
      }); 

      // SCENE 2 : Master sections scene from products to footer
    
      const flowTl = gsap.timeline({
        scrollTrigger: {
          trigger: masterSceneRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * 5}`, 
          scrub: 1,
          pin: true,
          invalidateOnRefresh: true,
        },
      });

      // Setup initial states for the flow
      flowTl.set(".buddy-cookie", { 
        xPercent: -50, 
        yPercent: -50, 
        y: "120vh",
        x: "-120vw", 
        rotation: -180, 
        autoAlpha: 1, 
        scale: 0.25
      });
      flowTl.set(testimonialsRef.current, { yPercent: 100 });
      flowTl.set(storeRef.current, { yPercent: 100 });

      // Bring in Navbar and Buddy in Product Section
      flowTl.to("nav", { y: 0, autoAlpha: 1, duration: 0.5 })
            .to(".buddy-cookie", { 
              y: "45vh", 
        x: "-47vw",
        rotation: 30,
        duration: 2, 
        ease: "back.out(1.2)",
        delay: 0.2
            }, "-=0.3");

            // buffer
      flowTl.to({}, { duration: 1 }); 

      //  Buddy Leaves Product 
      flowTl.to(".buddy-cookie", { 
        y: "120vh", x: "-20vw", rotation: 90, autoAlpha: 0, 
        duration: 1, ease: "power2.in" 
      });

      // Transition to testimonials Section 
      flowTl.to(testimonialsRef.current, { 
        yPercent: 0, 
        duration: 2, 
        ease: "power3.inOut" 
      }, "-=0.5");

      // Buddy Re-appears 
      flowTl.set(".buddy-cookie", { 
        x: "120vw",
         y: "120vh",
          rotation: 180,
           autoAlpha: 0,
            scale: 0.25 
      })
      .to(".buddy-cookie", { 
        autoAlpha: 1,
         y: "43vh",
          x: "46vw",
           rotation: -20, 
        duration: 1.5,
         ease: "back.out(1.2)" 
      });

      flowTl.to({}, { duration: 1.5 });

      flowTl.to(".buddy-cookie", { 
        y: "120vh", x: "-20vw", rotation: 90, autoAlpha: 0, 
        duration: 1, ease: "power2.in" 
      });

      

      flowTl.to(storeRef.current, { yPercent: 0, duration: 2, ease: "power3.inOut" }, "-=0.5");

      flowTl.set(".buddy-cookie", { x: "0vw", y: "120vh", rotation: 0, autoAlpha: 0 })
            .to(".buddy-cookie", { 
               autoAlpha: 1, y: "48vh", x: "0vw", rotation: 0, duration: 1.5, ease: "back.out(1.2)" 
            });

            flowTl.to({}, { duration: 1 }); 

// footer reveal 
flowTl.to(".find-store-container", {
    y: "-80vh",
    duration: 3,
    ease: "power2.inOut"
})
.to("nav", { y: -100, autoAlpha: 0, duration: 0.6, ease: "power2.in" },"<");

flowTl.to(".buddy-cookie", {
    y: "-30vh", 
    scale: 0.25,
    duration: 3,
    ease: "power2.inOut"
}, "<"); 

flowTl.to({}, { duration: 1 }); 
      






    }, containerRef);

    window.addEventListener("resize", () => {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
});
    return () => mm.revert();

    

  }, {scope :containerRef, dependencies : [entranceDone]});


  return (

    <main ref={containerRef} className="relative overflow-x-hidden ">
      <NavBar/>
      

      
      <div ref={introRef} className="relative h-screen w-full overflow-hidden">
        <Hero />
        <RollingCookie/>
        <VideoPortal />
        
      </div>

     

      <div ref={masterSceneRef} className="relative h-screen overflow-hidden">

        
        <div className="absolute inset-0 w-full h-full z-10">
          <ProductSection />
        </div>

        
        <div ref={testimonialsRef} className="absolute inset-0 w-full h-full z-20 overflow-hidden">
          <TestimonialSection />
        </div>

        

        <div ref={storeRef} className="absolute inset-0 w-full h-full z-30 overflow-hidden">
          <FindStore />
        </div>
        
        <BuddyCookie />

      </div>
      

    </main>
    
  );
}
