export const preventStringsInInputs = (e: React.KeyboardEvent) => {
  if (!Number.parseInt(e.key) && e.key !== "0" && e.key !== "Backspace")
    e.preventDefault();
};
