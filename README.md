superCuteForms
==============

```
(\__/)     [x]
(>'.')     (0)
(_(")_(")  [- v]
```

This is a jQuery plugin that wraps radio, checkbox, and select form elements to make them super cute (allowing you to style them in a way CSS doesn't currently allow).  Inspired by uniform.js this is an effort to create a more minamal, faster executing plugin.

Reguires jQuery 1.7 (but can probably use lower version)

Licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php)

Usage Examples
--------------

Example
```javascript
$( "body" ).superCuteForms();
```

Example of undoing any changes made by superCuteForms
```javascript
$.superCuteForms.undo();
```

Example of undoing any changes made by superCuteForms within optional selection query (won't affect elements outside selection)
```javascript
$.superCuteForms.undo('div.myClass');
```

Retrieving jQuery collection of all elements on page affected by superCuteForms
```javascript
$.superCuteForms.affected();
```
