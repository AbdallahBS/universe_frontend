export function timeAgo(unixTimeStart: number, unixTimeEnd: number) {
  const diff = unixTimeEnd - unixTimeStart;
  const seconds = Math.floor(diff / 1000);

  const intervals = {
    year:   31536000,
    month:  2592000,
    day:    86400,
    hour:   3600,
    minute: 60,
    second: 1
  };

  for (const [unit, value] of Object.entries(intervals)) {
    const amount = Math.floor(seconds / value);
    if (amount >= 1) {
      return amount + " " + unit + (amount > 1 ? "s" : "") + " ago";
    }
  }
  
  return "just now";
}