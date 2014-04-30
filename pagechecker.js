var Bluefish = Bluefish || {};

/**
 * Create a new object to monitor the current page
 *
 * interval - How many miliseconds will be used to check the page
 * debug - Enable or disable debug mode
 */
Bluefish.PageChecker = function(interval, debug) {
   this.interval = interval;  // interval, miliseconds
   this.checksum = null;      // current checksum
   this.changed  = null;      // callback to call if the page is changed
   this.checking = null;      // callback to call when checking for changes
   this.debug    = debug;     // debug mode

   // sets the callback function on the specified interval
   this.interval = setInterval(this.checkPage.bind(this), this.interval);

   // filters to use on the html content
   this.filters  = [this.style];

   // here we go
   this.msg("Calculating first checksum");
   this.checksum = this.getPageMd5();
   this.msg("First checksum calculated as "+this.checksum);
}

/**
 * Show a message on console, if on verbose mode
 *
 * msg - the message
 */
Bluefish.PageChecker.prototype.msg = function(msg) {
   if (!this.debug)
      return;
   console.log("PageChecker: "+msg);
}

/**
 * Remove <style></style> content
 */
Bluefish.PageChecker.prototype.style = function(html) {
   return html.replace(/<style.*<\/style>/gi, "");
}

/**
 * Get the current page MD5 checksum
 */
Bluefish.PageChecker.prototype.getPageMd5 = function() {
   var html = $("html").html();
   for(var i=0, t=this.filters.length; i<t; i++) {
      html = this.filters[i](html);
   }
   return $.md5(html);
}

/**
 * Function to call if the page changes
 */
Bluefish.PageChecker.prototype.change = function(func) {
   this.changed = func;
   return this;
}

/**
 * Function to call when checking page
 */
Bluefish.PageChecker.prototype.check = function(func) {
   this.checking = func;
   return this;
}

/**
 * Debug mode
 */
Bluefish.PageChecker.prototype.debug = function(debug) {
   this.debug = debug;
   return this;
}

/**
 * Clear the current interval
 */
Bluefish.PageChecker.prototype.clearInterval = function() {
   clearInterval(this.interval);
   return this;
}

/**
 * Check page content
 */
Bluefish.PageChecker.prototype.checkPage = function() {
   this.msg("checking page");

   // if there is a function to tell that is checking the
   // page, call it.
   if (this.checking) {
      this.checking();
   }

   // get the current checksum
   var cursum = this.getPageMd5();

   // if changed ...
   if (this.checksum != cursum) {
      this.msg("page changed");
      this.clearInterval();

      if(!this.changed) {
         this.msg("calling default alert");
         alert("Page changed!");
      } else {
         this.msg("calling custom alert");
         this.changed();
      }
   }
}
