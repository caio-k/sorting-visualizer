'use strict';

angular.module('sortingVisualizerProjectApp')
  .factory('animationFactory', function () {

    return {
      createElementAnimationForSelectionAndSwap: function (firstElementId, secondElementId, color, action) {
        return {
          firstElementId: firstElementId,
          secondElementId: secondElementId,
          color: color,
          action: action
        };
      },
      createElementAnimationForOverride: function (indexToBeRemoved, indexToBeInserted, color, action) {
        return {
          indexToBeRemoved: indexToBeRemoved,
          indexToBeInserted: indexToBeInserted,
          color: color,
          action: action
        };
      },
      elementProperties: {
        selectedElementColor: '#db3d3d',
        defaultColor: '#2e97eb',
        SELECTION_ACTION: 'SELECTION',
        SWAP_ACTION: 'SWAP',
        OVERRIDE_ACTION: 'OVERRIDE'
      }
    };
  });
