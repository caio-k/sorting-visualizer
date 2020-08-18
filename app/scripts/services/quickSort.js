'use strict';

angular.module('sortingVisualizerProjectApp')
  .service('quickSort', ['animationFactory', function (animationFactory) {

    const properties = animationFactory.elementProperties;

    function partition(array, left, right, animations) {
      let pivot = array[right];
      let i = left; // smaller elements
      for (let j = left; j < right; j++) {

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, pivot.id, properties.selectedElementColor, properties.SELECTION_ACTION));

        if (array[j].value <= pivot.value) {

          animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, array[i].id, properties.selectedElementColor, properties.SWAP_ACTION));

          let temp = array[i];
          array[i] = array[j];
          array[j] = temp;

          animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, array[i].id, properties.defaultColor, properties.SELECTION_ACTION));

          i++;
        }
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, pivot.id, properties.defaultColor, properties.SELECTION_ACTION));
      }
      animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[i].id, array[right].id, properties.selectedElementColor, properties.SELECTION_ACTION));
      animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[i].id, array[right].id, properties.selectedElementColor, properties.SWAP_ACTION));
      animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[i].id, array[right].id, properties.defaultColor, properties.SELECTION_ACTION));

      let temp2 = array[i];
      array[i] = array[right];
      array[right] = temp2;
      return i;
    }

    function quickSort(array, left, right, animations) {
      if (left < right) {
        let p = partition(array, left, right, animations);
        quickSort(array, left, p-1, animations);
        quickSort(array, p+1, right, animations);
      }
    }

    this.sort = function (array) {
      let animations = [];
      quickSort(array, 0, array.length-1, animations);
      return animations;
    };

  }]);
