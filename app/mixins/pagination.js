var get = Ember.get, set = Ember.set;

export default Ember.Mixin.create({

  pagesToShow: 25,

  pages: function() {

    var availablePages = this.get('availablePages'),
    pages = [],
    page;

    for (var i = 0; i < availablePages; i++) {
      page = i + 1;
      pages.push({ page_id: page.toString(), is_current: page === parseInt(this.get('currentPage'), 10) });
    }

    if( parseInt(this.get('selectedPage'),10) > availablePages )
    {
        this.transitionToRoute( this.get('paginatedRoute'), availablePages );
    }

    var startRange = this.get('currentPage') > this.get('availablePages') - this.get('pagesToShow')?
            this.get('availablePages') - this.get('pagesToShow'):
            this.get('currentPage')-1;

      startRange = this.get('pagesToShow') > this.get('availablePages') ? 0: startRange;

    return pages.slice( startRange, startRange+ this.get('pagesToShow') );

  }.property('availablePages', 'currentPage', 'itemsPerPage'),

  currentPage: function() {

    return parseInt(this.get('selectedPage'), 10) || 1;

  }.property('selectedPage'),

  nextPage: function() {

    var nextPage = this.get('currentPage') + 1;
    var availablePages = this.get('availablePages');

      if (nextPage <= availablePages) {
          return nextPage;
      }else{
          return this.get('currentPage');
      }

  }.property('currentPage', 'availablePages'),

  prevPage: function() {

    var prevPage = this.get('currentPage') - 1;

      if (prevPage > 0) {
          return prevPage;
      }else{
          return this.get('currentPage');
      }

  }.property('currentPage'),

  availablePages: function() {

      var contentLength = this.get('recordMeta') ? this.get('recordMeta.totalItems') : this.get('content.length');

    return Math.ceil((contentLength / this.get('itemsPerPage')) || 1);

  }.property('content.length', 'itemsPerPage', 'recordMeta'),

  paginatedContent: function() {

    var selectedPage = this.get('selectedPage') || 1;
    var upperBound = (selectedPage * this.get('itemsPerPage'));
    var lowerBound = (selectedPage * this.get('itemsPerPage')) - this.get('itemsPerPage');
    var models = this.get('content');

    return models.slice(lowerBound, upperBound);

  }.property('selectedPage', 'content.@each', 'itemsPerPage'),

    actions:{
        changePerPageCount:function(count){
            this.set('itemsPerPage', count);
            if( this.get('selectedPage') > this.get('availablePages')){
                //TODO: TAKE ACTION HERE WHEN THE CURRENT PAGE IS GREATER THAN WHAT'S AVAILABLE TO SHOW
            }
            this.changePerPageCountCallback(count);
        }
    }

});
