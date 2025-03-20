import React, { useRef, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./index.less"

export default function HorizontalScrollList({ children }) {
  const scrollContainerRef = useRef(null);
  const itemRefs = useRef({}); // 存储所有子元素的 ref
  const [active, setActive] = useState(null)

  useEffect(() => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    container.addEventListener("scroll", activeCheck);
    // if(scrollContainerRef.current){
    //   scrollContainerRef.current.addEventListener("scroll", activeCheck)
    // }
    // return () => scrollContainerRef.current && scrollContainerRef.current.removeEventListener("scroll", activeCheck)
    return () => {
      if (container) {
        container.removeEventListener("scroll", activeCheck);
      }
    };
  }, [scrollContainerRef])

  useEffect(() => {
    console.log(active)
  }, [active])
  // 处理滚动
  const scroll = (direction) => {
    const width = scrollContainerRef.current?.firstChild?.offsetWidth || 20;
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? width : -width,
        behavior: "smooth",
      });
    }
  };

  const activeCheck = () => {
    Object.keys(itemRefs.current).forEach(index => {
      const { scrollLeft } = scrollContainerRef.current
      const containerWidth = scrollContainerRef.current.getBoundingClientRect().width;
      const offsetLeft = itemRefs.current[index].offsetLeft
      const itemWidth = itemRefs.current[index].offsetWidth
      const left = offsetLeft - scrollLeft
      if(Math.abs(containerWidth / 2 - left) < itemWidth / 2){
        setActive(Number(index))
      }
    })
  }

  return (
    <div className="scroll-container relative w-full overflow-hidden">
      {/* 左侧按钮 */}
      <Button
        onClick={() => scroll("left")}
        className="scroll-button !absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 shadow-md text-black"
      >
        <ChevronLeft size={20} />
      </Button>

      {/* 滚动区域 */}
      <div
        ref={scrollContainerRef}
        className="scroll-body flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x scroll-ps-6"
      >
        {React.Children.map(children, (child, index) => {
          return (
            <div
              key={index}
              ref={(ref) => itemRefs.current[index] = ref}
              className={`shrink-0 snap-center transition-all duration-300 ${active === index ? "active" : ""}`}
            >
              {child}
            </div>
          );
        })}
      </div>

      {/* 右侧按钮 */}
      <Button
        onClick={() => scroll("right")}
        className="scroll-button !absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/60 shadow-md text-black"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
