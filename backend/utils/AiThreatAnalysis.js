export const analyzeThreat = (logData) => {
    if (logData.includes("unauthorized access")) return "High";
    if (logData.includes("suspicious activity")) return "Medium";
    return "Low";
};
  