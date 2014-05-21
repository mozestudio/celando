Celando
=======
Even if you cannot see them, they actually exist.

What is this
------------
*Celando* is a javascript library that with the help of *jQuery* enables a show more/less system for your elements, and it's smart because
it knows at what element are you trying to apply the magic so it can works in the correct way through an adapters set.

How I use it
------------
Just a look at the [demo]() and its source should be enough for you, my young padawan.

The prototype is `$.celando($target, config)`. `$target` can be a single element (i.e. `p`) or a list of items (i.e. `ul > li`).

`config` is an optional parameter that allows you to give more informations to *Celando* about how and what it has to do.

`$toggleButton`: The show more/less button element
`$toggleButtonPos`: Where *Celando* has to put the button where `$toggleButton` is not defined (if you don't define it, it will append the button to $target)
`length`: The number of words to show in your paragraph
`numItems`: The number of items to show in your list
`animation`: Enable or disable the animation (default: `true`, aka animations enabled)
`animationTime`: The time in which the animation is performed (default: `300`ms)
`adapter`: Set a your own adapter so *Celando* can performs strange kind of magics to `$target`
`label`: The toggle button's default strings