import { useState, useEffect, useCallback } from 'react';

const useTabBar = (changeEffect?: () => void): [number, (pressedTab: number) => void] => {
  const [currentTab, setCurrentTab] = useState(1);
  const onTabChange = useCallback(
    (pressedTab: number) => {
      if (pressedTab === currentTab) return;
      setCurrentTab(pressedTab);
    },
    [currentTab],
  );

  useEffect(() => {
    if (!changeEffect) return;
    changeEffect();
  }, [currentTab]);

  return [currentTab, onTabChange];
};

export default useTabBar;
