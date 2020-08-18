'use strict';

angular.module('sortingVisualizerProjectApp')
  .controller('SortingCtrl', [
    '$scope',
    '$timeout',
    'animationFactory',
    'mergeSort',
    'quickSort',
    'heapSort',
    'bubbleSort',
    function($scope, $timeout, animationFactory, mergeSort, quickSort, heapSort, bubbleSort) {

      $scope.logo = 'Sorting Visualizer';
      $scope.developer = 'by Caio Nakazawa';
      $scope.generateNewArrayButton = 'Generate new array';
      $scope.setModifier = 'Change array size and sorting speed';
      $scope.sortingTypes = [
        {label: 'Merge sort', algorithm: 'mergeSort', active: false},
        {label: 'Quick sort', algorithm: 'quickSort', active: false},
        {label: 'Heap sort', algorithm: 'heapSort', active: false},
        {label: 'Bubble sort', algorithm: 'bubbleSort', active: false},
      ];
      $scope.sortByMessage = 'Sort by:';
      $scope.blockParameters = false;
      $scope.numberOfElements = 50;
      const speed = 100000 / Math.pow($scope.numberOfElements, 2);
      const properties = animationFactory.elementProperties;

      function generateNewArray() {
        var elementsArray = [];
        for (let i = 0; i < $scope.numberOfElements; i++) {
          const randomValue = Math.floor(Math.random() * 100 + 1);
          elementsArray.push({
            id: i+1,
            value: randomValue,
            height: randomValue*5 + 'px',
            width: 700/$scope.numberOfElements + 'px',
            marginLeft: 100/$scope.numberOfElements + 'px',
            color: properties.defaultColor
          });
        }
        return elementsArray;
      }

      $scope.elements = generateNewArray();

      $scope.generateNewArray = function() {
        if (!$scope.blockParameters) {
          $scope.elements = generateNewArray();
        }
      };

      $scope.changeArraySizeAndSortingSpeed = function () {
        $scope.elements = generateNewArray();
      };

      function selectSortAndRun(algorithm) {
        let array = angular.copy($scope.elements);
        switch (algorithm) {
          case 'mergeSort': return mergeSort.sort(array);
          case 'quickSort': return quickSort.sort(array);
          case 'heapSort': return heapSort.sort(array);
          default: return bubbleSort.sort(array);
        }
      }

      function findElementById(id) {
        return $scope.elements.find(function (element) {
          return element.id === id;
        });
      }

      function findIndexElementById(id) {
        return $scope.elements.findIndex(function (element) {
          return element.id === id;
        });
      }

      function makeAnimation(animations) {
        return new Promise((resolve => {

          for (let i = 0; i < animations.length; i++) {

            $timeout(function () {
              switch (animations[i].action) {
                case properties.SELECTION_ACTION:
                  if (animations[i].firstElementId) {
                    let firstElement = findElementById(animations[i].firstElementId);
                    firstElement.color = animations[i].color;
                  }

                  if (animations[i].secondElementId) {
                    let secondElement = findElementById(animations[i].secondElementId);
                    secondElement.color = animations[i].color;
                  }

                  break;

                case properties.SWAP_ACTION:
                  let firstElementIndexSWAP = findIndexElementById(animations[i].firstElementId);
                  let secondElementIndexSWAP = findIndexElementById(animations[i].secondElementId);

                  let firstElementSWAPCopy = $scope.elements[firstElementIndexSWAP];
                  $scope.elements[firstElementIndexSWAP] = $scope.elements[secondElementIndexSWAP];
                  $scope.elements[secondElementIndexSWAP] = firstElementSWAPCopy;

                  $scope.elements[firstElementIndexSWAP].color = animations[i].color;
                  $scope.elements[secondElementIndexSWAP].color = animations[i].color;

                  break;

                case properties.OVERRIDE_ACTION:
                  let removedElement = $scope.elements.splice(animations[i].indexToBeRemoved, 1);
                  removedElement[0].color = animations[i].color;
                  $scope.elements.splice(animations[i].indexToBeInserted, 0, removedElement[0]);

                  break;
              }

              if (i === animations.length - 1) {
                $scope.elements.forEach(function (element) {
                  element.color = properties.selectedElementColor;
                });
                resolve();
              }

            }, speed * (i+1));
          }
        }));
      }

      $scope.runSort = function(algorithm) {
        if (!$scope.blockParameters) {

          $scope.blockParameters = true;
          const foundAlgorithm = $scope.sortingTypes.find(function(currentAlgorithm) {
            return currentAlgorithm.algorithm === algorithm;
          });

          foundAlgorithm.active = true;

          let animations = selectSortAndRun(algorithm);

          makeAnimation(animations).then(function () {
            $scope.blockParameters = false;
            foundAlgorithm.active = false;
            $scope.$apply();
          });
        }
      };

    }]);
