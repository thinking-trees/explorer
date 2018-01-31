import SceneTypes from './scene-types.enum';
import SeedScene from '../scenes/seed/seed-scene.class';
import SeedSceneConfigRepository from '../scenes/seed/seed-scene-config-repository.class';
import SeedSceneContainerService from '../scenes/seed/seed-scene-container.service';

const sceneFactory = {};

sceneFactory.createScene = (sceneType, options) => {
  let sceneInstance;

  switch (sceneType) {
  case SceneTypes.seedScene:
  default:
    sceneInstance = new SeedScene(options);
    break;
  }

  return sceneInstance;
};

sceneFactory.createSceneConfigRepository = (sceneType, options) => {
  let sceneConfigRepositoryInstance;

  switch (sceneType) {
  case SceneTypes.seedScene:
  default:
    sceneConfigRepositoryInstance = new SeedSceneConfigRepository(options);
    break;
  }

  return sceneConfigRepositoryInstance;
};

sceneFactory.createSceneContainerService = (sceneType, options) => {
  let sceneContainerServiceInstance;

  switch (sceneType) {
  case SceneTypes.seedScene:
  default:
    sceneContainerServiceInstance = new SeedSceneContainerService(options);
    break;
  }

  return sceneContainerServiceInstance;
};

export default sceneFactory;
