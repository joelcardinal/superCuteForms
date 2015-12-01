/*
*
*	superCuteForms.js
*
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
                    $formElem.on("click", function () {
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

}(jQuery));

/*

!!! USAGE EXAMPLES !!!

Usage example:
$( "body" ).superCuteForms();

Usage example of undoing any changes made by superCuteForms
$.superCuteForms.undo();

Usage example of undoing any changes made by superCuteForms within optional selection query (won't affect elements outside selection):
$.superCuteForms.undo('div.myClass');

Usage example of retrieving jQuery collection of all elements on page affected by superCuteForms
$.superCuteForms.affected();

*/