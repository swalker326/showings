import { useState } from 'react';

export function useCalendarNavigation() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(new Date(currentDate.setMonth(
      currentDate.getMonth() + (direction === 'next' ? 1 : -1)
    )));
  };

  return {
    currentDate,
    setCurrentDate,
    navigateMonth
  };
}