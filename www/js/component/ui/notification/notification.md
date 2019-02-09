### Here is several examples how to use Notification

```javascript
/* eslint-disable promise/catch-or-return, react/react-in-jsx-scope, react/jsx-filename-extension */

import {hideSnackBar, showSnackBar} from './action';
import {SnackBar} from './snack-bar/c-snack-bar';
import {snackBarTypes} from './snack-bar/snack-bar-types';

showSnackBar('I am simple snackbar');
showSnackBar('I am simple snackbar with id, you can close me by id', 'snack-bar-id');
showSnackBar('I am simple snackbar with params', {id: 'the-snackbar-id'});

showSnackBar(
    <SnackBar type={snackBarTypes.info}>SnackBar as modal element, screen is disabled</SnackBar>,
    {
        id: 'any-snackbar-is', // optional, default - `${Math.random()}`
        isModal: true, // optional, default - false
        timer: 3e3 // optional, default - 6e3
    }
)
    .then(() => console.log('snackbar has been hidden'));

(async () => {
    await showSnackBar('Queue of snack bars, item - 1');
    await showSnackBar('Queue of snack bars, item - 2');
    await showSnackBar('Queue of snack bars, item - 3');
    await showSnackBar('Queue of snack bars, item - 4');
    await showSnackBar('Queue of snack bars, item - 5');
})();

hideSnackBar('the-snackbar-id-to-hide');
```


