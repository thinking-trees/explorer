import EditableShape from './editable-shape.class';

describe('Class: EditableShape', () => {
  let testedEditableShapeOptions = {
    type: 'TEST_EDITABLE_SHAPE',
    canvasContext: {
      setLineDash: () => void 0,
      strokeRect: () => mockStrokeSelectedRect.strokeSelectedRect()
    },
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    contextWidth: 1000,
    contextHeight: 1000,
    selected: false
  };
  let testedEditableShapeInstance;
  let mockStrokeSelectedRect;

  it('should initialize the TEST_EDITABLE_SHAPE', () => {
    testedEditableShapeInstance = new EditableShape(testedEditableShapeOptions);

    expect(testedEditableShapeInstance.type).toEqual(testedEditableShapeOptions.type);
    expect(testedEditableShapeInstance.selected).toBeFalsy();
  });

  it('should draw the status for current shape which is selected', () => {
    mockStrokeSelectedRect = jasmine.createSpyObj('mockStrokeSelectedRect', ['strokeSelectedRect']);
    testedEditableShapeInstance.select();

    expect(mockStrokeSelectedRect.strokeSelectedRect).toHaveBeenCalled();
  });
});
