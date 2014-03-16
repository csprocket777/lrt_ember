/**
 * Created by chshipma on 10/4/13.
 */
var Bootstrap = window.Bootstrap;

export default Ember.Component.extend({
    layoutName: "display-type-prioritization-category-fields",

    currentCreationType: "revision",
    currentCategory:    null,
    currentTopic:       null,
    currentCriteria:    null,
    selectedCriteriaRevision: null,

    _setup: function(){
        this.set("selectedCriteriaRevision", this.get('categories').findBy('criteriaRevision',this.get('latestCriteriaRevision')));
        if( Ember.isNone(this.get('currentCategory')) )
        {
            this.setSelectedContent();
        }
    }.on('init'),

    revisionDeleteModalButtons:[
        Ember.Object.create({title: 'Confirm', clicked: 'confirmRevisionDelete', type:'danger', dismiss:'modal'}),
        Ember.Object.create({title: 'Cancel', clicked: 'cancelRevisionDelete', dismiss:'modal'})
    ],

    categoryDeleteModalButtons:[
        Ember.Object.create({title: 'Confirm', clicked: 'deleteCategoryConfirm', type:'danger', dismiss:'modal'}),
        Ember.Object.create({title: 'Cancel', dismiss:'modal'})
    ],

    topicDeleteModalButtons:[
        Ember.Object.create({title: 'Confirm', clicked: 'deleteTopicConfirm', type:'danger', dismiss:'modal'}),
        Ember.Object.create({title: 'Cancel', dismiss:'modal'})
    ],

    criteriaDeleteModalButtons:[
        Ember.Object.create({title: 'Confirm', clicked: 'deleteCriteriaConfirm', type:'danger', dismiss:'modal'}),
        Ember.Object.create({title: 'Cancel', dismiss:'modal'})
    ],

    unsavedRecords: Ember.computed.alias('optionsController.unsavedRecords'),

    isDirtyDidChange: function() {
        var isDirty = this.get('model.modelToDisplay.content'),
            unsavedRecords = this.get('unsavedRecords');

        isDirty.forEach(function(item,index,enumerable){
            if( item.get('isDirty') ){
                unsavedRecords.addObject(item);
            } else {
                unsavedRecords.removeObject(item);
            }
        });
    }.observes('model.modelToDisplay.content.@each.isDirty'),


    willInsertElement:function(){
        if( !this.get('currentCategory') )
        {
            this.setSelectedContent();
        }
    },

    setSelectedContent:function(){
        if( this.get('selectedCriteriaRevisionModel.length') )
        {
            this.set('currentCategory', this.get('selectedCriteriaRevisionModel.firstObject'));
            this.set('currentTopic', this.get('selectedCriteriaRevisionModel.firstObject.topics.firstObject'));
            this.set('currentCriteria', this.get('selectedCriteriaRevisionModel.firstObject.topics.firstObject.criteria.firstObject'));
        }
    },


    isActiveRevision:function(){
        return this.get('selectedCriteriaRevisionModel.firstObject.active');
    }.property('selectedCriteriaRevisionModel.firstObject.active'),

    revisionChangeObserver: function(){
        this.setSelectedContent();
    }.observes('selectedCriteriaRevisionModel', 'criteriaRevisions'),


    didInsertElement:function(){
        $('[data-toggle="tooltip"]').tooltip();
    },

    triggerTooltips:function(){
        $('[data-toggle="tooltip"]').tooltip();

        if( this.get('saveNeeded') === false )
        {
            this.set('currentCreationType', null);
        }
    }.observes('saveNeeded'),



    saveNeeded:function(){
        return this.get('model.modelToDisplay').someProperty('isNew');
    }.property('model.modelToDisplay.@each.isNew'),

    unsavedRevision:function(){
        return this.get('saveNeeded') && this.get('currentCreationType') === "revision";
    }.property('currentCreationType', 'saveNeeded'),

    unsavedCategory:function(){
        return this.get('saveNeeded') && ( this.get('currentCreationType') === "category" || this.get('currentCreationType') === "revision" );
    }.property('currentCreationType', 'saveNeeded'),

    unsavedTopic:function(){
        return this.get('saveNeeded') && (this.get('currentCreationType') === "topic" || this.get('currentCreationType') === "category" || this.get('currentCreationType') === "revision" );
    }.property('currentCreationType', 'saveNeeded'),



    categories:function(){
        return this.get('model.modelToDisplay').filterBy('isCategory', true);
    }.property('model.modelToDisplay.@each'),

    criteriaRevisions:function(){
        var ret = [];
        var sourceValues = [];

        this.get('categories').forEach(function(item){
            if( sourceValues.indexOf(item.get('criteriaRevision')) === -1 )
            {
                sourceValues.push(item.get('criteriaRevision'));
                ret.push(item);
            }
        });

        return ret;
    }.property('categories.@each'),

    latestCriteriaRevision:function(){
        return this.get('criteriaRevisions').get('length') ? this.get('criteriaRevisions').get('lastObject.criteriaRevision') : 0;
    }.property('criteriaRevisions'),

    activeCriteriaRevision:function(){
        return this.get('categories').filterBy('active', true).get("firstObject");
    }.property('categories'),

    selectedCriteriaRevisionModel:function(){
        return this.get('categories').filterBy('criteriaRevision', this.get('selectedCriteriaRevision.criteriaRevision')).sort( function(a,b){ return (a.get("categoryOrder") > b.get("categoryOrder")) ? 1 : ((b.get("categoryOrder") > a.get("categoryOrder")) ? -1 : 0); } );
    }.property('selectedCriteriaRevision', 'categories.@each'),


    actions:{
        addNewRevision:function()
        {
            this.set('currentCreationType', 'revision');

            var lastRevision = this.get('latestCriteriaRevision');

            var newCat = this.get('providedStore').createRecord( 'prioritizationItem',{
                isCategory:        true,
                isTopic:           false,
                isCriteria:        false,
                categoryOrder:     0,
                topicOrder:        0,
                priorityValue:     0,
                criteriaRevision:  lastRevision+1,
                active:            false,
                title:             "New Category"
            });

            Ember.run.next(this, function(){
                this.set('selectedCriteriaRevision', newCat);
                this.set('currentCategory', newCat);
                this.set('currentTopic', null);
                this.set('currentCriteria', null);
                Ember.run.next(this, function(){
                    $('.categoryContent div.active .categoryTitle').focus();
                });
            });
        },

        addNewCategory:function()
        {
            var lastCategory = this.get('selectedCriteriaRevisionModel.lastObject');

            this.set('currentCreationType', 'category');

            var newCat = this.get('providedStore').createRecord( 'prioritization-item',{
                 isCategory:        true,
                 isTopic:           false,
                 isCriteria:        false,
                 categoryOrder:     lastCategory.get('categoryOrder')+1,
                 topicOrder:        0,
                 priorityValue:     0,
                 criteriaRevision:  this.get('latestCriteriaRevision'),
                 active:            lastCategory.get('active'),
                 title:             "New Category"
             });

            Ember.run.next(this, function(){
                this.set('currentCategory', newCat);
                this.set('currentTopic', null);
                this.set('currentCriteria', null);
                Ember.run.next(this, function(){
                    $('.categoryContent div.active .categoryTitle').focus();
                });
            });

        },

        addNewTopic:function()
        {
            this.set('currentCreationType', 'topic');
            var lastTopic = this.get('currentCategory.topics.length') ? this.get('currentCategory.topics.lastObject.topicOrder'): 0;

            var lastTopicActive = this.get('currentCategory.topics.length') ? this.get('currentCategory.topics.lastObject.active'): false;

            var newTopic = this.get('providedStore').createRecord( 'prioritization-item',{
                isCategory:        false,
                isTopic:           true,
                isCriteria:        false,
                categoryID:        this.get('currentCategory'),
                categoryOrder:     0,
                topicOrder:        lastTopic+1,
                priorityValue:     0,
                criteriaRevision:  this.get('latestCriteriaRevision'),
                active:            lastTopicActive,
                title:             "New Topic"
            });

            Ember.run.next(this, function(){
                this.set('currentTopic', newTopic);
                this.set('currentCriteria', null);
                Ember.run.next(this, function(){
                    $('.topicContent div.active .topicTitle').focus();
                });
            });
        },

        addNewCriteria:function()
        {
            this.set('currentCreationType', 'criteria');
            var lastCriteria = this.get('currentTopic.criteria.length') ? this.get('currentTopic.criteria.lastObject.criteriaOrder'): 0;
            var lastCriteriaPriorityValue = this.get('currentTopic.criteria.length') ? this.get('currentTopic.criteria.lastObject.priorityValue'): 0;

            var lastCriteriaActive = this.get('currentTopic.criteria.length') ? this.get('currentTopic.criteria.lastObject.active'): false;

            var newCriteria = this.get('providedStore').createRecord( 'prioritization-item',{
                isCategory:        false,
                isTopic:           false,
                isCriteria:        true,
                topicID:           this.get('currentTopic'),
                categoryOrder:     0,
                topicOrder:        0,
                priorityValue:     lastCriteriaPriorityValue+1,
                criteriaRevision:  this.get('latestCriteriaRevision'),
                active:            lastCriteriaActive,
                title:             "New Criteria"
            });

            Ember.run.next(this, function(){
                this.set('currentCriteria', newCriteria);
                Ember.run.next(this, function(){
                    $('.criteriaContent div.active .criteriaTitle').focus();
                });
            });
        },


        makeRevisionCurrent:function(){
            this.get('model.modelToDisplay').filterBy('active', true).forEach(function(item, index, enumerable){
                item.set('active', false);
            });

            this.get('model.modelToDisplay').filterBy('criteriaRevision', this.get('selectedCriteriaRevisionModel.firstObject.criteriaRevision')).forEach(function(item, index, enumerable){
                item.set('active', true);
            });
        },

        previewRevision: function(){
            alert("preview revision not implemented yet");
        },

        deleteRevision:function(){
            return Bootstrap.ModalManager.show('revisionDeleteModal');
        },


        confirmRevisionDelete:function(){
            this.get('model.modelToDisplay').filterBy('criteriaRevision', this.get('selectedCriteriaRevisionModel.firstObject.criteriaRevision')).forEach(function(item, index, enumerable){
                item.deleteRecord();
                item.save();
            });
        },

        cancelRevisionDelete: function(){
        },

        deleteCategory:function(){
            //console.log("category delete", this.get('currentCategory.title'));
            return Bootstrap.ModalManager.show('categoryDeleteModal');
        },

        deleteCategoryConfirm:function(){
            this.get('currentCategory.topics').forEach(function(topicItem, index, enumerable){
                if( topicItem.get('criteria') )
                {
                    topicItem.get('criteria').forEach(function(criteriaItem, index, enumerable){
                        criteriaItem.deleteRecord();
                        criteriaItem.save();
                    });
                }
                topicItem.deleteRecord();
                topicItem.save();
            });

            this.get('currentCategory').deleteRecord();
            this.get('currentCategory').save();
        },

        deleteTopic:function(){
            //console.log("topic delete");
            return Bootstrap.ModalManager.show('topicDeleteModal');
        },

        deleteTopicConfirm:function(){
            if( this.get('currentTopic.criteria') )
            {
                this.get('currentTopic.criteria').forEach(function(criteriaItem, index, enumerable){
                    criteriaItem.deleteRecord();
                    criteriaItem.save();
                });
            }

            this.get('currentTopic').deleteRecord();
            this.get('currentTopic').save();
        },

        deleteCriteria:function(){
            //console.log("criteria delete");
            return Bootstrap.ModalManager.show('criteriaDeleteModal');
        },

        deleteCriteriaConfirm:function(){
            this.get('currentCriteria').deleteRecord();
            this.get('currentCriteria').save();
        },
    }
});