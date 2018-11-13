export function formatWeight(grams) {
  return (grams/1000) + " kg"
}

export const STATUS = {
  1: 'Open',
  2: 'Picked up',
  3: 'On the way',
  4: 'Delivered'
};

export const STATUS_COLORS = {
    1: 'Blue',
    2: 'Gray',
    3: 'Green',
    4: 'Orange',  //TODO: couldnt find a picture with delivered status
};
