export const formatDate = (date: string) => {
  const now = new Date();
  const newDate = new Date(date);
  const diffInDays = Math.floor((+now - +newDate) / (1000 * 60 * 60 * 24));

  if (diffInDays === 0) return "hoje";
  if (diffInDays === 1) return "ontem";
  if (diffInDays <= 6) return `há ${diffInDays} dias`;

  const weeks = Math.floor(diffInDays / 7);
  if (diffInDays <= 29) return `há ${weeks} semana${weeks > 1 ? "s" : ""}`;

  const months = Math.floor(diffInDays / 30);
  if (diffInDays <= 365) return `há ${months} mês${months > 1 ? "es" : ""}`;

  const years = Math.floor(diffInDays / 365);
  return `há ${years} ano${years > 1 ? "s" : ""}`;
};
