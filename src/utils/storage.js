export const loadGameState = () => {
  const data = localStorage.getItem("echo-state");
  return data ? JSON.parse(data) : null;
};

export const saveGameState = (state) => {
  localStorage.setItem("echo-state", JSON.stringify(state));
};
