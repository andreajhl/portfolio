/**
 * It logs parameters passed has data and the current date only when
 * NEXT_PUBLIC_SHOW_DEBUG_LOGS is set to 'true' in the .env.
 * @param { ...any } data  The data you want to log.
 */
const debug = (...data: any[]): void => {
  if (process.env.NEXT_PUBLIC_SHOW_DEBUG_LOGS !== "true") return;
  const currentDate = new Date().toLocaleString("es-Es");
  console.log("DEBUG LOG:", currentDate, "DATA:", ...data);
};

export default debug;
