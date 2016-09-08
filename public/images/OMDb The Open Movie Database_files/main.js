$(document).ready(function () {
    
    var sortType = 'TITLE';
    var activeId = 'title';
    var passiveId = 'year';
    var datas = [];

    $('#search-form').submit(function(e) {
        e.preventDefault();

        var $inputs = $('#search-form :input#search-input');
        var value = '';
        $inputs.each(function() {
            value = $(this).val();
        });

        $.ajax('http://www.omdbapi.com/?s='+ value).done(function(_datas) {
            datas = _datas.Search;
            render();
        });
    });

    $('#title-input, #date-input').on('click', function(e) {
        
        switch (e.currentTarget.value) {
            case 'TITLE':
                sortType = 'TITLE';
                activeId = 'title';
                passiveId = 'date';
                break;
            case 'RELEASE YEAR':
                sortType = 'RELEASE YEAR';
                activeId = 'date';
                passiveId = 'title';
                break;
            default:
                sortType = 'TITLE';
                activeId = 'title';
                passiveId = 'date';
                break;
        }

        toggleColour(e);
        render();
    });

    function toggleColour(e) {
        $('#' + activeId + '-input').addClass('sort-active').removeClass('sort-button');
        $('#' + passiveId + '-input').removeClass('sort-active').addClass('sort-button');
    }

    function showResults() {
        $('#results-container').slideDown("slow");
    }

    function sortDatas() {
        var sortProp = '';

        switch (sortType) {
            case 'TITLE':
                sortProp = 'Title';
                break;
            case 'RELEASE YEAR':
                sortProp = 'Year';
                break;
            default:
                sortType = 'Title';
                break;
        }

        datas.sort(function(a, b) {
            if(a[sortProp] > b[sortProp])
                return 1;
            if(a[sortProp] < b[sortProp])
                return -1;
            return 0;
        });
    }

    function render() {
        datas && datas.length && sortDatas();

        $('.film-list').empty();

        $.each(datas, function(index, data) {
            var typeClass = '';
            switch (data.Type) {
                case 'movie':
                    data.Type = 'film';
                    typeClass = 'type-movie';
                    break;
                case 'series':
                typeClass = 'type-series';
                    break;
                case 'game':
                typeClass = 'type-game';
                    break;    
                default:
                    sortType = 'Title';
                    break;
            }

            $('.film-list').append('<li class="film-listing col-xs-12 col-sm-6 col-md-4"></li>')
            $('.film-list').find('li').eq(index).append('<div class="film-container"><div class="film-inner row">' + ' <div class="col-xs-3"><img class="film-poster" alt="No image" src="' + data.Poster + '"/></div> <div class="film-info col-xs-9"><div class="film-type ' + typeClass + '">• ' + data.Type + '</div><div class="film-title">' + data.Title + '</div><div class="film-year">' + data.Year + '</div></div></div></div>');

            $('.film-list li').on('click', function() {
                $(this).find('div.film-info').empty().append('<div class="film-imdbID">IMDB ID: ' + data.imdbID + '</div>');
            });
        });

        showResults();
    }
});
