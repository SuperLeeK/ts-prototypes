# Promise

## \[static\] delay
- Use timers in promise chains

  ```
  new Promise((resolve, reject) => {
    console.log('start');
    resolve();
  })
    .then(() => {
      return Promise.delay(3000);
    })
    .then(() => {
      console.log('done');
    });                                 // start -> after 3 seconds -> done
  ```
