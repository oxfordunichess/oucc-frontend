# Front-end for the OUCC website

Hello prospective contributer to the Oxford University Chess Club website! You're about to enter the wonderful world of a technology called **React**. This document is designed as an introduction to that technology and an onboarding for you to maintain it. React is super easy and critically, *modularised*, everything should been in nice, easy, findable, manageable chunks for you to break down and work with. Have fun from hereon forward!

Of course, if you've already used React, go on right ahead. If you have any problems in all of this, if it looks React-y, feel free to contact [Aloysius Lip](mailto:aloysiuslip@gmail.com) who engineered this rewrite. Any bits of design spec you have any question about, contact previous owner [Joris Gerlagh](mailto:joris.gerlagh@univ.ox.ac.uk).

So React is like HTML but you use JavaScript to render it first. It's incredibly efficient, meaning you can tell it to render the same thing in several places and it will recognise and reuse components, rather than re-rendering, meaning you don't have to copy out code. That's the 'modularise' thing I was talking about earlier. What that means is we can define different components, like 'header' or 'sidebar' and use them on every page.

The place to start is on App.jsx, which contains your basic router. You have the '/' page explicitly routed, as well as a redirect for /members and /termard in place, the rest is iteratively rendered. You can find each of those pages in the /pages folder