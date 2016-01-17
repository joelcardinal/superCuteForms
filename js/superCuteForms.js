/*
*
*	superCuteForms.js
*	https://github.com/joelcardinal/superCuteForms
*	jQuery +1.7 plugin
*
*	(\__/)     [x]
*	(>'.')     (0)
*	(_(")_(")  [- v]
*
* 	Copyright 2015 Joel Cardinal
*	joelcardinal.com
*	Released under the MIT license
*	https://opensource.org/licenses/MIT
*
*/

(function ($) {
	var superCuteFormElemClass = 'superCuteFormElem',
		superCuteFormElemWrapperClass = 'superCuteFormElemWrapper',
		type = function($formElem){ return $formElem.attr('type') || 'select'},
		classToRemove,
		affectedArr = [],
		elemSelector = 'input[type="checkbox"], input[type="radio"], select',
	    checkedState = function ($inputElem) {
	        var state;
	        if ($inputElem[0].checked) {
				state = "checked";
				classToRemove = "unchecked";
			} else {
				state = "unchecked";
				classToRemove = "checked";
			}
	        return state;
	    },
		getSelection = function (selector){
			var $selection;
			if(!selector){
				if(document.querySelectorAll){
					$selection = $(document.querySelectorAll(elemSelector));
				}else{
					$selection = $('body').find(elemSelector);
				}
			}else{
				var query = $(selector);
				var tagName = query[0].tagName.toLowerCase();
				if( tagName == 'input' || tagName == 'select'){
					$selection = query;
				}else{
					$selection = query.find(elemSelector);
				}
			}
			return $selection;
		};
		
    $.superCuteForms = {};
	
	$.superCuteForms.wrap = function(selector) {
		$.each(getSelection(selector),function () {
           var $formElem = $(this);
           if (!$formElem.hasClass(superCuteFormElemClass)) {
				var inputType = type($formElem);
                affectedArr.push(this);
                if (inputType != 'select') {
					var state = checkedState($formElem);
					$formElem.addClass(superCuteFormElemClass).wrap('<div class="' + inputType + ' ' + superCuteFormElemWrapperClass + '"></div>').parent().append('<div class="' + state + ' ' + superCuteFormElemWrapperClass + '"></div>');
                    $formElem.on("change", function () {
						$.superCuteForms.refresh($formElem[0]);
                    });
                } else {
                    $formElem.addClass(superCuteFormElemClass).wrap('<div class="' + inputType + ' ' + superCuteFormElemWrapperClass + '"></div>');
                }
           }
        });
        return $(affectedArr);		
	}

    $.superCuteForms.undo = function (selector) {
		var $selection = $(getSelection(selector));
		$.each($selection, function () {
            if($(this).hasClass('superCuteFormElem')){
				$(this).parent().find('.superCuteFormElemWrapper').remove();
            	$(this).unwrap();
	            $(this).removeClass('superCuteFormElem');
				affectedArr.splice(affectedArr.indexOf(this),1);
            }
        });
    };

    $.superCuteForms.affected = function () {
        return $(affectedArr);
    }

    $.superCuteForms.refresh = function (selector) {
        var arr = [],
			$selection = $(getSelection(selector)),
			updateStatus = function($formElem){
	            if ($formElem.hasClass('superCuteFormElem')) {
	                arr.push($formElem);
					var inputType = type($formElem);
	                if (inputType != 'select') {
						var state = checkedState($formElem);
	                    if (inputType === "checkbox" && !$formElem.next('div').hasClass(state)) {
	                        $formElem.next('div').removeClass(classToRemove).addClass(state);
	                    } else {
	                        $.each($('input[name="' + $formElem.attr('name') + '"]'), function () {
	                            var $radio = $(this),
								state = checkedState($radio);
								if (!$radio.next('div').hasClass(state)) {
	                            	$radio.next('div').removeClass(classToRemove).addClass(state);
								}
	                        });
	                    }
	                }
	            }
			};

		$.each($selection, function () {
			updateStatus($(this));
        });

        return $(arr);
    }

}(jQuery));

/*

Example of initiating plugin, which will make checkboxes, radios, and selects
super cute.

*Note, all methods below accept a parameter; no selector, jQuery selection, a
non-form (check/radio/select) element selector, or form element selectors.
However, it will bork if you give it a mix of form elements and non-form elements:

	// no selection

	// no param, acts on all check/radio/select in body
	$.superCuteForms.wrap();


	// selector strings

	// non-form (check/radio/select) element, only acts on check/radio/select within selection
	$.superCuteForms.wrap('.test1');
	
	// form element, acts on only elements provided
	$.superCuteForms.wrap('input[type="checkbox"],select');
	
	
	// jQuery selection
	
	// jQuery selection, like above, acts on check/radio/select within query element or provided check/radio/select
	$.superCuteForms.wrap($('.space')); 
	$.superCuteForms.wrap($('input').not('.test1 *')); 


	// this WILL NOT work correctly, fixing this would increase execution time -- not a priority
	$.superCuteForms.wrap($('div:first', select)); 

Example of undoing any changes made by superCuteForms. Removes all added elements
and classes:

	$.superCuteForms.undo();

Example of retrieving all (check/radio/select) on page affected by superCuteForms:

	$.superCuteForms.affected();

Example of correcting checkbox and radio selected/checked status, after
javascript is used to alter the status of a form element if jQuery's
change() method isn't used:

	$.superCuteForms.refresh();

*Note, using refresh() won't be necessary if you alter checkbox and radio
selected/checked status using change(), for example:

$('input[type="checkbox"]').attr('checked','true').change();

var $radios = $('input:radio[name=r1]'); $radios.filter('[value=myRadio1]').prop('checked', true).change();

*/