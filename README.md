# PageChecker

Check if a HTML page content changed after it was loaded, applying some filters to remove some contents that can change after it was loaded. Right now only remove the `<style></style>` tags.

## Why use it

We just got some frauds here with a virus on the computer user that changed the content of the HTML page after it was loaded, changing some payment data without the user knowing about it. As the virus takes some seconds to go to a server to get the new page content, after the page is loaded a checksum is stored and after some time (configured by user) the page contents is checked again to see if it's the same.

## It works?

Right now we couldn't find another compromissed computer or even the virus to download again. :-) For What this scripts proposes to do, it works. ;-)

## What is needed to use it?

- JQuery - [http://jquery.com/](http://jquery.com/)
- JQuery MD5 - [https://github.com/placemarker/jQuery-MD5](https://github.com/placemarker/jQuery-MD5)

## Usage

Insert the `pagechecker.js` file on the `HEAD` tag and loaded it like this:

```
   $(document).ready(function() {
      new Bluefish.PageChecker(1500).change(function() {
         alert("Page content changed!");
      }).check(function() {
         console.log("Checking page on "+Date());
      });
   });
```
Where:

1. 1500 is 1500 miliseconds
2. `change` calls an optional function (the default is an `alert` with "Page changed!")
3. `check` calls an optional function to show when the page is being checked