const formatAddress = (adr?: string) => {
  if (!adr || adr === "undefined") return;

  const minLength = 9;
  const startLength = 5;
  const endLength = 4;

  return adr.length > minLength
    ? adr.substring(0, startLength) +
        "..." +
        adr.substring(adr.length - endLength)
    : adr;
};

export default formatAddress;
