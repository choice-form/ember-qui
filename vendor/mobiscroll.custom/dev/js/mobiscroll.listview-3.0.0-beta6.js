/* 23848782-3adc-48ad-87fa-6f78b72ec6d7 */
(function (window, document, undefined) {
    var confirms,
        ms = mobiscroll,
        $ = ms.$,
        extend = $.extend,
        classes = ms.classes,
        util = ms.util,
        prefix = util.prefix,
        pr = util.jsPrefix,
        getCoord = util.getCoord,
        testTouch = util.testTouch,
        vibrate = util.vibrate,
        guid = 1,
        empty = function () {},
        raf = window.requestAnimationFrame || function (x) {
            x();
        },
        rafc = window.cancelAnimationFrame || empty,
        animEnd = 'webkitAnimationEnd animationend',
        transp = 'transparent';

    classes.ListView = function (elem, settings) {
        var action,
            actionWidth,
            activeTimer,
            animPos,
            cancel,
            confirmItem,
            confirmIndex,
            cont,
            currIndex,
            currList,
            currPh,
            currParent,
            currSiblings,
            currStage,
            currStageIdx,
            debounce,
            demoMode,
            disabled,
            diffX,
            diffY,
            dropDown,
            dropUp,
            dragged,
            dummyCont,
            endTimer,
            endX,
            endY,
            event,
            fill,
            found,
            groupHeader,
            hadEnhance,
            handlePos,
            hasContext,
            handleDiv,
            hoverDir,
            hoverItem,
            hoverItemOpened,
            hoverTime,
            hoverTimeout,
            hoverTimer,
            htmlLeft,
            htmlRight,
            icon,
            iconc,
            stagec,
            itemw,
            item,
            itemHeight,
            itemIndex,
            itemTop,
            listTop,
            maxDrag,
            minDrag,
            multic,
            nextItem,
            nextOffset,
            nextStage,
            nextItems,
            onScrollThrottle,
            preventClick,
            preventHover,
            preventTimer,
            prevItems,
            placeholder,
            prevItem,
            prevOffset,
            prevStage,
            quickSwipe,
            rafID,
            rafRunning,
            s,
            scroll,
            simulating,
            slideCont,
            stageNr,
            stages,
            startPos,
            startTime,
            startX,
            startY,
            style,
            swipe,
            swipeInterval,
            swipeTimeout,
            tapHighlight,
            text,
            timer,
            type,
            types,
            undoRef,
            undoAnim,
            wnd,
            wndHeight,
            wndScroll,
            wndTop,
            that = this,
            e = elem,
            elm = $(e),
            transition = 0,
            slideLevel = 0,
            startTop = 0,
            stageObj = {},
            actionQueue = {},
            treeMap = {};

        function onActionStart() {
            quickSwipe = false;
            preventClick = false;
            animPos = 0;
            startPos = 0;
            startTime = new Date();
            itemw = currList.width();
            currSiblings = getChildren(currList);
            itemIndex = currSiblings.index(item);
            itemHeight = item[0].offsetHeight;
            startTop = item[0].offsetTop;
            type = types[item.attr('data-type') || 'defaults'];
            stages = type.stages;
        }

        function onStart(ev) {
            var itm;

            if (ev.type === 'touchstart') {
                preventHover = true;
                clearTimeout(preventTimer);
            }

            if (testTouch(ev, this) && !action && !transition && !confirms && !undoing  ) {
                action = true;
                cancel = true;
                startX = getCoord(ev, 'X');
                startY = getCoord(ev, 'Y');
                diffX = 0;
                diffY = 0;
                item = $(this);
                itm = item; // Local reference

                onActionStart();

                tapHighlight = s.onItemTap || type.tap || item.hasClass('mbsc-lv-parent') || item.hasClass('mbsc-lv-back');
                listTop = elm.offset().top;
                itemTop = item.offset().top;

                if (tapHighlight) {
                    activeTimer = setTimeout(function () {
                        itm.addClass('mbsc-lv-item-active');
                        event('onItemActivate', {
                            target: itm[0],
                            domEvent: ev
                        });
                    }, 120);
                }

                if (that.sortable && !item.hasClass('mbsc-lv-back')) {
                    if (!that.sortable.group) {
                        nextItems = item.nextUntil('.mbsc-lv-gr-title').filter('.mbsc-lv-item');
                        prevItems = item.prevUntil('.mbsc-lv-gr-title').filter('.mbsc-lv-item');
                    }

                    minDrag = (!that.sortable.group ? (prevItems.length ? prevItems.eq(-1) : item) : currList.children('li').eq(0))[0].offsetTop - startTop;
                    maxDrag = (!that.sortable.group ? (nextItems.length ? nextItems.eq(-1) : item) : currList.children('li').eq(-1))[0].offsetTop - startTop;

                    if (that.sortable.handle) {
                        if ($(ev.target).hasClass('mbsc-lv-handle')) {
                            clearTimeout(activeTimer);
                            if (pr === 'Moz') { // On FF we need to prevent touchstart to disable scroll
                                ev.preventDefault();
                                onSortStart();
                            } else {
                                timer = setTimeout(function () {
                                    onSortStart();
                                }, 100);
                            }
                        }
                    } else {
                        timer = setTimeout(function () {
                            fill.appendTo(item);
                            fill[0].style[pr + 'Animation'] = 'mbsc-lv-fill ' + (s.sortDelay - 100) + 'ms linear';
                            clearTimeout(endTimer);
                            clearTimeout(activeTimer);
                            cancel = false;

                            timer = setTimeout(function () {
                                fill[0].style[pr + 'Animation'] = '';
                                onSortStart();
                            }, s.sortDelay - 80);
                        }, 80);
                    }
                }

                if (ev.type == 'mousedown') {
                    $(document).on('mousemove', onMove).on('mouseup', onEnd);
                }
            }
        }

        function onMove(ev) {
            var sortChange = false,
                dropChange = true;

            if (action) {
                endX = getCoord(ev, 'X');
                endY = getCoord(ev, 'Y');
                diffX = endX - startX;
                diffY = endY - startY;

                clearTimeout(endTimer);

                if (!dragged && !swipe && !scroll && !item.hasClass('mbsc-lv-back')) {
                    if (Math.abs(diffY) > 10) { // It's a scroll
                        scroll = true;
                        ev.type = ev.type == 'mousemove' ? 'mouseup' : 'touchend';
                        onEnd(ev);

                        clearTimeout(activeTimer);
                    } else if (Math.abs(diffX) > 7) { // It's a swipe
                        onSwipeStart();
                    } else {
                        // In Android 4.0.x touchend does not fire if preventDefault was not called
                        if (ev.type === 'touchmove') {
                            endTimer = setTimeout(function () {
                                ev.type = 'touchend';
                                onEnd(ev);
                            }, 300);
                        }
                    }
                }

                if (swipe) {
                    ev.preventDefault();
                    animPos = diffX / itemw * 100;
                    onSwipeMove();
                } else if (dragged) {
                    ev.preventDefault();

                    var scrolled,
                        st = wnd.scrollTop(),
                        diff = Math.max(minDrag, Math.min(diffY + wndScroll, maxDrag)),
                        top = hasContext ? itemTop - wndTop + st - wndScroll : itemTop;

                    // Check if scroll is needed
                    if ((wndHeight + st) < (top + diff + itemHeight)) {
                        wnd.scrollTop(top + diff - wndHeight + itemHeight);
                        scrolled = true;
                    } else if ((top + diff) < st) {
                        wnd.scrollTop(top + diff);
                        scrolled = true;
                    }

                    // Update scroll values if window was scrolled
                    if (scrolled) {
                        wndScroll += wnd.scrollTop() - st;
                    }

                    // Check overlap with next item
                    if (nextOffset) {
                        // If subtree exists, drop element on subtree at 1/4, change sort order at 3/4 overlap
                        if (that.sortable.multiLevel && nextItem.hasClass('mbsc-lv-parent')) {
                            if ((startTop + itemHeight / 4 + diff) > nextOffset) {
                                sortChange = true;
                            } else if ((startTop + itemHeight - itemHeight / 4 + diff) > nextOffset) {
                                dropDown = nextItem.addClass('mbsc-lv-item-hl');
                                dropChange = false;
                            }
                            // Check 1/2 overlap
                        } else if ((startTop + itemHeight / 2 + diff) > nextOffset) {
                            // If over back button, highlight to drop to parent level
                            if (nextItem.hasClass('mbsc-lv-back')) {
                                if (that.sortable.multiLevel) {
                                    dropUp = nextItem.addClass('mbsc-lv-item-hl');
                                    dropChange = false;
                                }
                            } else {
                                sortChange = true;
                            }
                        }

                        if (sortChange) {
                            placeholder.insertAfter(nextItem);
                            prevItem = nextItem;
                            nextItem = getNextPrev(nextItem, 'next');
                            prevOffset = nextOffset;
                            nextOffset = nextItem.length && nextItem[0].offsetTop;
                            currIndex++;
                        }
                    }

                    // Check overlap with prev item
                    if (!sortChange && prevOffset) {
                        // If subtree exists, drop element on subtree at 1/3, change sort order at 2/3 overlap
                        if (that.sortable.multiLevel && prevItem.hasClass('mbsc-lv-parent')) {
                            if ((startTop + itemHeight - itemHeight / 4 + diff) < prevOffset) {
                                sortChange = true;
                            } else if ((startTop + itemHeight / 4 + diff) < prevOffset) {
                                dropDown = prevItem.addClass('mbsc-lv-item-hl');
                                dropChange = false;
                            }
                            // Check 1/2 overlap
                        } else if ((startTop + itemHeight / 2 + diff) < prevOffset) {
                            // If over back button, highlight to drop to parent level
                            if (prevItem.hasClass('mbsc-lv-back')) {
                                if (that.sortable.multiLevel) {
                                    dropUp = prevItem.addClass('mbsc-lv-item-hl');
                                    dropChange = false;
                                }
                            } else {
                                sortChange = true;
                            }
                        }

                        if (sortChange) {
                            placeholder.insertBefore(prevItem);
                            nextItem = prevItem;
                            prevItem = getNextPrev(prevItem, 'prev');
                            nextOffset = prevOffset;
                            prevOffset = prevItem.length && prevItem[0].offsetTop + prevItem[0].offsetHeight;
                            currIndex--;
                        }
                    }

                    if (dropChange) {
                        if (dropDown) {
                            dropDown.removeClass('mbsc-lv-item-hl');
                            dropDown = false;
                        }
                        if (dropUp) {
                            dropUp.removeClass('mbsc-lv-item-hl');
                            dropUp = false;
                        }
                    }

                    if (sortChange) {
                        event('onSortChange', [item, currIndex]);
                    }

                    drag(item, diff);

                    event('onSort', [item, currIndex]);
                } else if (Math.abs(diffX) > 5 || Math.abs(diffY) > 5) {
                    // Cancel dragstart if movement is > 5px
                    stopTimer();
                }
            }
        }

        function onEnd(ev) {
            var dist,
                map,
                parent,
                ret,
                itm = item;

            if (action) {
                action = false;

                stopTimer();

                if (ev.type == 'mouseup') {
                    $(document).off('mousemove', onMove).off('mouseup', onEnd);
                }

                if (!scroll) {
                    preventTimer = setTimeout(function () {
                        preventHover = false;
                    }, 300);
                }

                if (swipe || scroll || dragged) {
                    preventClick = true;
                }

                if (swipe) {
                    onSwipeEnd();
                } else if (dragged) { // Sort end
                    parent = currList;

                    if (dropDown) {
                        resetItem(item.detach());
                        map = treeMap[dropDown.attr('data-ref')];
                        currIndex = getChildren(map.child).length;
                        dropDown.removeClass('mbsc-lv-item-hl');
                        if (s.navigateOnDrop) {
                            navigate(dropDown, function () {
                                that.add(null, item, null, null, dropDown, true);
                                scrollToItem(item);
                                onSortEnd(item, itemIndex, parent, true);
                            });
                        } else {
                            that.add(null, item, null, null, dropDown, true);
                            onSortEnd(item, itemIndex, parent, true);
                        }
                    } else if (dropUp) {
                        resetItem(item.detach());
                        map = treeMap[dropUp.attr('data-back')];
                        currIndex = getChildren(map.parent).index(map.item) + 1;
                        dropUp.removeClass('mbsc-lv-item-hl');
                        if (s.navigateOnDrop) {
                            navigate(dropUp, function () {
                                that.add(null, item, currIndex, null, currList, true);
                                scrollToItem(item);
                                onSortEnd(item, itemIndex, parent, true);
                            });
                        } else {
                            that.add(null, item, currIndex, null, map.parent, true);
                            onSortEnd(item, itemIndex, parent, true);
                        }
                    } else {
                        dist = placeholder[0].offsetTop - startTop;
                        // Animate item to its place
                        drag(item, dist, Math.abs(dist - Math.max(minDrag, Math.min(diffY + wndScroll, maxDrag))) * 6, function () {
                            resetItem(item);
                            item.insertBefore(placeholder);
                            onSortEnd(item, itemIndex, parent, currIndex !== itemIndex);
                        });
                    }
                    dragged = false;
                } else if (!scroll && Math.abs(diffX) < 5 && Math.abs(diffY) < 5) { // Tap

                    if (type.tap) {
                        ret = type.tap.call(e, {
                            target: item,
                            index: itemIndex,
                            domEvent: ev
                        }, that);
                    }

                    if (tapHighlight) {

                        // Prevent phantom clicks
                        if (ev.type === 'touchend') {
                            util.preventClick();
                        }

                        item.addClass('mbsc-lv-item-active');
                        event('onItemActivate', {
                            target: item[0],
                            domEvent: ev
                        });
                    }

                    ret = event('onItemTap', {
                        target: item[0],
                        index: itemIndex,
                        domEvent: ev
                    });

                    if (ret !== false) {
                        navigate(item);
                    }
                }

                clearTimeout(activeTimer);
                setTimeout(function () {
                    itm.removeClass('mbsc-lv-item-active');
                    event('onItemDeactivate', {
                        target: itm[0]
                    });
                }, 100);

                scroll = false;

                currStage = null;

            }
        }

        function onSwipeStart() {
            swipe = valueOrFunc(type.swipe, {
                target: item[0],
                index: itemIndex,
                direction: diffX > 0 ? 'right' : 'left'
            });
            if (swipe) {
                stopTimer();
                clearTimeout(activeTimer);

                if (type.actions) {
                    // Get the width of the action menu from settings
                    // Numeric values are converted to string, because 0 is also accepted, we convert back to number at the end
                    actionWidth = getActionWidth(type, diffX);
                    // Show action icons and set width
                    multic.html(type.icons).show().children().css('width', actionWidth + '%');
                    // Hide stage icons
                    iconc.hide();
                    // Set disabled actions
                    $('.mbsc-lv-ic-m', stagec).removeClass('mbsc-lv-ic-disabled');
                    $(type.leftMenu).each(disableActions);
                    $(type.rightMenu).each(disableActions);
                } else {
                    iconc.show();
                    multic.hide();
                    currStageIdx = type.start + (diffX > 0 ? 0 : 1);
                    prevStage = stages[currStageIdx - 1];
                    nextStage = stages[currStageIdx];
                }

                item.addClass('mbsc-lv-item-swiping').removeClass('mbsc-lv-item-active');
                text.css('line-height', itemHeight + 'px');
                stagec
                    .css({
                        top: startTop,
                        height: itemHeight,
                        backgroundColor: getFirstColor(diffX)
                    })
                    .addClass('mbsc-lv-stage-c-v')
                    .appendTo(currList.parent());

                if (s.iconSlide) {
                    item.append(iconc);
                }

                event('onSlideStart', {
                    target: item[0],
                    index: itemIndex
                });
            }
        }

        function onSwipeMove() {
            var stageChanged = false;

            if (!rafRunning) {
                if (type.actions) {
                    stagec.attr('class', 'mbsc-lv-stage-c-v mbsc-lv-stage-c mbsc-lv-' + (animPos < 0 ? 'right' : 'left'));
                } else {
                    if (prevStage && animPos <= prevStage.percent) {
                        currStageIdx--;
                        nextStage = prevStage;
                        prevStage = stages[currStageIdx];
                        stageChanged = true;
                    } else if (nextStage && animPos >= nextStage.percent) {
                        currStageIdx++;
                        prevStage = nextStage;
                        nextStage = stages[currStageIdx];
                        stageChanged = true;
                    }
                    if (stageChanged) {
                        currStage = animPos > 0 ? prevStage : nextStage;
                        if (currStage) {
                            setStageProps(currStage, s.iconSlide);
                            event('onStageChange', {
                                target: item[0],
                                index: itemIndex,
                                stage: currStage
                            });
                        }
                    }
                }

                if (!simulating) {
                    rafRunning = true;
                    rafID = raf(slideMove);
                }
            }
        }

        function onSwipeEnd(callback) {
            var quickSwipeLeft,
                quickSwipeRight,
                timeDiff,
                pending = false,
                revert = true;

            rafc(rafID);
            rafRunning = false;

            // We need an additional call to set the position in case when
            // requestAnimationFrame did not call it at least once
            // E.g. in a case of a quick swipe animation frame is
            // cancelled before the first call
            if (!simulating) {
                slideMove();
            }

            if (type.actions) {
                if (Math.abs(animPos) > 10 && actionWidth) {
                    slide(item, animPos < 0 ? -actionWidth : actionWidth, 200);

                    pending = true;
                    confirms = true;
                    confirmItem = item;
                    confirmIndex = itemIndex;

                    $(document).on('touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf', function (ev) {
                        ev.preventDefault();
                        slideEnd(item, true, callback);
                    });
                }
            } else if (animPos) {
                if (s.quickSwipe && !simulating) {
                    timeDiff = new Date() - startTime;
                    quickSwipeLeft = timeDiff < 300 && diffX < -50;
                    quickSwipeRight = timeDiff < 300 && diffX > 50;

                    if (quickSwipeLeft) {
                        quickSwipe = true;
                        currStage = type.left;
                        setStageProps(currStage, s.iconSlide);
                    } else if (quickSwipeRight) {
                        quickSwipe = true;
                        currStage = type.right;
                        setStageProps(currStage, s.iconSlide);
                    }
                }

                if (currStage && currStage.action) {
                    disabled = valueOrFunc(currStage.disabled, {
                        target: item[0],
                        index: itemIndex
                    });

                    if (!disabled) {
                        pending = true;
                        confirms = simulating || valueOrFunc(currStage.confirm, {
                            target: item[0],
                            index: itemIndex
                        });
                        if (confirms) {
                            // Slide to text + icon width
                            slide(item, (animPos < 0 ? -1 : 1) * iconc[0].offsetWidth * 100 / itemw, 200, true);
                            // Tap to confirm
                            setConfirm(currStage, item, itemIndex, false, callback);
                        } else {
                            runAction(currStage, item, itemIndex, callback);
                        }
                    }
                }
            }

            if (!pending) {
                slideEnd(item, revert, callback);
            }

            swipe = false;
        }

        function onSortStart() {
            dragged = true;
            dropDown = false;
            dropUp = false;
            wndScroll = 0;
            currIndex = itemIndex;

            if (s.vibrate) {
                vibrate();
            }

            nextItem = getNextPrev(item, 'next');
            nextOffset = nextItem.length && nextItem[0].offsetTop;
            prevItem = getNextPrev(item, 'prev');
            prevOffset = prevItem.length && prevItem[0].offsetTop + prevItem[0].offsetHeight;

            placeholder.height(itemHeight).insertAfter(item);
            // Item is removed from original list, otherwise messes up striped layout
            item.css({
                top: startTop
            }).addClass('mbsc-lv-item-dragging').removeClass('mbsc-lv-item-active').appendTo(dummyCont);

            event('onSortStart', {
                target: item[0],
                index: currIndex
            });
        }

        function onSortEnd(item, itemIndex, parent, update) {
            item.removeClass('mbsc-lv-item-dragging');
            placeholder.remove();

            event('onSortEnd', {
                target: item[0],
                index: currIndex
            });

            if (s.vibrate) {
                vibrate();
            }

            if (update) {
                that.addUndoAction(function (next) {
                    that.move(item, itemIndex, null, next, parent, true);
                }, true);

                event('onSortUpdate', {
                    target: item[0],
                    index: currIndex
                });
            }
        }

        function onMouseLeave() {
            if (!preventHover) {
                clearTimeout(hoverTimer);

                if (confirms) {
                    $(document).trigger('touchstart');
                }

                if (hoverItemOpened) {
                    that.close(hoverItem, hoverTime);
                    hoverItemOpened = false;
                    hoverItem = null;
                }
            }
        }

        function onResize() {
            clearTimeout(debounce);
            debounce = setTimeout(function () {
                wndHeight = wnd[0].innerHeight || wnd.innerHeight();
                wndTop = hasContext ? wnd.offset().top : 0;
                if (action) { // Reposition stage background, icon and text
                    startTop = item[0].offsetTop;
                    itemHeight = item[0].offsetHeight;
                    stagec.css({
                        top: startTop,
                        height: itemHeight
                    });
                }
            }, 200);
        }

        function onScroll() {
            if (dragged || !action) {
                var group,
                    st = wnd.scrollTop(),
                    elmTop = elm.offset().top,
                    elmHeight = elm[0].offsetHeight,
                    wndTop = hasContext ? wnd.offset().top : st;

                $('.mbsc-lv-gr-title', elm).each(function (i, v) {
                    if ($(v).offset().top < wndTop) {
                        group = v;
                    }
                });

                if ((elmTop < wndTop) && (elmTop + elmHeight > wndTop)) {
                    groupHeader.show().empty().append($(group).clone());
                } else {
                    groupHeader.hide();
                }
            }
        }

        function disableActions(i, v) {
            if (valueOrFunc(v.disabled, {
                    target: item[0],
                    index: itemIndex
                })) {
                $('.mbsc-ic-' + v.icon, stagec).addClass('mbsc-lv-ic-disabled');
            }
        }

        function runAction(stage, item, index, callback) {
            var revert,
                undoStage = {
                    icon: 'undo2',
                    text: s.undoText,
                    color: '#b1b1b1',
                    action: function () {
                        that.undo();
                    }
                };

            if (stage.undo) {
                that.startActionTrack();
                // Add user defined undo
                if ($.isFunction(stage.undo)) {
                    that.addUndoAction(function () {
                        stage.undo.call(e, item, that, index);
                        //stage.undo.call(e, { target: item[0], index: index }, that);
                    });
                }
                // Remember the item where the undo is displayed
                undoRef = item.attr('data-ref');
            }

            revert = stage.action.call(e, {
                target: item[0],
                index: index
            }, that);

            if (stage.undo) {
                that.endActionTrack();
                if (revert !== false) {
                    slide(item, +item.attr('data-pos') < 0 ? -100 : 100, 200);
                }
                placeholder.height(itemHeight).insertAfter(item);
                item.css('top', startTop).addClass('mbsc-lv-item-undo');
                multic.hide();
                iconc.show();
                stagec.append(iconc);
                setStageProps(undoStage);
                setConfirm(undoStage, item, index, true, callback);
            } else {
                slideEnd(item, revert, callback);
            }
        }

        function setConfirm(stage, item, index, ph, callback) {
            var startX,
                startY;

            confirms = true;

            $(document).off('.mbsc-lv-conf').on('touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf', function (ev) {
                ev.preventDefault();
                if (ph) {
                    cleanUndo(item);
                }
                slideEnd(item, true, callback);
            });

            if (!demoMode) {
                iconc.off('.mbsc-lv-conf').on('touchstart.mbsc-lv-conf mousedown.mbsc-lv-conf', function (ev) {
                    ev.stopPropagation();
                    startX = getCoord(ev, 'X');
                    startY = getCoord(ev, 'Y');
                }).on('touchend.mbsc-lv-conf mouseup.mbsc-lv-conf', function (ev) {
                    ev.preventDefault();
                    if (ev.type === 'touchend') {
                        util.preventClick();
                    }
                    // If movement is less than 10px, it's a tap
                    if (Math.abs(getCoord(ev, 'X') - startX) < 10 && Math.abs(getCoord(ev, 'Y') - startY) < 10) {
                        runAction(stage, item, index, callback);
                        if (ph) {
                            undoAnim = null;
                            cleanUndo(item);
                        }
                    }
                });
            }
        }

        function slideMove() {
            slide(item, startPos + diffX * 100 / itemw);
            rafRunning = false;
        }

        function slideEnd(item, revert, callback) {
            $(document).off('.mbsc-lv-conf');
            iconc.off('.mbsc-lv-conf');

            if (revert !== false) {
                slide(item, 0, item.attr('data-pos') !== '0' ? 200 : 0, false, function () {
                    cleanStage(item, callback);
                    resetItem(item);
                });
            } else {
                cleanStage(item, callback);
            }
            confirms = false;
        }

        function slide(item, pos, time, px, callback) {
            pos = Math.max(swipe == 'right' ? 0 : -100, Math.min(pos, swipe == 'left' ? 0 : 100));
            style = item[0].style;

            item.attr('data-pos', pos);

            style[pr + 'Transform'] = 'translate3d(' + (px ? ((itemw * pos / 100) + 'px') : (pos + '%')) + ',0,0)';
            style[pr + 'Transition'] = prefix + 'transform ' + (time || 0) + 'ms';

            if (callback) {
                transition++;
                setTimeout(function () {
                    callback();
                    transition--;
                }, time);
            }

            animPos = pos;
        }

        function drag(item, top, time, callback) {
            top = Math.max(minDrag, Math.min(top, maxDrag));
            style = item[0].style;

            style[pr + 'Transform'] = 'translate3d(0,' + top + 'px,0)';
            style[pr + 'Transition'] = prefix + 'transform ' + (time || 0) + 'ms ease-out';

            if (callback) {
                transition++;
                setTimeout(function () {
                    callback();
                    transition--;
                }, time);
            }
        }

        function stopTimer() {
            clearTimeout(timer);
            if (!cancel && that.sortable) {
                cancel = true;
                fill.remove();
            }
        }

        function setStageProps(stage, iconSlide) {
            var txt = valueOrFunc(stage.text, {
                target: item[0],
                index: itemIndex
            }) || '';

            if (valueOrFunc(stage.disabled, {
                    target: item[0],
                    index: itemIndex
                })) {
                stagec.addClass('mbsc-lv-ic-disabled');
            } else {
                stagec.removeClass('mbsc-lv-ic-disabled');
            }

            stagec.css('background-color', stage.color || (stage.percent === 0 ? getFirstColor(animPos) : transp));
            iconc.attr('class', 'mbsc-lv-ic-c mbsc-lv-ic-' + (iconSlide ? 'move-' : '') + (animPos < 0 ? 'right' : 'left'));
            icon.attr('class', ' mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-' + (stage.icon || 'none'));
            text.attr('class', 'mbsc-lv-ic-text' + (stage.icon ? '' : ' mbsc-lv-ic-text-only') + (txt ? '' : ' mbsc-lv-ic-only')).html(txt || '&nbsp;');

            if (s.animateIcons) {
                if (quickSwipe) {
                    icon.addClass('mbsc-lv-ic-v');
                } else {
                    setTimeout(function () {
                        icon.addClass('mbsc-lv-ic-a');
                    }, 10);
                }
            }
        }

        function cleanStage(item, callback) {
            if (!action) { // Don't clean stages if another action started
                icon.attr('class', 'mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none');
                stagec.attr('style', '').removeClass('mbsc-lv-stage-c-v');
                text.html('');
            }

            stagec.removeClass('mbsc-lv-left mbsc-lv-right');

            if (item) {
                event('onSlideEnd', {
                    target: item[0],
                    index: itemIndex
                });
                if (callback) {
                    callback();
                }
            }
        }

        function cleanUndo(item) {
            item.css('top', '').removeClass('mbsc-lv-item-undo');
            // Remove placeholder
            if (undoAnim) {
                that.animate(placeholder, 'collapse', function () {
                    placeholder.remove();
                });
            } else {
                placeholder.remove();
            }
            cleanStage();
            undoRef = null;
            undoAnim = null;
        }

        function resetItem(item) {
            style = item[0].style;
            style[pr + 'Transform'] = '';
            style[pr + 'Transition'] = '';
            style.top = '';
            item.removeClass('mbsc-lv-item-swiping');
        }

        function valueOrFunc(val, args) {
            return $.isFunction(val) ? val.call(this, args, that) : val;
        }

        function initItem(item) {
            var id;

            if (!item.attr('data-ref')) {
                id = guid++;
                item.attr('data-ref', id);

                treeMap[id] = {
                    item: item,
                    child: item.children('ul,ol'),
                    parent: item.parent(),
                    ref: item.parent()[0] === e ? null : item.parent().parent().attr('data-ref')
                };
            }

            item.addClass('mbsc-lv-item');

            // Add sort handle
            if (that.sortable.handle && item.attr('data-role') != 'list-divider' && !item.children('.mbsc-lv-handle-c').length) {
                item.append(handleDiv);
            }

            if (s.enhance && !item.hasClass('mbsc-lv-item-enhanced')) {
                var itemIcon = item.attr('data-icon'),
                    itemImg = item.find('img').eq(0).addClass('mbsc-lv-img');

                if (itemImg.is(':first-child')) {
                    item.addClass('mbsc-lv-img-' + (s.rtl ? 'right' : 'left'));
                } else if (itemImg.length) {
                    item.addClass('mbsc-lv-img-' + (s.rtl ? 'left' : 'right'));
                }

                item.addClass('mbsc-lv-item-enhanced').children().each(function (i, v) {
                    v = $(v);
                    if (v.is('p, h1, h2, h3, h4, h5, h6')) {
                        v.addClass('mbsc-lv-txt');
                    }
                });

                if (itemIcon) {
                    item.addClass('mbsc-lv-item-ic-' + (item.attr('data-icon-align') || (s.rtl ? 'right' : 'left')))
                        .append('<div class="mbsc-lv-item-ic mbsc-ic mbsc-ic-' + itemIcon + '"></div');
                }
            }

            
        }

        function initBranch(elm) {
            // Create map object
            $('li', elm).not('.mbsc-lv-item').each(function () {
                initItem($(this));
            });

            // Init list dividers
            $('li[data-role="list-divider"]', elm).removeClass('mbsc-lv-item').addClass('mbsc-lv-gr-title');

            // Add extra classes and markup (arrows and back items)
            $('ul,ol', elm).not('.mbsc-lv')
                .addClass('mbsc-lv')
                .prepend(htmlLeft)
                .parent()
                .addClass('mbsc-lv-parent')
                .prepend(htmlRight);

            // Add parent reference for back buttons
            $('.mbsc-lv-back', elm).each(function () {
                $(this).attr('data-back', $(this).parent().parent().attr('data-ref'));
            });
        }

        function getChildren(list) {
            return list.children('li').not('.mbsc-lv-back').not('.mbsc-lv-removed').not('.mbsc-lv-ph');
        }

        function getItemByID(item) {
            if (typeof item !== 'object') {
                item = $('li[data-id="' + item + '"]', cont);
            }
            return $(item);
        }

        function getItemLevel(item) {
            var level = 0,
                map = treeMap[item.attr('data-ref')];

            while (map.ref) {
                level++;
                map = treeMap[map.ref];
            }

            return level;
        }

        function getNextPrev(item, dir) {
            item = item[dir]();

            // Returns next or previous item filtering out placeholder or currently dragged element
            while (item.length && (!item.hasClass('mbsc-lv-item') || item.hasClass('mbsc-lv-ph') || item.hasClass('mbsc-lv-item-dragging'))) {
                if (!that.sortable.group && item.hasClass('mbsc-lv-gr-title')) {
                    return false;
                }
                item = item[dir]();
            }

            return item;
        }

        function getFirstColor(pos) {
            return (pos > 0 ? type.right : type.left).color || transp;
        }

        function getNumStr(s) {
            return util.isNumeric(s) ? s + '' : 0;
        }

        function getActionWidth(type, diffX) {
            return +(diffX < 0 ?
                getNumStr((type.actionsWidth || 0).right) || getNumStr(type.actionsWidth) || getNumStr(s.actionsWidth.right) || getNumStr(s.actionsWidth) :
                getNumStr((type.actionsWidth || 0).left) || getNumStr(type.actionsWidth) || getNumStr(s.actionsWidth.left) || getNumStr(s.actionsWidth));
        }

        function scrollToItem(item, scrollToTop) {
            if (item) {
                var scrollTop = wnd.scrollTop(),
                    itemHeight = item.is('.mbsc-lv-item') ? item[0].offsetHeight : 0,
                    itemTop = item.offset().top + (hasContext ? (scrollTop - wndTop) : 0);

                if (scrollToTop) {
                    if (itemTop < scrollTop || itemTop > scrollTop + wndHeight) {
                        wnd.scrollTop(itemTop);
                    }
                } else {
                    if (itemTop < scrollTop) {
                        wnd.scrollTop(itemTop);
                    } else if (itemTop + itemHeight > scrollTop + wndHeight) {
                        wnd.scrollTop(itemTop + itemHeight - wndHeight / 2);
                    }
                }
            }
        }

        function drill(dir, list, item, callback, scrollToTop) {
            var parent = list.parent(),
                ph = list.prev();

            callback = callback || empty;

            if (ph[0] === iconc[0]) {
                ph = iconc.prev();
            }

            if (currList[0] !== list[0]) {
                event('onNavStart', {
                    level: slideLevel,
                    direction: dir,
                    list: list[0]
                });

                slideCont.prepend(list.addClass('mbsc-lv-v mbsc-lv-sl-new'));

                // If top of the list is not visible, scroll to top
                scrollToItem(cont);

                animate(slideCont, 'mbsc-lv-sl-' + dir, function () {
                    currList.removeClass('mbsc-lv-sl-curr');
                    list.removeClass('mbsc-lv-sl-new').addClass('mbsc-lv-sl-curr');

                    if (currPh && currPh.length) {
                        currList.removeClass('mbsc-lv-v').insertAfter(currPh);
                    } else {
                        currParent.append(currList.removeClass('mbsc-lv-v'));
                    }

                    // Remember the previous element where we need to put back the list later
                    // We need this because some frameworks like ember js put additional elements (script tags)
                    // and appending to parent element is not ok
                    currPh = ph;
                    currParent = parent;
                    currList = list;

                    scrollToItem(item, scrollToTop);
                    callback.call(e, item);

                    event('onNavEnd', {
                        level: slideLevel,
                        direction: dir,
                        list: list[0]
                    });
                });
            } else {
                scrollToItem(item, scrollToTop);
                callback.call(e, item);
            }
        }

        function navigate(item, callback) {
            if (!transition) {
                if (item.hasClass('mbsc-lv-parent')) {
                    slideLevel++;
                    drill('r', treeMap[item.attr('data-ref')].child, null, callback);
                } else if (item.hasClass('mbsc-lv-back')) {
                    slideLevel--;
                    drill('l', treeMap[item.attr('data-back')].parent, treeMap[item.attr('data-back')].item, callback);
                }
            }
        }

        function animate(el, anim, callback) {
            var timer;

            function onAnimEnd() {
                clearTimeout(timer);
                transition--;
                el.off(animEnd, onAnimEnd).removeClass(anim);
                callback.call(e, el);
            }

            callback = callback || empty;

            if (s.animation && anim !== 'mbsc-lv-item-none') {
                transition++;
                el.on(animEnd, onAnimEnd).addClass(anim);
                // animEnd event will not execute with some integration plugins, this is a workaround to make sure it's executed
                timer = setTimeout(onAnimEnd, 500);
            } else {
                callback.call(e, el);
            }
        }

        function doAction(el, action) {
            var queue,
                id = el.attr('data-ref');

            queue = actionQueue[id] = actionQueue[id] || [];

            if (action) {
                queue.push(action);
            }

            if (el.attr('data-action')) {
                return;
            }

            action = queue.shift();

            el.attr('data-action', 1);

            action(function () {
                el.removeAttr('data-action');
                if (queue.length) {
                    doAction(el);
                } else {
                    delete actionQueue[id];
                }
            });
        }

        function processStages(stages, dir, duplicate) {
            var count,
                temp;

            if (stages && stages.length) {
                count = 100 / (stages.length + 2);

                $.each(stages, function (i, stage) {
                    if (stage.key === undefined) {
                        stage.key = stageNr++;
                    }
                    if (stage.percent === undefined) { // if no percent passed then generate to both sides
                        stage.percent = dir * count * (i + 1);
                        if (duplicate) {
                            temp = extend({}, stage);
                            temp.key = stageNr++;
                            temp.percent = -count * (i + 1);
                            stages.push(temp);
                            stageObj[temp.key] = temp;
                        }
                    }
                    stageObj[stage.key] = stage;
                });
            }
        }

        // Call the parent constructor
        classes.Base.call(this, elem, settings, true);

        

        /**
         * Animate a list item
         */
        that.animate = function (li, anim, callback) {
            animate(li, 'mbsc-lv-item-' + anim, callback);
        };

        /**
         * Add a new list item
         */
        that.add = function (id, markup, index, callback, p, isUndo) {
            var backBtn,
                length,
                siblings,
                sublevel,
                map,
                pref,
                cssClass = '',
                parent = p === undefined ? elm : getItemByID(p),
                list = parent,
                li = (typeof markup !== 'object') ? $('<li data-ref="' + guid++ + '" data-id="' + id + '">' + markup + '</li>') : markup,
                dir = li.attr('data-pos') < 0 ? 'left' : 'right',
                ref = li.attr('data-ref');

            callback = callback || empty;

            if (!ref) {
                ref = guid++;
                li.addClass('mbsc-lv-item').attr('data-ref', ref);
            }

            initItem(li);

            // Put action in undo stack
            if (!isUndo) {
                that.addUndoAction(function (next) {
                    if (sublevel) {
                        that.navigate(parent, function () {
                            list.remove();
                            parent.removeClass('mbsc-lv-parent').children('.mbsc-lv-arr').remove();
                            map.child = parent.children('ul,ol');
                            that.remove(li, null, next, true);
                        });
                    } else {
                        that.remove(li, null, next, true);
                    }
                }, true);
            }

            doAction(li, function (next) {
                resetItem(li.css('top', '').removeClass('mbsc-lv-item-undo'));

                // If parent is a list item, insert new element in the sublist
                if (parent.is('li')) {
                    pref = parent.attr('data-ref');
                    // If there is no sublist yet, create it
                    if (!parent.children('ul,ol').length) {
                        sublevel = true;
                        parent.append('<ul></ul>');
                    }
                } else {
                    pref = parent.children('.mbsc-lv-back').attr('data-back');
                }

                map = treeMap[pref];

                if (map) {
                    if (!map.child.length) {
                        parent.addClass('mbsc-lv-parent').prepend(htmlRight);

                        // Set parent to be the sublist
                        list = parent.children('ul,ol').prepend(htmlLeft).addClass('mbsc-lv');
                        map.child = list;

                        $('.mbsc-lv-back', parent).attr('data-back', pref);
                    } else {
                        list = map.child;
                    }
                }

                treeMap[ref] = {
                    item: li,
                    child: li.children('ul,ol'),
                    parent: list,
                    ref: pref
                };

                siblings = getChildren(list);
                length = siblings.length;

                if (index === undefined || index === null) {
                    index = length;
                }

                if (isUndo) {
                    cssClass = 'mbsc-lv-item-new-' + (isUndo ? dir : '');
                }

                initBranch(li.addClass(cssClass));

                if (index !== false) {
                    if (!length) {
                        backBtn = $('.mbsc-lv-back', list);
                        if (backBtn.length) {
                            li.insertAfter(backBtn);
                        } else {
                            list.append(li);
                        }
                    } else if (index < length) {
                        li.insertBefore(siblings.eq(index));
                    } else {
                        li.insertAfter(siblings.eq(length - 1));
                    }
                }
                // If current level is visible
                if (list.hasClass('mbsc-lv-v')) {
                    // Don't run expand animation if add is running on the "undo" element
                    that.animate(li.height(li[0].offsetHeight), isUndo && undoRef === ref ? 'none' : 'expand', function (li) {
                        that.animate(li.height(''), isUndo ? 'add-' + dir : 'pop-in', function (li) {
                            callback.call(e, li.removeClass(cssClass));
                            next();
                        });
                    });
                } else {
                    callback.call(e, li.removeClass(cssClass));
                    next();
                }

                cont.trigger('mbsc-enhance', [{
                    theme: s.theme,
                    lang: s.lang
                }]);

                event('onItemAdd', {
                    target: li[0]
                });
            });
        };

        /**
         * Swipe a list item programatically
         */
        that.swipe = function (li, percent, time, demo, callback) {
            li = getItemByID(li);
            item = li;
            demoMode = demo;
            simulating = true;
            action = true;
            time = time === undefined ? 300 : time;
            diffX = percent > 0 ? 1 : -1;

            onActionStart();
            onSwipeStart();

            slide(li, percent, time);

            clearTimeout(swipeTimeout);
            clearInterval(swipeInterval);

            swipeInterval = setInterval(function () {
                animPos = util.getPosition(li) / itemw * 100;
                onSwipeMove();
            }, 10);

            swipeTimeout = setTimeout(function () {
                clearInterval(swipeInterval);
                animPos = percent;
                // We need one additional move with the final percent to get the correct stage
                onSwipeMove();
                onSwipeEnd(callback);
                demoMode = false;
                simulating = false;
                action = false;
            }, time);
        };

        that.openStage = function (li, stage, time, demo) {
            if (stageObj[stage]) {
                that.swipe(li, stageObj[stage].percent, time, demo);
            }
        };

        that.openActions = function (li, dir, time, demo) {
            li = getItemByID(li);

            var percent = getActionWidth(types[li.attr('data-type') || 'defaults'], dir == 'left' ? -1 : 1);
            that.swipe(li, dir == 'left' ? -percent : percent, time, demo);
        };

        that.close = function (li, time) {
            that.swipe(li, 0, time);
        };

        /**
         * Remove a list item
         */
        that.remove = function (li, dir, callback, isUndo) {
            var index,
                parent;

            callback = callback || empty;

            li = getItemByID(li);

            if (li.length) {
                parent = li.parent();
                index = getChildren(parent).index(li);

                // Put action in undo stack
                if (!isUndo) {
                    // If undo element is removed, undo placeholder should be removed with animation
                    if (li.attr('data-ref') === undoRef) {
                        undoAnim = true;
                    }
                    that.addUndoAction(function (next) {
                        that.add(null, li, index, next, parent, true);
                    }, true);
                }

                doAction(li, function (next) {
                    dir = dir || li.attr('data-pos') < 0 ? 'left' : 'right';

                    if (parent.hasClass('mbsc-lv-v')) {
                        that.animate(li.addClass('mbsc-lv-removed'), isUndo ? 'pop-out' : 'remove-' + dir, function (li) {
                            that.animate(li.height(li[0].offsetHeight), 'collapse', function (li) {
                                resetItem(li.height('').removeClass('mbsc-lv-removed'));
                                if (callback.call(e, li) !== false) {
                                    li.remove();
                                }
                                next();
                            });
                        });
                    } else {
                        if (callback.call(e, li) !== false) {
                            li.remove();
                        }
                        next();
                    }

                    event('onItemRemove', {
                        target: li[0]
                    });
                });
            }
        };

        /**
         * Moves an item in the list
         */
        that.move = function (li, index, dir, callback, p, isUndo) {
            li = getItemByID(li);
            //if (getChildren(li.parent()).index(li) !== index) {
            if (!isUndo) {
                that.startActionTrack();
            }
            stagec.append(iconc);
            that.remove(li, dir, null, isUndo);
            that.add(null, li, index, callback, p, isUndo);
            if (!isUndo) {
                that.endActionTrack();
            }
            //}
        };

        /**
         * Navigate and scroll to the given element
         */
        that.navigate = function (item, callback) {
            var map,
                level;

            item = getItemByID(item);
            map = treeMap[item.attr('data-ref')];
            level = getItemLevel(item);

            if (map) {
                drill(level >= slideLevel ? 'r' : 'l', map.parent, item, callback, true);
                slideLevel = level;
            }
        };

        /**
         * Listview initialization.
         */
        that.init = function (ss) {
            var contClass,
                headerClass,
                sortable,
                defSortHandle = elm.find('ul,ol').length ? 'left' : 'right',
                i = 0,
                icons = '',
                iconsLeft = '',
                iconsRight = '';

            that._init(ss);

            sortable = s.sort || s.sortable;

            // Backward compatiblity for 'group' and sortHandle settings
            // ---
            if (sortable === 'group') {
                sortable = {
                    group: false,
                    multiLevel: true
                };
            }

            if (sortable === true) {
                sortable = {
                    group: true,
                    multiLevel: true,
                    handle: s.sortHandle
                };
            }

            if (sortable && sortable.handle === undefined) {
                sortable.handle = s.sortHandle;
            }
            // ---

            that.sortable = sortable || false;

            contClass = 'mbsc-lv-cont mbsc-lv-' + s.theme +
                (s.rtl ? ' mbsc-lv-rtl' : '') +
                (s.baseTheme ? ' mbsc-lv-' + s.baseTheme : '') +
                (s.animateIcons ? ' mbsc-lv-ic-anim' : '') +
                (s.striped ? ' mbsc-lv-alt-row ' : '') +
                (s.fixedHeader ? ' mbsc-lv-has-fixed-header ' : '');
            if (!cont) {
                // Icon menu container
                icons += '<div class="mbsc-lv-multi-c"></div>';
                // Stage icons container
                icons += '<div class="mbsc-lv-ic-c"><div class="mbsc-lv-ic-s mbsc-lv-ic mbsc-ic mbsc-ic-none"></div><div class="mbsc-lv-ic-text"></div></div>';

                // Add classes
                elm.addClass('mbsc-lv mbsc-lv-v mbsc-lv-root').show();

                stagec = $('<div class="mbsc-lv-stage-c">' + icons + '</div>');
                iconc = $('.mbsc-lv-ic-c', stagec);
                multic = $('.mbsc-lv-multi-c', stagec);
                icon = $('.mbsc-lv-ic-s', stagec);
                text = $('.mbsc-lv-ic-text', stagec);

                placeholder = $('<li class="mbsc-lv-item mbsc-lv-ph"></li>');
                fill = $('<div class="mbsc-lv-fill-item"></div>');
                cont = $('<div class="' + contClass + '"><ul class="mbsc-lv mbsc-lv-dummy"></ul><div class="mbsc-lv-sl-c"></div></div>');
                hasContext = s.context !== 'body';
                wnd = $(hasContext ? s.context : window);
                dummyCont = $('.mbsc-lv-dummy', cont);

                cont.insertAfter(elm);


                // Recalculate sizes on resize / orientationchange
                wnd.on('orientationchange resize', onResize);

                onResize();

                // Slide events
                cont.on('touchstart mousedown', '.mbsc-lv-item', onStart)
                    .on('touchmove', '.mbsc-lv-item', onMove)
                    .on('touchend touchcancel', '.mbsc-lv-item', onEnd);
                // Make native form elements work
                //.on('touchstart mousedown', 'input,select,.mbsc-lv-clickable', function (ev) {
                //ev.stopPropagation();
                //});

                // Prevent click on swipe
                if (e.addEventListener) {
                    e.addEventListener('click', function (ev) {
                        if (preventClick) {
                            ev.stopPropagation();
                            ev.preventDefault();
                            preventClick = false;
                        }
                    }, true);
                }

                // Init action icons
                // ---
                cont.on('touchstart mousedown', '.mbsc-lv-ic-m', function (ev) {
                    if (!demoMode) {
                        ev.stopPropagation();
                        ev.preventDefault();
                    }
                    startX = getCoord(ev, 'X');
                    startY = getCoord(ev, 'Y');
                }).on('touchend mouseup', '.mbsc-lv-ic-m', function (ev) {
                    if (!demoMode) {
                        if (ev.type === 'touchend') {
                            util.preventClick();
                        }
                        // If movement is less than 10px, fire the click event handler
                        if (confirms && !$(this).hasClass('mbsc-lv-ic-disabled') && Math.abs(getCoord(ev, 'X') - startX) < 10 && Math.abs(getCoord(ev, 'Y') - startY) < 10) {
                            runAction((animPos < 0 ? type.rightMenu : type.leftMenu)[$(this).index()], confirmItem, confirmIndex);
                        }
                    }
                });
                // ---

                // Init hierarchical navigation
                // ---

                slideCont = $('.mbsc-lv-sl-c', cont).append(elm.addClass('mbsc-lv-sl-curr')).attr('data-ref', guid++);

                currList = elm;
                currParent = cont;
                // ---

            } else {
                cont.attr('class', contClass);

                // reinit sort handles
                if (that.sortable.handle) {
                    $('.mbsc-lv-handle-c', elm).remove();
                }
                // remove to reinit list items
                $('li:not(.mbsc-lv-back)', elm).removeClass('mbsc-lv-item');
            }

            htmlLeft = '<li class="mbsc-lv-item mbsc-lv-back">' + s.backText + '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + s.leftArrowClass + '"></div></li>';
            htmlRight = '<div class="mbsc-lv-arr mbsc-lv-ic mbsc-ic ' + s.rightArrowClass + '"></div>';

            // Init sort handles
            // ---
            if (that.sortable.handle) {
                handlePos = that.sortable.handle === true ? defSortHandle : that.sortable.handle;
                handleDiv = '<div class="mbsc-lv-handle-c mbsc-lv-item-h-' + handlePos + ' mbsc-lv-handle"><div class="' + s.handleClass + ' mbsc-lv-handle-bar-c mbsc-lv-handle">' + s.handleMarkup + '</div></div>';
                cont.addClass('mbsc-lv-handle-' + handlePos);
            }
            // ---

            initBranch(elm);

            // Init stages and actions
            // ---
            stageNr = 0;

            types = s.itemGroups || {};
            types.defaults = {
                swipeleft: s.swipeleft,
                swiperight: s.swiperight,
                stages: s.stages,
                actions: s.actions,
                actionsWidth: s.actionsWidth
            };

            $.each(types, function (n, v) {
                v.swipe = v.swipe !== undefined ? v.swipe : s.swipe;
                v.stages = v.stages || [];

                // Init stages
                processStages(v.stages, 1, true);
                processStages(v.stages.left, 1);
                processStages(v.stages.right, -1);

                if (v.stages.left || v.stages.right) {
                    v.stages = [].concat(v.stages.left || [], v.stages.right || []);
                }

                found = false;

                if (!v.stages.length) {
                    if (v.swipeleft) {
                        v.stages.push({
                            percent: -30,
                            action: v.swipeleft
                        });
                    }
                    if (v.swiperight) {
                        v.stages.push({
                            percent: 30,
                            action: v.swiperight
                        });
                    }
                }

                $.each(v.stages, function (i, v) { // find the 0
                    if (v.percent === 0) {
                        found = true;
                        return false;
                    }
                });

                if (!found) {
                    v.stages.push({
                        percent: 0
                    });
                }

                v.stages.sort(function (a, b) {
                    return a.percent - b.percent;
                });

                $.each(v.stages, function (i, s) { // find the 0
                    if (s.percent === 0) {
                        v.start = i;
                        return false;
                    }
                });

                if (found) {
                    v.left = v.right = v.stages[v.start];
                } else {
                    v.left = v.stages[v.start - 1] || {};
                    v.right = v.stages[v.start + 1] || {};
                }

                // Init actions
                if (v.actions) {
                    v.leftMenu = v.actions.left || v.actions;
                    v.rightMenu = v.actions.right || v.leftMenu;

                    iconsLeft = '';
                    iconsRight = '';

                    for (i = 0; i < v.leftMenu.length; i++) {
                        iconsLeft += '<div ' + (v.leftMenu[i].color ? 'style="background-color: ' + v.leftMenu[i].color + '"' : '') + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + v.leftMenu[i].icon + '">' + (v.leftMenu[i].text || '') + '</div>';
                    }

                    for (i = 0; i < v.rightMenu.length; ++i) {
                        iconsRight += '<div ' + (v.rightMenu[i].color ? 'style="background-color: ' + v.rightMenu[i].color + '"' : '') + ' class="mbsc-lv-ic-m mbsc-lv-ic mbsc-ic mbsc-ic-' + v.rightMenu[i].icon + '">' + (v.rightMenu[i].text || '') + '</div>';
                    }

                    if (v.actions.left) {
                        v.swipe = v.actions.right ? v.swipe : 'right';
                    }

                    if (v.actions.right) {
                        v.swipe = v.actions.left ? v.swipe : 'left';
                    }

                    v.icons = '<div class="mbsc-lv-multi mbsc-lv-multi-ic-left">' + iconsLeft + '</div><div class="mbsc-lv-multi mbsc-lv-multi-ic-right">' + iconsRight + '</div>';
                }
            });
            // ---

            // Init fixed header
            // ---
            if (s.fixedHeader) {
                headerClass = 'mbsc-lv-fixed-header' + (hasContext ? ' mbsc-lv-fixed-header-ctx mbsc-lv-' + s.theme + (s.baseTheme ? ' mbsc-lv-' + s.baseTheme : '') : '');
                if (!groupHeader) {
                    groupHeader = $('<div class="' + headerClass + '"></div>');

                    if (hasContext) {
                        wnd.before(groupHeader);
                    } else {
                        cont.prepend(groupHeader);
                    }

                    onScrollThrottle = util.throttle(onScroll, 200);

                    wnd.on('scroll touchmove', onScrollThrottle);
                } else {
                    groupHeader.attr('class', headerClass);
                }
            }
            // ---

            if (s.hover) {
                if (!hoverTime) {
                    cont.on('mouseover.mbsc-lv', '.mbsc-lv-item', function () {
                        if (!hoverItem || hoverItem[0] != this) {
                            onMouseLeave();

                            hoverItem = $(this);

                            if (types[hoverItem.attr('data-type') || 'defaults'].actions) {
                                hoverTimer = setTimeout(function () {
                                    if (!preventHover) {
                                        hoverItemOpened = true;
                                        that.openActions(hoverItem, hoverDir, hoverTime, false);
                                    } else {
                                        hoverItem = null;
                                    }
                                }, hoverTimeout);
                            }
                        }
                    }).on('mouseleave.mbsc-lv', onMouseLeave);
                }

                hoverTime = s.hover.time || 200;
                hoverTimeout = s.hover.timeout || 200;
                hoverDir = s.hover.direction || s.hover || 'right';
            }

            if (elm.is('[mbsc-enhance]')) {
                hadEnhance = true;
                elm.removeAttr('mbsc-enhance');
                cont.attr('mbsc-enhance', '');
            }

            cont.trigger('mbsc-enhance', [{
                theme: s.theme,
                lang: s.lang
            }]);

            event('onInit');
        };

        /**
         * Listview destroy: removes event handlers, classes and additional markup.
         */
        that.destroy = function () {
            currParent.append(currList);

            if (hasContext && groupHeader) {
                groupHeader.remove();
            }

            if (hadEnhance) {
                elm.attr('mbsc-enhance', '');
            }

            cont
                .find('.mbsc-lv-txt,.mbsc-lv-img')
                .removeClass('mbsc-lv-txt mbsc-lv-img');

            cont
                .find('ul,ol')
                .removeClass('mbsc-lv mbsc-lv-v mbsc-lv-root mbsc-lv-sl-curr')
                .find('li')
                .removeClass('mbsc-lv-gr-title mbsc-lv-item mbsc-lv-item-enhanced mbsc-lv-parent mbsc-lv-img-left mbsc-lv-img-right mbsc-lv-item-ic-left mbsc-lv-item-ic-right')
                .removeAttr('data-ref');

            $('.mbsc-lv-back,.mbsc-lv-handle-c,.mbsc-lv-arr,.mbsc-lv-item-ic', cont).remove();

            elm.insertAfter(cont);

            // cont.off().remove();  // check if the event handlers got removed !!!
            cont.remove();
            stagec.remove();

            wnd
                .off('scroll touchmove', onScrollThrottle)
                .off('orientationchange resize', onResize);


            that._destroy();
        };

        // Undo manager, may be removed later in separate class
        // ---

        var undoing,
            undoQueue = [],
            undoStack = [],
            undoGroup = [],
            undoListener = 0;

        that.startActionTrack = function () {
            // Start a new undo group if not running
            if (!undoListener) {
                undoGroup = [];
            }

            undoListener++;
        };

        that.endActionTrack = function () {
            // End undo group, if this the outermost listener (undoListener counter is 0);
            undoListener--;

            if (!undoListener) {
                undoStack.push(undoGroup);
            }
        };

        that.addUndoAction = function (action, async) {
            var obj = {
                action: action,
                async: async
            };

            //if (!undoing) {
            if (undoListener) {
                // Add undo action in current group, if a listener is running
                undoGroup.push(obj);
            } else {
                // Add undo action within a new group
                undoStack.push([obj]);
                if (undoStack.length > s.undoLimit) {
                    undoStack.shift();
                }
            }
            //}
        };

        that.undo = function () {
            var action,
                i,
                group;

            function run() {
                if (i < 0) {
                    undoing = false;
                    // If there is data in the queue, keep calling the undo
                    undo();
                } else {
                    action = group[i];
                    i--;
                    if (action.async) {
                        // Run action, next action must be called inside the action
                        action.action(run);
                    } else {
                        // Run action
                        action.action();
                        // Run next action
                        run();
                    }
                }
            }

            function undo() {
                group = undoQueue.shift();

                if (group) {
                    undoing = true;
                    i = group.length - 1;
                    // Call actions from the group recoursively
                    run();
                }
            }

            if (undoStack.length) {
                undoQueue.push(undoStack.pop());
            }

            // If undo is currently running, don't do anything (it will be called later from queue)
            if (!undoing) {
                undo();
            }
        };

        // ---

        // Constructor

        s = that.settings;
        event = that.trigger;

        that.init(settings);
    };

    // Defaults
    classes.ListView.prototype = {
        _class: 'listview',
        _hasDef: true,
        _hasTheme: true,
        _hasLang: true,
        _defaults: {
            context: 'body',
            actionsWidth: 90,
            sortDelay: 250,
            undoLimit: 10,
            swipe: true,
            quickSwipe: true,
            animateIcons: true,
            animation: true,
            revert: true,
            vibrate: true,
            handleClass: '',
            handleMarkup: '<div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div><div class="mbsc-lv-handle-bar mbsc-lv-handle"></div>',
            leftArrowClass: 'mbsc-ic-arrow-left4',
            rightArrowClass: 'mbsc-ic-arrow-right4',
            backText: 'Back',
            undoText: 'Undo',
            stages: []
        }
    };

    ms.themes.listview.mobiscroll = {
        leftArrowClass: 'mbsc-ic-arrow-left5',
        rightArrowClass: 'mbsc-ic-arrow-right5'
    };

    ms.presetShort('listview', 'ListView');
})(window, document);
