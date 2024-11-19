import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';

const ModalContext = createContext();

export function useModal() {
  return useContext(ModalContext);
}

export function ModalProvider({ children }) {
  const [isMenuVisible, setIsMenuVisible] = useState(false);
  const [showEndMessage, setShowEndMessage] = useState(false);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);

  const toggleMenuModal = () => {
    setIsMenuVisible(!isMenuVisible);
  };

  const toggleEndMessage = (state) => {
    setShowEndMessage(state);
  };

  const toggleSettings = () => {
    setIsSettingsVisible(!isSettingsVisible);
  };

  const handleKeyDown = useCallback((event) => {
    if (event.key === 'Escape') {
      setIsMenuVisible(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <ModalContext.Provider value={{
      isMenuVisible,
      showEndMessage,
      isSettingsVisible,
      toggleMenuModal,
      toggleEndMessage,
      toggleSettings
    }}>
      {children}
    </ModalContext.Provider>
  );
}
