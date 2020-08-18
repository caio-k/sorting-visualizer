'use strict';

angular.module('sortingVisualizerProjectApp')
  .service('heapSort', ['animationFactory', function (animationFactory) {

    const properties = animationFactory.elementProperties;

    function heapify(array, rootIndex, sizeOfHeap, animations) {

      let largest = rootIndex;
      let left = 2*rootIndex + 1;
      let right = 2*rootIndex + 2;

      if (left < sizeOfHeap) {
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[left].id, properties.selectedElementColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[left].id, properties.defaultColor, properties.SELECTION_ACTION));

        if (array[largest].value < array[left].value) {
          largest = left;
        }
      }

      if (right < sizeOfHeap) {
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[right].id, properties.selectedElementColor, properties.SELECTION_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[right].id, properties.defaultColor, properties.SELECTION_ACTION));

        if (array[largest].value < array[right].value) {
          largest = right;
        }
      }


      if (largest !== rootIndex) {
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[rootIndex].id, properties.selectedElementColor, properties.SWAP_ACTION));
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[largest].id, array[rootIndex].id, properties.defaultColor, properties.SELECTION_ACTION));

        let swap = array[largest];
        array[largest] = array[rootIndex];
        array[rootIndex] = swap;

        heapify(array, largest, sizeOfHeap, animations);
      }
    }

    this.sort = function (array) {
      let animations = [];
      let sizeOfHeap = array.length;

      // Build heap
      for (let i = (sizeOfHeap/2 - 1); i >= 0; i--) {
        heapify(array, i, sizeOfHeap, animations);
      }

      for (let i = sizeOfHeap-1; i > 0; i--) {

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, array[i].id, properties.selectedElementColor, properties.SWAP_ACTION));

        let swap = array[0];
        array[0] = array[i];
        array[i] = swap;

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, null, properties.defaultColor, properties.SELECTION_ACTION));

        heapify(array, 0, i, animations);
      }
      animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, null, properties.selectedElementColor, properties.SELECTION_ACTION));

      return animations;
    };

  }]);
