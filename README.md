Celando
=======
Even if you cannot see them, they actually exist.

What is this
------------
*Celando* is a javascript library that with the help of *jQuery* enables a show more/less system for your elements. It's smart since it knows at what element are you trying to apply the magic so it can works in the correct way through an adapters set. You can even use *Celando* for lazy loading your stuff via AJAX.

How I use it
------------
Just a look at the [demo](http://mozestudio.github.io/celando/) should be enough for you, my young padawan.

The prototype of the function is `$.celando($target, config)`: `$target` can be a single element (i.e. `p`) or a list of items (i.e. `ul > li`). `config` is an optional parameter that allows you to give more informations to *Celando* about how and what it has to do.

`$container`: The container in which your elements are stored. If not given, *Celando* auto-detects it.

`$toggleButton`: The show more/less button element.

`$toggleButtonPos`: Where *Celando* has to put the button when `$toggleButton` is not defined (if you don't define it, it will append the button to `$target`).

`length`: The number of words to show in your paragraph. Default: `300`.

`numItems`: The number of items to show in your list. Default: `3`.

`animation`: Enable or disable the animation. Default: `true` (aka animations enabled).

`animationTime`: The duration of the animation. Default: `300` ms.

`adapter`: Set a your own adapter so *Celando* can performs strange kind of magics to `$target`.

`onToggle`: A function that is invoked when the more/less toggle is performed. The `animation` function is given as param. It's currently enabled only in `LazyList`.

`callback`: A function that is invoked at the end of the setup. The `adapter` class instance and the `config` are given as params.

`lazy`: When enabled, it forces the use of the `LazyList` adapter. To load your lazy loaded contents, just put your logic in `onToggle` (and remember, if you want, to perform your animation with the given param). You could use as toggle event even the page scrolling instead than clicking on the link. To do this, just define a listener through `callback` and call the `toggle` function through the adapter given as param. Default: `false`.

`label`: The toggle button's default text. Default: `{ more: 'More', less: 'Less' }`.
