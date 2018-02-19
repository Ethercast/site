
// replace an item in an array
export default function replaceItem<T>(item: T, items?: T[], index?: number): T[] {
  const copy: T[] = items ? items.slice() : [];

  if (typeof index !== 'number') {
    copy.push(item);
  } else {
    copy[index] = item;
  }

  return copy;
}
