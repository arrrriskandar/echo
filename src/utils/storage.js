export const loadGameState = () => {
  const data = localStorage.getItem("current-game-state");
  return data ? JSON.parse(data) : null;
};

export const saveGameState = (state) => {
  localStorage.setItem("current-game-state", JSON.stringify(state));
};

export const clearGameState = () => {
  localStorage.removeItem("current-game-state");
};

export const saveOnboardingState = () => {
  localStorage.setItem("hasSeenOnboarding", "true");
};

export const loadStreak = () => {
  const data = localStorage.getItem("streak");
  return data ? JSON.parse(data) : { count: 0, lastSolvedDate: null };
};

export const saveStreak = (streak) => {
  localStorage.setItem("streak", JSON.stringify(streak));
};
