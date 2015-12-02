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

    $.fn.superCuteForms = function () {
        var arr = [];

        this.find('input[type="checkbox"], input[type="radio"], select').each(function () {

            var $formElem = $(this);

            if (!$formElem.hasClass('superCuteFormElem')) {
                var type = $formElem.attr('type') || 'select',
                    checkedState = function ($inputElem) {
                        var state;
                        $inputElem[0].checked ? state = "checked" : state = "unchecked";
                        return state;
                    };
                arr.push($formElem);
                if (type != 'select') {
                    $formElem.addClass('superCuteFormElem').wrap('<div class="' + type + ' superCuteFormElemWrapper"></div>');
                    $formElem.parent().append('<div class="' + checkedState($formElem) + ' superCuteFormElemWrapper"></div>');
                    $formElem.on("change", function () {
                        if (type === "checkbox") {
                            $formElem.next('div').removeClass().addClass((checkedState($formElem) + ' superCuteFormElemWrapper'));
                        } else {
                            $.each($('input[name="' + $formElem.attr('name') + '"]'), function () {
                                var $radio = $(this);
                                $radio.next('div').removeClass().addClass((checkedState($radio) + ' superCuteFormElemWrapper'));
                            });
                        }
                    });
                } else {
                    $formElem.addClass('superCuteFormElem').wrap('<div class="' + type + ' superCuteFormElemWrapper"></div>');
                }
            }

        });

        // returns affected form elements as a jQuery collection, NOT a collection of the new parent elements
        return $(arr);
    };

    // utilities
    $.superCuteForms = {};

    $.superCuteForms.undo = function (selector) {
        var $selection = arguments.length && $(arguments[0]).length ? $(arguments[0]) : !arguments.length ? $('body') : '';
        $($selection).find('.superCuteFormElem').unwrap();
        $($selection).find('.superCuteFormElemWrapper').remove();
        $.each($('.superCuteFormElem'), function () {
            $(this).removeClass('superCuteFormElem');
        });
    };

    $.superCuteForms.affected = function () {
        return $('.superCuteFormElem');
    }

    $.superCuteForms.refresh = function () {
        var arr = [];

        $('body').find('input[type="checkbox"], input[type="radio"], select').each(function () {

            var $formElem = $(this);

            if ($formElem.hasClass('superCuteFormElem')) {
                var type = $formElem.attr('type') || 'select',
					classToRemove,
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
                    };
                arr.push($formElem);
                if (type != 'select') {
					var state = checkedState($formElem);
                    if (type === "checkbox" && !$formElem.next('div').hasClass(state)) {
                        $formElem.next('div').removeClass(classToRemove).addClass(state);
                    } else {
                        $.each($('input[name="' + $formElem.attr('name') + '"]'), function () {
                            var $radio = $(this),
							state = checkedState($radio);
							if (!$formElem.next('div').hasClass(state)) {
                            	$radio.next('div').removeClass(classToRemove).addClass(state);
							}
                        });
                    }
                }
            }

        });

        // returns affected form elements as a jQuery collection, NOT a collection of the new parent elements
        return $(arr);
    }

}(jQuery));

/*

!!! USAGE EXAMPLES !!!

Example:

	$( "body" ).superCuteForms();

Example of undoing any changes made by superCuteForms:

	$.superCuteForms.undo();

Example of undoing any changes made by superCuteForms within optional
selection query (won't affect elements outside selection):

	$.superCuteForms.undo('div.myClass');

Example of retrieving jQuery collection of all elements on page
affected by superCuteForms, including additional divs added by plugin:

	$.superCuteForms.affected();

Example of correcting checkbox and radio selected/checked status, after
javascript is used to alter the status of a form element if jQuery's
change() method isn't used:

	$.superCuteForms.refresh();

Using refresh() won't be necessary if you alter checkbox and radio
selected/checked status using change(), for example:

$('input[type="checkbox"]').attr('checked','true').change();

var $radios = $('input:radio[name=r1]'); $radios.filter('[value=myRadio1]').prop('checked', true).change();

*/