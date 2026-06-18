import * as React from "react";
import { useState, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import './expandable-tabs.css';

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 };

export function ExpandableTabs({
  tabs,
  className,
  onChange,
}) {
  const [selected, setSelected] = useState(null);
  const outsideClickRef = useRef(null);

  useOnClickOutside(outsideClickRef, () => {
    setSelected(null);
    onChange?.(null);
  });

  const handleSelect = (index, tab) => {
    setSelected(index);
    onChange?.(index, tab);
  };

  const Separator = () => (
    <div className="expandable-tab-separator" aria-hidden="true" />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn("expandable-tabs-container", className)}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;
        
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isSelected}
            onClick={() => handleSelect(index, tab)}
            transition={transition}
            className={cn(
              "expandable-tab-btn",
              isSelected ? "expandable-tab-active" : "expandable-tab-inactive"
            )}
          >
            <Icon size={20} className={isSelected ? "icon-gold" : "icon-gray"} />
            <AnimatePresence initial={false}>
              {isSelected && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="expandable-tab-text"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
}
