import ShapeFactory from './shape-factory.service';
import ShapesConfig from './shapes.config';

describe('Service: ShapeFactory', () => {
  let mockedFloorShapeOptions = {
    type: ShapesConfig.genericFloor.type,
    context: null,
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    contextWidth: 1000,
    contextHeight: 1000
  };

  it('should create the instance for generic floor shape', () => {
    let genericFloorShape = ShapeFactory.create(mockedFloorShapeOptions);

    expect(genericFloorShape).toBeDefined();
    expect(genericFloorShape.type).toEqual(ShapesConfig.genericFloor.type);
  });
});
