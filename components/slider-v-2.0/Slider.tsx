"use client";

import React from "react";
import { AnimatePresence } from "framer-motion";

import MediaCard from "../MediaCard";
import MotionMediaCard from "./MotionMediaCard";
import SliderBody from "./SliderBody";
import Controls from "./Controls";
import LoadingSpinner from "../LoadingSpinner";

type SliderProps = {
  sliderData: any[];
  initData: any;
  imageAspectRatio: "16:9" | "2:3";
  imageLoaderType: "spinner" | "skeleton";
  sliderHeaderComponent: React.ReactNode;
};

const Slider = ({
  sliderData,
  initData,
  imageAspectRatio = "2:3",
  imageLoaderType = "spinner",
  sliderHeaderComponent,
}: SliderProps) => {
  const [data, setData] = React.useState<any[]>(sliderData.slice(1));
  const [transitionData, setTransitionData] = React.useState<any>(
    sliderData[0],
  );
  const [currentSlideData, setCurrentSlideData] =
    React.useState<CurrentSlideData>({
      data: initData,
      index: 0,
    });

  return (
    <AnimatePresence>
      <section className=" master-container pt-[64px] lg:pt-[72px]">
        <div className="flex h-full w-full grid-cols-10 flex-col md:grid">
          {sliderHeaderComponent}

          <div className=" col-span-6 mt-4 flex h-full flex-1 flex-col justify-start md:justify-center lg:mt-6 ">
            <SliderBody>
              {data.map((data) => (
                <MotionMediaCard
                  key={data.id}
                  data={data}
                  aspect_ratio={imageAspectRatio}
                  loaderType={imageLoaderType}
                />
              ))}
            </SliderBody>

            <Controls
              currentSlideData={currentSlideData}
              data={data}
              transitionData={transitionData}
              initData={initData}
              handleData={setData}
              handleTransitionData={setTransitionData}
              handleCurrentSlideData={setCurrentSlideData}
              sliderData={sliderData}
            />
          </div>
        </div>
      </section>
    </AnimatePresence>
  );
};

export default Slider;
