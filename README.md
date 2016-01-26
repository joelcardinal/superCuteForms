superCuteForms
==============

```
(\__/)     [x]
(>'.')     (0)
(_(")_(")  [- v]
```

This is a jQuery plugin that wraps radio, checkbox, and select form elements to make them super cute (allowing you to style them in a way CSS doesn't currently allow).  Inspired by uniform.js this is an effort to create a more minamal, faster executing plugin.

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

Requirements
--------------
* >IE7, Firefox, Chrome, Safari
* jQuery 1.7 (but can probably use lower version)
* The included CSS, you'll need to tweak it for your needs

Usage Examples
--------------

Example of initiating plugin, which will make checkboxes, radios, and selects
super cute.

*Note, all methods below accept one of three types of selectors as a parameter;
no selector, a non-form (check/radio/select) element selector, or form element
selectors.  However, it will bork if you give it a mix of form elements and
non-form elements:
```
// no param, acts on all check/radio/select in body
$.superCuteForms.wrap();

// non-form (check/radio/select) element, only acts on check/radio/select within selection
$.superCuteForms.wrap('.test1');

// form element, acts on only elements provided
$.superCuteForms.wrap('input[type="checkbox"],select');

// this won't work correctly, fixing this would increase execution time -- not a priority
$.superCuteForms.wrap('.test1, input'); 	
```
Example of undoing any changes made by superCuteForms. Removes all added elements
and classes:
```
$.superCuteForms.undo();
```
Example of retrieving all (check/radio/select) on page affected by superCuteForms:
```
$.superCuteForms.affected();
```
Example of correcting checkbox and radio selected/checked status, after
javascript is used to alter the status of a form element if jQuery's
change() method isn't used:
```
$.superCuteForms.refresh();
```
*Note, using refresh() won't be necessary if you alter checkbox and radio
selected/checked status using jQuery's change() method, for example:
```
$('input[type="checkbox"]').attr('checked','true').change();

var $radios = $('input:radio[name=r1]'); $radios.filter('[value=myRadio1]').prop('checked', true).change();
```
