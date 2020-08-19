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
      $scope.sortByMessage = 'Algorithms:';
      $scope.blockParameters = false;
      $scope.numberOfElements = 50;
      var interval = 2000/$scope.numberOfElements;
      const properties = animationFactory.elementProperties;

      function generateNewArray() {
        var elementsArray = [];
        for (var i = 0; i < $scope.numberOfElements; i++) {
          const randomValue = Math.floor(Math.random() * 100) + 5;
          elementsArray.push({
            id: i+1,
            value: randomValue,
            height: randomValue*5 + 'px',
            color: properties.defaultColor
          });
        }
        interval = 2000/$scope.numberOfElements;
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

      function getFontSizeOfElements() {
        var fontSize;

        if ($scope.numberOfElements <= 10) {
          fontSize = 20;
        } else if ($scope.numberOfElements <= 20) {
          fontSize = 15;
        } else if ($scope.numberOfElements <= 30) {
          fontSize = 13;
        } else if ($scope.numberOfElements <= 35){
          fontSize = 10;
        } else {
          fontSize = 0;
        }

        return fontSize + 'px';
      }

      $scope.elementsInfo = function() {
        return {
          fontSize: getFontSizeOfElements(),
          width: 700/$scope.numberOfElements + 'px',
          marginLeft: 100/$scope.numberOfElements + 'px',
        };
      };

      function selectSortAndRun(algorithm) {
        var array = angular.copy($scope.elements);
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
        return new Promise(function (resolve) {
          for (var i = 0; i < animations.length; i++) {

            if (i === 0) {
              $scope.elements.forEach(function (element) {
                element.color = properties.defaultColor;
              });
            }

            $timeout(function (i) { return function() {
              switch (animations[i].action) {
                case properties.SELECTION_ACTION:
                  if (animations[i].firstElementId) {
                    var firstElement = findElementById(animations[i].firstElementId);
                    firstElement.color = animations[i].color;
                  }

                  if (animations[i].secondElementId) {
                    var secondElement = findElementById(animations[i].secondElementId);
                    secondElement.color = animations[i].color;
                  }

                  break;

                case properties.SWAP_ACTION:
                  var firstElementIndexSWAP = findIndexElementById(animations[i].firstElementId);
                  var secondElementIndexSWAP = findIndexElementById(animations[i].secondElementId);

                  var firstElementSWAPCopy = $scope.elements[firstElementIndexSWAP];
                  $scope.elements[firstElementIndexSWAP] = $scope.elements[secondElementIndexSWAP];
                  $scope.elements[secondElementIndexSWAP] = firstElementSWAPCopy;

                  $scope.elements[firstElementIndexSWAP].color = animations[i].color;
                  $scope.elements[secondElementIndexSWAP].color = animations[i].color;

                  break;

                case properties.OVERRIDE_ACTION:
                  var removedElement = $scope.elements.splice(animations[i].indexToBeRemoved, 1);
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
            };}(i), interval * (i+1));
          }
        });
      }

      $scope.runSort = function(algorithm) {
        if (!$scope.blockParameters) {

          $scope.blockParameters = true;
          const foundAlgorithm = $scope.sortingTypes.find(function(currentAlgorithm) {
            return currentAlgorithm.algorithm === algorithm;
          });

          foundAlgorithm.active = true;

          var animations = selectSortAndRun(algorithm);

          makeAnimation(animations).then(function () {
            $scope.blockParameters = false;
            foundAlgorithm.active = false;
            $scope.$apply();
          });
        }
      };

    }]);
