const dayCounter = () => {
  const start = Date.UTC(2025, 7, 4); // month is 0-based → 7 = August
  const now = new Date();

  // normalize current date to UTC 00:00
  const todayUTC = Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate()
  );

  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.floor((todayUTC - start) / msPerDay);

  return diffDays + 1;
};

export default dayCounter;
