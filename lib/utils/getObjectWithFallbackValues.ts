import objectFromEntries from "lib/utils/objectFromEntries";

function getObjectWithFallbackValues<ObjectType>(
  object: ObjectType,
  fallbackValues: ObjectType,
  skipKeys?: string[]
) {
  const objectEntries = Object.entries(object);
  const newObjectEntries = objectEntries.map((entry) => {
    const [key, value] = entry;
    if (skipKeys?.includes(key)) return entry;
    return [key, value || fallbackValues[key]] as [string, unknown];
  });
  return objectFromEntries(newObjectEntries) as ObjectType;
}

export default getObjectWithFallbackValues;
