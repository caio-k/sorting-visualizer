'use strict';

angular.module('sortingVisualizerProjectApp')
  .service('bubbleSort', ['animationFactory', function (animationFactory) {

    const properties = animationFactory.elementProperties;

    this.sort = function (array) {
      var animations = [];
      for (var i = array.length - 1; i >= 0; i--) {
        for (var j = 0; j < i; j++) {

          animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, array[j+1].id, properties.selectedElementColor, properties.SELECTION_ACTION));

          if (array[j].value > array[j+1].value) {

            animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, array[j+1].id, properties.selectedElementColor, properties.SWAP_ACTION));

            const aux = array[j];
            array[j] = array[j+1];
            array[j+1] = aux;
          }
          animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[j].id, array[j+1].id, properties.defaultColor, properties.SELECTION_ACTION));
        }
        animations.push(animationFactory.createElementAnimationForSelectionAndSwap(array[i].id, null, properties.selectedElementColor, properties.SELECTION_ACTION));
      }
      return animations;
    };
  }]);
