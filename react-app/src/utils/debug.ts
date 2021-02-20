const debug = (...data: any[]): void => {
  if (process.env.NEXT_PUBLIC_SHOW_DEBUG_LOGS !== "true") return;
  const currentDate = new Date().toLocaleString("es-Es");
  console.log("DEBUG LOG:", currentDate, "DATA:", ...data);
};

export default debug;
