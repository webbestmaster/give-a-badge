const app = (function() {
    const winWidth = document.documentElement.clientWidth;

    const winHeight = document.documentElement.clientHeight;

    const _onLoad = function() {
        let ps;

        let psList;

        const headroom = new Headroom(document.getElementById('headroom'));

        headroom.init();

        $(document).mouseup(function(e) {
            const div = $('.js-outsideclick');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('is-active');
                $('html,body').removeClass('is-modal-active');
            }
        });

        $(document).mouseup(function(e) {
            const div = $('.js-outsideclick-search-users');

            if (!div.is(e.target) && div.has(e.target).length === 0) {
                div.removeClass('is-active');
            }
        });

        // включалка поиска
        $('.js-search-ctrl').on('click', function(e) {
            e.preventDefault();

            $('#searchBody').toggleClass('is-active');
            $('#logo').toggleClass('is-moveup');

            $(this)
                .parents('form')
                .get(0)
                .reset();
        });

        // включалка модалок
        $('[data-toggle]').on('click', function(e) {
            e.preventDefault();

            // закрываем все модалки
            $('.js-modal').removeClass('is-active');

            // сворачиваем список пользователей категории
            $('.js-categoryCard-list').removeClass('is-active');
            $('.js-categoryCard-list').css('max-height', '');
            $('.js-categoryCard-list').scrollTop(0);
            if (psList) {
                psList.destroy();
            }
            // отключаем активность кнопки сворачивания
            $('.categoryCardExpander').removeClass('is-active');

            // отключаем блоки в модалке
            $('.js-modal .js-modal-body').addClass('hidden');

            // id цели
            const id = $(this).attr('href');

            // показываем первую вкладку в модалке
            $(id)
                .find('.js-modal-body')
                .eq(0)
                .removeClass('hidden');

            const target = document.querySelector(id);

            const targetScroll = target.querySelector('.js-perfectScrollbar');

            if (targetScroll) {
                // if ( ps ) ps.destroy();
                // ps = new PerfectScrollbar( targetScroll );
            }

            if ($(this).hasClass('is-active')) {
                $(id).removeClass('is-active');
                $('html,body').removeClass('is-modal-active');
                $(this).removeClass('is-active');
            } else {
                $(this).addClass('is-active');
                $(id).addClass('is-active');
                $('html,body').addClass('is-modal-active');
            }
        });

        // закрыватель модалки (закрывает все модалки)
        $('[data-modal-close]').on('click', function(e) {
            e.preventDefault();

            $('html,body').removeClass('is-modal-active');
            $('.js-modal').removeClass('is-active');
            $('[data-toggle]').removeClass('is-active');
        });

        // переключатель внутри модалки
        $('[data-modal-switch]').on('click', function(e) {
            e.preventDefault();

            $('.js-modal-body').addClass('hidden');

            const id = $(this).attr('href');

            const target = document.querySelector(id);

            const targetScroll = target.querySelector('.js-perfectScrollbar');

            $(id).removeClass('hidden');

            if (targetScroll) {
                // if ( ps ) ps.destroy();
                // ps = new PerfectScrollbar( targetScroll );

                const targetScrollValue = targetScroll.scrollTop;

                if (targetScrollValue > 0) {
                    targetScroll.scrollTop = 0;
                }
            }
        });

        // разворачивалка списка пользователей в катрочке категории
        $('[data-expand-userlist]').on('click', function(e) {
            e.preventDefault();

            const $list = $(this)
                .parent()
                .find('.js-categoryCard-list');

            const $modal = $(this).parents('.modal');

            const modalHeight = $modal.height();

            if ($list.hasClass('is-active')) {
                $list.css('max-height', '');
                psList.destroy();
                $list.scrollTop(0);
            } else {
                $list.css('max-height', modalHeight + 'px');
                if (psList) {
                    psList.destroy();
                }
                psList = new PerfectScrollbar($list.get(0), {
                    // wheelPropagation: true
                });
            }

            const $modalScroll = $modal.find('.js-perfectScrollbar');

            const modalScrollValue = $modalScroll.scrollTop();

            // if ( ps ) ps.destroy();
            // ps = new PerfectScrollbar( $modalScroll.get(0) );

            if (modalScrollValue > 0) {
                $modalScroll.scrollTop(0);
            }

            $(this).toggleClass('is-active');
            $list.toggleClass('is-active');
        });

        $('[data-block-expander]').on('click', function(e) {
            e.preventDefault();

            const id = $(this).attr('href');

            $(id).toggleClass('is-expanded');

            if (ps) {
                ps.update();
            }
        });

        // поиск
        $('#search').on('submit', function(e) {
            e.preventDefault();

            $('#cardsContainer').removeClass('is-loaded');

            // здесь будет обработка запроса

            setTimeout(function() {
                $('#cardsContainer').addClass('is-loaded');
            }, 1000);
        });

        // поиск пользователей
        $('.js-people-search-input').on('keyup', function(e) {
            // запускаем поиск
            const value = $(this).val();

            const $searchListContainer = $(this)
                .parent()
                .find('.js-people-search-list');

            // если есть текст
            if (value) {
                const searchStr = value.toLowerCase();

                const values = $searchListContainer.find('.js-value');

                let length = 0;

                $.each(values, function(idx, item) {
                    const itemText = $(item).text();

                    if (itemText.toLowerCase().indexOf(searchStr) === -1) {
                        $(item)
                            .parents('.js-people-search-list-item')
                            .hide();
                    } else {
                        // найдено
                        length += 1;
                        // $searchListContainer.show();
                        $searchListContainer.addClass('is-active');
                        $(item)
                            .parents('.js-people-search-list-item')
                            .show();
                    }
                });

                if (length > 0) {
                    $searchListContainer.addClass('is-active');
                } else {
                    $searchListContainer.removeClass('is-active');
                }
            } else {
                // если текста нет
                $searchListContainer.removeClass('is-active');
            }
        });

        // добавляем пользователя в список
        $('.js-people-search-list-item').on('click', function(e) {
            const $container = $(this).parents('.js-category-people');

            const imgPic = $(this)
                .find('img')
                .attr('src');

            const name = $(this)
                .find('.js-value')
                .text();

            const html =
                '<div class="categoryUserList-item js-category-people-item"><div class="userPic userPic--ctrl"><img src="' +
                imgPic +
                '" alt="' +
                name +
                '"/><svg class="icon"><use xlink:href="assets/img/sprite.svg#cross"></use></svg></div></div>';

            $container.find('.js-people-search-input').val('');

            $container.find('.js-category-people-list').append(html);
            $container.find('.js-people-search-list').removeClass('is-active');
        });

        // удалить пользователя
        $('body').on('click', '.js-category-people-item', function(e) {
            e.preventDefault();

            $(this).remove();
        });

        // форма
        $('.js-category-people-form').on('submit', function(e) {
            e.preventDefault();

            const btn = $(this).find('button[type="submit"]');

            btn.attr('disabled', true);
            btn.addClass('is-process');

            const formData = $(this).serialize();

            setTimeout(function() {
                btn.attr('disabled', false);
                btn.removeClass('is-process');
            }, 2000);
        });
    };

    const init = function() {
        svg4everybody();
        document.addEventListener('DOMContentLoaded', _onLoad);
    };

    return {init};
})();

app.init();
