import SceneFactory from './scene-factory.service';
import SceneTypes from './scene-types.enum';

describe('Service: SceneFactory', () => {

  it('should create the instance for SeedScene', () => {
    let seedScene = SceneFactory.createScene(SceneTypes.seedScene, {});

    expect(seedScene).toBeDefined();
  });

  it('should create the instance for SeedSceneConfigRepository', () => {
    let sceneConfigRepository = SceneFactory
      .createSceneContainerService(SceneTypes.seedScene, {});

    expect(sceneConfigRepository).toBeDefined();
  });

  it('should create the instance for SeedSceneContainerService', () => {
    let sceneContainerService = SceneFactory
      .createSceneContainerService(SceneTypes.seedScene, {});

    expect(sceneContainerService).toBeDefined();
  });
});
