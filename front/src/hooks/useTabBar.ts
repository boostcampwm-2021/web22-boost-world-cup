import { useState, useEffect } from 'react';

const useTabBar = (changeEffect?: () => void): [number, (pressedTab: number) => void] => {
  const [currentTab, setCurrentTab] = useState(1);
  const onTabChange = (pressedTab: number) => {
    if (pressedTab === currentTab) return;
    setCurrentTab(pressedTab);
  };

  useEffect(() => {
    if (!changeEffect) return;
    changeEffect();
  }, [currentTab]);

  return [currentTab, onTabChange];
};

export default useTabBar;
