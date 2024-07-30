import React, { createContext, useContext, useState } from 'react';

const BlurContext = createContext();

export const useBlur = () => useContext(BlurContext);

export const BlurProvider = ({ children }) => {
  const [isBlurred, setIsBlurred] = useState(false);

  const toggleBlur = () => {
    setIsBlurred((prevIsBlurred) => !prevIsBlurred);
  };

  return (
    <BlurContext.Provider value={{ isBlurred, toggleBlur }}>
      {children}
    </BlurContext.Provider>
  );
};
