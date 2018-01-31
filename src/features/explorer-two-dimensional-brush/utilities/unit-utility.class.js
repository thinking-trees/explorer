export default class UnitUtility {
  static computePixelsPerMillimetre(pixels, millimetres) {
    return pixels / millimetres;
  }

  static convertMillimetresToPixels(millimetres, pixelsPerMillimetre) {
    return millimetres * pixelsPerMillimetre;
  }

  static convertPixelsToMillimetres(pixels, pixelsPerMillimetre) {
    return pixels / pixelsPerMillimetre;
  }

  static convertMillimetresToInches(millimetres) {
    return millimetres / 25.4;
  }

  static convertInchesToMillimetres(inches) {
    return inches * 25.4;
  }

  static convertInchesToPixels(inches, pixelsPerMillimetre) {
    return UnitUtility.convertMillimetresToPixels(
      UnitUtility.convertInchesToMillimetres(inches), pixelsPerMillimetre);
  }

  static convertPixelsToInches(pixels, pixelsPerMillimetre) {
    return UnitUtility.convertMillimetresToInches(
      UnitUtility.convertPixelsToMillimetres(pixels, pixelsPerMillimetre));
  }

}
