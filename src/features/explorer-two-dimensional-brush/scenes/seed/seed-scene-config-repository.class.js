export default class SeedSceneConfigRepository {
  constructor(options) {
    this.sceneId = options.sceneId;
    this.$q = options.ngLibrary.$q;
    this.$timeout = options.ngLibrary.$timeout;
  }

  loadShapes() {
    return this.$q(resolve => {
      this.$timeout(() => {resolve('Loaded.');});
    });
  }

  saveShapes() {
    return this.$q(resolve => {
      this.$timeout(() => {resolve('Saved.');});   
    });
  }
}
