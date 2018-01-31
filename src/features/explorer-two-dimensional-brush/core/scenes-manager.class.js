export default class ScenesManager {
  static getCurrentScene() {
    return ScenesManager._currentScene;
  }

  static setCurrentScene(scene) {
    ScenesManager._currentScene = scene;
  }

}

ScenesManager._currentScene = void 0;
