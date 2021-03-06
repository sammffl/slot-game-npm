'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by SamMFFL on 17/3/19.
 */

var awardList = {};
var prizeCount = 10;
var isSync = false;
var time = 2000;
var $container = void 0;
var isRunning = false;

var SlotGame = function () {
    /**
     *
     * @param container
     */
    function SlotGame(container, props) {
        _classCallCheck(this, SlotGame);

        $container = $(container);
        props.prizeNum && (prizeCount = props.prizeNum);
        props.isSync && (isSync = props.isSync);
        props.time && (time = props.time);

        this._init(props);
    }

    _createClass(SlotGame, [{
        key: '_init',
        value: function _init() {
            var double = [];
            for (var i = 1; i <= prizeCount; i++) {
                double.push(i + '_X_' + i);
                double.push(i + '_' + i + '_X');
                double.push('X_' + i + '_' + i);
                awardList[i] = [i + '_' + i + '_' + i];
            }

            awardList.double = double;
            console.log(awardList);
            this._reset();
        }

        /**
         * 初始化页面元素
         * @returns {string}
         */

    }, {
        key: 'getOriginalContent',
        value: function getOriginalContent() {
            var liContent = '<ul>';
            for (var i = 0, max = prizeCount; i < max; i++) {
                var num = i + 1;
                liContent += '<li class="slot-icon-' + num + ' slot-icon" data-number="' + i + '">' + num + '</li>';
            }
            liContent += '</ul>';
            return liContent;
        }
    }, {
        key: '_reset',
        value: function _reset() {
            var self = this;
            var $contentArray = $container.find('.content');
            for (var i = 0; i < $contentArray.length; i++) {
                var $item = $($contentArray[i]);
                $item.html(self.getOriginalContent());
            }
        }
    }, {
        key: 'resetGame',
        value: function resetGame() {
            this._reset();
        }
    }, {
        key: '_getRandomValueOfArray',
        value: function _getRandomValueOfArray(array) {
            return array[Math.floor(Math.random() * array.length)];
        }

        /**
         * 根据抽奖结果返回最终显示图案的编号
         * @param prize
         * @returns {string}
         * @private
         */

    }, {
        key: '_calFinalResult',
        value: function _calFinalResult(prize) {
            var self = this;
            var result = '';
            var slotArr = [];
            for (var i = 0, max = prizeCount; i < max; i++) {
                slotArr.push(i + 1);
            }

            if (/noPrize/.test(prize) || !prize) {
                var prizeIndexes = [];
                for (var _i = 0; _i < 3; _i++) {
                    prizeIndexes.push(slotArr.splice(Math.floor(Math.random() * slotArr.length), 1)[0]);
                }
                result = prizeIndexes.join('_');
            } else {
                result = self._getRandomValueOfArray(awardList[prize]);
                slotArr.splice(result.match(/\d{1,2}/)[0] - 1, 1);
                result = result.replace(/X/, self._getRandomValueOfArray(slotArr));
            }
            return result;
        }
    }, {
        key: '_drawPrizeUl',
        value: function (_drawPrizeUl2) {
            function _drawPrizeUl(_x, _x2, _x3) {
                return _drawPrizeUl2.apply(this, arguments);
            }

            _drawPrizeUl.toString = function () {
                return _drawPrizeUl2.toString();
            };

            return _drawPrizeUl;
        }(function (content, prizeNum, callback) {
            var self = this;
            var $content = $(content);
            $content.html(self.getOriginalContent());
            var $ul = $content.find('ul');
            var count = prizeCount;
            for (var i = 1, max = prizeCount * 2; i <= max; i++) {
                if (i > 0 && i <= prizeCount) {
                    $ul.append('<li class="slot-icon-' + i + ' slot-icon" data-number="' + count + '">' + i + '</li>');
                } else if (i > prizeCount && i <= prizeCount * 2) {
                    $ul.append('<li class="slot-icon-' + (i - prizeCount) + ' slot-icon" data-number="' + count + '">' + (i - prizeCount) + '</li>');
                } else {
                    _drawPrizeUl;
                    $ul.append('<li class="slot-icon-' + (i - prizeCount * 2) + ' slot-icon" data-number="' + count + '">' + (i - prizeCount * 2) + '</li>');
                }
                count++;
            }
            for (var _i2 = 1, _max = +prizeNum + 1; _i2 <= _max; _i2++) {
                if (_i2 > prizeCount) {
                    $ul.append('<li class="slot-icon-' + (_i2 - prizeCount) + ' slot-icon" data-number="' + count + '">' + (_i2 - prizeCount) + '</li>');
                } else {
                    $ul.append('<li class="slot-icon-' + _i2 + ' slot-icon" data-number="' + count + '">' + _i2 + '</li>');
                }
                count++;
            }

            var num = $ul.find('li').last().data('number');
            self._runContent($content, num - 1, callback);
        })
    }, {
        key: '_runContent',
        value: function _runContent(content, num, callback) {
            var $content = $(content);
            var unitHeight = $(content).find('li').width();

            var end = num * unitHeight - unitHeight / 2;
            var $ul = $content.find('ul');
            $ul.animate({ "top": -end }, time, "swing", function () {
                if (callback && typeof callback == "function") {
                    callback();
                }
                isRunning = false;
            });
        }
    }, {
        key: 'startGame',
        value: function startGame() {
            var prize = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'noPrize';
            var callback = arguments[1];

            if (isRunning) {
                return false;
            }
            if (prize > prizeCount) {
                prize = 'noPrize';
            }

            isRunning = true;

            var self = this;
            var result = this._calFinalResult(prize);
            console.log(result);
            result = result.split('_');
            var timer = isSync ? 0 : 1000;

            for (var i = 0; i < result.length; i++) {
                (function (i) {
                    setTimeout(function () {
                        if (i == 2) {
                            self._drawPrizeUl($container.find('.content')[i], result[i], callback);
                        } else {
                            self._drawPrizeUl($container.find('.content')[i], result[i]);
                        }
                    }, timer * i);
                })(i);
            }
        }
    }]);

    return SlotGame;
}();

exports.default = SlotGame;
