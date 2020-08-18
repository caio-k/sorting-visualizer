'use strict';

angular.module('sortingVisualizerProjectApp')
  .service('mergeSort', ['animationFactory', function (animationFactory) {

    const properties = animationFactory.elementProperties;

    function isItLastIteration(left, right, numberOfElements) {
      return left === 0 && right === numberOfElements-1;
    }

    function mergeSortConquer(array, left, midpoint, right, animations) {

      let arrayCopy = angular.copy(array);
      let firstPartIndex = left;
      let secondPartIndex = midpoint + 1;
      let responseIndex = left;

      while (firstPartIndex <= midpoint && secondPartIndex <= right) {

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[firstPartIndex].id, arrayCopy[secondPartIndex].id, properties.selectedElementColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[firstPartIndex].id, arrayCopy[secondPartIndex].id, properties.defaultColor, properties.SELECTION_ACTION));

        if (arrayCopy[firstPartIndex].value < arrayCopy[secondPartIndex].value) {
          animations.push(animationFactory.createElementAnimationForOverride(responseIndex, responseIndex,
            isItLastIteration(left, right, array.length) ? properties.selectedElementColor : properties.defaultColor, properties.OVERRIDE_ACTION));
          array[responseIndex] = arrayCopy[firstPartIndex];
          firstPartIndex++;
        } else {
          animations.push(animationFactory.createElementAnimationForOverride(secondPartIndex, responseIndex,
            isItLastIteration(left, right, array.length) ? properties.selectedElementColor : properties.defaultColor, properties.OVERRIDE_ACTION));
          array[responseIndex] = arrayCopy[secondPartIndex];
          secondPartIndex++;
        }
        responseIndex++;
      }

      while (firstPartIndex <= midpoint) {
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[firstPartIndex].id, null, properties.selectedElementColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[firstPartIndex].id, null, properties.defaultColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForOverride(responseIndex, responseIndex,
          isItLastIteration(left, right, array.length) ? properties.selectedElementColor : properties.defaultColor, properties.OVERRIDE_ACTION));
        array[responseIndex] = arrayCopy[firstPartIndex];
        firstPartIndex++;
        responseIndex++;
      }

      while (secondPartIndex <= right) {
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[secondPartIndex].id, null, properties.selectedElementColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(arrayCopy[secondPartIndex].id, null, properties.defaultColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForOverride(secondPartIndex, responseIndex,
          isItLastIteration(left, right, array.length) ? properties.selectedElementColor : properties.defaultColor, properties.OVERRIDE_ACTION));
        array[responseIndex] = arrayCopy[secondPartIndex];
        secondPartIndex++;
        responseIndex++;
      }
    }

    function mergeSortDivide(array, left, right, animations) {
      if (left < right) {
        let midpoint = Math.floor((left + right)/2);
        mergeSortDivide(array, left, midpoint, animations);
        mergeSortDivide(array, midpoint + 1, right, animations);
        mergeSortConquer(array, left, midpoint, right, animations);
      }
    }

    this.sort = function (array) {
      let animations = [];
      mergeSortDivide(array, 0, array.length-1, animations);
      return animations;
    };

  }]);
