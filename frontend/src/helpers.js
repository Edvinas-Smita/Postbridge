export function formatWeight(grams) {
  return (grams/1000) + " kg"
}

export const STATUS = {
  1: 'Open',
  2: 'Picked up',
  3: 'On the way',
  4: 'Delivered'
};

export function deepDiff(o1, o2) {
    return Object.keys(o1).reduce((diff, key) => {
        if (o2[key] === o1[key]) return diff;
        return {
            ...diff,
            [key]: o1[key]
        }
    }, {});
}