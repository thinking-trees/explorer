import Scene from './scene.class';

describe('Class: Scene', () => {
  let testedSceneOptions = {
    canvasContext: {
      fillRect: (x, y, width, height) => void 0,
      clearRect: (x, y, width, height) => void 0
    },
    canvasWidth: 1000,
    canvasHeight: 1000
  };
  let testedSceneInstance;

  it('should initialize the TEST_SCENE ', () => {
    testedSceneInstance = new Scene(testedSceneOptions);

    expect(testedSceneInstance.shapeIdCounter).toEqual(0);
    expect(testedSceneInstance.canvasContext).toBeDefined();
    expect(testedSceneInstance.canvasWidth).toEqual(testedSceneOptions.canvasWidth);
    expect(testedSceneInstance.canvasHeight).toEqual(testedSceneOptions.canvasHeight);
  });

  it('should load default shapes: guidelines-x and guidelines-y', () => {
    testedSceneInstance.loadShapes();

    expect(testedSceneInstance.shapesManager.allShapes[0].name).toContain('Guidelines');
  });

  it('should be able to render itself', () => {
    expect(testedSceneInstance.render()).toBeTruthy();
  });

  it('should draw the background of current scene', () => {
    spyOn(testedSceneOptions.canvasContext, 'fillRect');
    testedSceneInstance.drawSceneBackground();

    expect(testedSceneOptions.canvasContext.fillRect).toHaveBeenCalled();
    expect(testedSceneOptions.canvasContext.fillRect).toHaveBeenCalledWith(0, 0,
      testedSceneOptions.canvasWidth, testedSceneOptions.canvasHeight);
  });

  it('should be able to clear itself', () => {
    spyOn(testedSceneOptions.canvasContext, 'clearRect');
    testedSceneInstance.clearScene();

    expect(testedSceneOptions.canvasContext.clearRect).toHaveBeenCalled();
    expect(testedSceneOptions.canvasContext.clearRect).toHaveBeenCalledWith(0, 0,
      testedSceneOptions.canvasWidth, testedSceneOptions.canvasHeight);
  });
});
