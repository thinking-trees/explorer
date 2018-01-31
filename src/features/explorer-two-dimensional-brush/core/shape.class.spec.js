import Shape from './shape.class';

describe('Class: Shape', () => {
  let testedShapeOptions = {
    type: 'TEST_SHAPE',
    canvasContext: {
      setLineDash: () => void 0
    },
    x: 0,
    y: 0,
    rotation: 0,
    width: 100,
    height: 100,
    contextWidth: 1000,
    contextHeight: 1000
  };
  let testedShapeInstance;

  it('should initialize the TEST_SHAPE', () => {
    testedShapeInstance = new Shape(testedShapeOptions);

    expect(testedShapeInstance.type).toEqual(testedShapeOptions.type);
    expect(testedShapeInstance.width).toEqual(testedShapeOptions.width);
    expect(testedShapeInstance.height).toEqual(testedShapeOptions.height);
  });

  it('should be able to draw itself', () => {
    expect(testedShapeInstance.draw()).toBeTruthy();
  });

  it('should restore the context after drawing is finished', () => {
    testedShapeInstance.restoreContext();

    expect(testedShapeInstance.context.lineWidth).toEqual(1);
    expect(testedShapeInstance.context.strokeStyle).toEqual('#000000');
    expect(testedShapeInstance.context.fillStyle).toEqual('#000000');
  });
});
