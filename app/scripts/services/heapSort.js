'use strict';

angular.module('sortingVisualizerProjectApp')
  .service('heapSort', ['animationFactory', function (animationFactory) {

    const properties = animationFactory.elementProperties;

    function heapify(array, rootIndex, sizeOfHeap, animations) {

      var largest = rootIndex;
      var left = 2*rootIndex + 1;
      var right = 2*rootIndex + 2;

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

        var swap = array[largest];
        array[largest] = array[rootIndex];
        array[rootIndex] = swap;

        heapify(array, largest, sizeOfHeap, animations);
      }
    }

    this.sort = function (array) {
      var animations = [];
      var sizeOfHeap = array.length;

      // Build heap
      for (var i = (Math.floor(sizeOfHeap/2) - 1); i >= 0; i--) {
        heapify(array, i, sizeOfHeap, animations);
      }

      for (var j = sizeOfHeap-1; j > 0; j--) {

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, array[j].id, properties.selectedElementColor, properties.SWAP_ACTION));

        var swap = array[0];
        array[0] = array[j];
        array[j] = swap;

        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, null, properties.defaultColor, properties.SELECTION_ACTION));

        heapify(array, 0, j, animations);
      }
      animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[0].id, null, properties.selectedElementColor, properties.SELECTION_ACTION));

      return animations;
    };

  }]);
