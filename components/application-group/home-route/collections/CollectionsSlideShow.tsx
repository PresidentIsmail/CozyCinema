import { collections } from "@/constants/collections";

import CollectionCard from "./CollectionCard";
import SectionHeader from "@/components/SectionHeader";

const renderCollectionsSlideShow = () => {
  return (
    <ul className="flex transform animate-scroll gap-4 py-1 transition-all lg:gap-6">
      {collections.map((collection) => (
        <CollectionCard
          key={collection.id}
          image={collection.image}
          videoPath={collection.videoPath}
          title={collection.title}
        />
      ))}
    </ul>
  );
};

const CollectionsSlideShow = () => {
  return (
    <section
      className="master-container flex flex-col pt-[64px] lg:pt-[72px]"
      // use style to hide overflow on the right side of the screen
      style={{
        clipPath: "inset( -100vw -100vw -100vw 16px )",
      }}
    >
      <SectionHeader sectionTitle="Beyond the Ordinary: Collections" />
      <div className="mt-4 flex gap-4 lg:mt-6 lg:gap-6">
        {renderCollectionsSlideShow()}
        {/* duplicate the list to create an infinite slide show */}
        {renderCollectionsSlideShow()}
        {/* dulicate again on lg screens */}
        <span className="hidden lg:block">{renderCollectionsSlideShow()}</span>
      </div>
    </section>
  );
};

export default CollectionsSlideShow;
