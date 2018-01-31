import SceneStates from './scene-states.enum';

export default class SceneStateManager {
  constructor() {
    this.state = SceneStates.original;
  }

  getCurrentState() {
    return this.state;
  }

  transitionToChanged() {
    this.state = SceneStates.changed;
  }

  transitionToSaved() {
    this.state = SceneStates.saved;
  }

}
