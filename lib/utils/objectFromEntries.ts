type EntryType = [string, any];

function objectFromEntries(entries: EntryType[]) {
  if (!Array.isArray(entries)) {
    console.error("Argument \"entries\" must be an array of entries");
    return {};
  }
  return (
    entries?.reduce((newObject, entry) => {
      if (!entry) return newObject;
      const [key, value] = entry;
      newObject[key] = value;
      return newObject;
    }, {}) || {}
  );
}

export default objectFromEntries;
