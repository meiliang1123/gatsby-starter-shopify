import React, { useRef } from "react";
import { Button } from "@material-tailwind/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { MdArrowForwardIos } from "react-icons/md";
import "./index.less"

export default function HorizontalScrollList({ children }) {
  const scrollContainerRef = useRef(null);
  const scroll = (direction) => {
    const width = scrollContainerRef.current?.firstChild?.offsetWidth || 20

    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? width : -width,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="scroll-container relative w-full overflow-hidden">
      {/* 左侧按钮 */}
      <Button
        onClick={() => scroll("left")}
        className="scroll-button !absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md text-black"
      >
        <ChevronLeft size={20} />
      </Button>

      {/* 滚动区域 */}
      <div
        ref={scrollContainerRef}
        className="scroll-body flex gap-4 overflow-x-auto scroll-smooth no-scrollbar snap-x scroll-ps-6"
      >
        {children}
      </div>

      {/* 右侧按钮 */}
      <Button
        onClick={() => scroll("right")}
        className="scroll-button !absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md text-black"
      >
        <ChevronRight size={20} />
      </Button>
    </div>
  );
}
