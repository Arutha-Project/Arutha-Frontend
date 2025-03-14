
export const getRandomDrawingObject = (): string => {
  const drawingObjectName = [
    'Lollipop', 'Basket', 'Apple', 'Cat', 'Calculator', 'Airplane', 'Ear', 'Mountain', 'Cloud', 'Foot',
    'Crab', 'Clock', 'Car', 'Axe', 'Eye', 'Flower', 'Hot Air Balloon', 'Banana', 'Knife', 'Bicycle', 'Line',
    'Bus', 'Star', 'Sun', 'Leaf', 'Ice Cream', 'Fish', 'Parrot', 'Duck', 'Dog', 'Mushroom', 'Headphones',
    'Hat', 'Cake', 'Envelope', 'Campfire', 'Key', 'Elephant', 'Carrot', 'Bird', 'Candle', 'Cactus', 'Ant',
    'Circle', 'Butterfly', 'Triangle', 'Mug', 'House'
  ];

  const randomIndex = Math.floor(Math.random() * drawingObjectName.length);
  return drawingObjectName[randomIndex];
}
