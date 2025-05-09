import React, { useEffect, useRef } from "react";
import Img1 from "../../../assets/plant/OutDoorPlants.jpg";
import Img2 from "../../../assets/plant/indoorplants.jpg";
import Img3 from "../../../assets/plant/Hanging Plants.jpg";
import Img4 from "../../../assets/plant/flowering plants.webp";
import Img5 from "../../../assets/plant/Low Light Plants.jpg";
import gsap from "gsap";

const imgs = [Img2, Img3, Img4, Img5]

const Section2 = () => {
  const sectionRef = useRef(null);
  const sectionRef1 = useRef(null);

  useEffect(() => {
    const images = sectionRef.current.children

    gsap.fromTo(
      images,
      { scale: 0.8, opacity: 0 }, // Start zoomed out
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3, // Delays animation per image
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start animation when 80% of the section is visible
          // toggleActions: "play none none complete", // Runs once, does not repeat
          toggleActions: "restart none none none"
        },
      }
    );
  }, []);


  useEffect(() => {
    const images1 = sectionRef1.current.children

    gsap.fromTo(
      images1,
      { scale: 0.8, opacity: 0 }, // Start zoomed out
      {
        scale: 1,
        opacity: 1,
        duration: 1.2,
        stagger: 0.3, // Delays animation per image
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%", // Start animation when 80% of the section is visible
          toggleActions: "restart none none none", // Runs once, does not repeat
          // toggleActions: "restart none none none"
        },
      }
    );
  }, []);

  return (
    <div className="bg-white m-4 py-10">
      <div className="container mx-auto px-4" >
        {/* Title Section */}
        <div className="text-center mb-8">
          <h1 className="text-base md:text-lg text-green-500">
            All Kinds of Plants
          </h1>
          <p className="text-3xl text-black font-semibold mt-2">
            Creating a Beautiful Balcony Garden
          </p>
        </div>

        {/* Grid Section */}
        <div className="grid md:grid-cols-2 gap-8" >
          {/* Left Section */}
          <div className="flex items-center justify-center" ref={sectionRef}>
            <div className="w-full h-[400px]  flex items-center justify-center">
              {/* Placeholder for content */}
              {/* <p className="text-gray-500">Feature or image here</p> */}
              <img src={Img1} className="w-[90%] h-full object-conatin rounded-xl" alt="" />
            </div>
          </div>

          {/* Right Section */}
          <div className="md:col-span-1">
            <div className="grid grid-cols-2 gap-6" ref={sectionRef1}>
              {imgs.map((val, i) => {
                return(
                  <div key={i} className="w-full h-48 flex  items-center justify-center">
                  <img
                    src={val}
                    alt={"hello"}
                    className="w-[90%] h-full rounded-lg object-cover"
                  />
                </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section2;
