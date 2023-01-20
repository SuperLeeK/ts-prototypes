# Math

## \[static\] dfs_xy_conv

- Change the WGS84 coordinate system to xy form

  ```
  Math.dfs_xy_conv({ lat: 33, lng: 127 });  // { "x": 61, "y": 27 }
  ```

## \[static\] mid

- Returns the median value among the three

  ```
  Math.mid(0, 27, 13);                      // 13
  ```

## \[static\] distance

- Calculate the distance between points A and B in a two-dimensional coordinate system

  ```
  Math.distance(2, 2, 9, 9);                // 9.899494936611665
  ```

## \[static\] distanceWGS84

- Calculate the distance between points A and B in the WGS84 coordinate system

  ```
  Math.distanceWGS84(33, 127, 33.1, 127.1); // 14.509020743875812
  ```

## \[static\] betweenRandom

- Returns a random number between two numbers

  ```
  Math.betweenRandom(300, 10, true);        // 115
  ```
