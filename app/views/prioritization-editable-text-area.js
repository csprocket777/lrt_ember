/**
 * Created by chshipma on 10/7/13.
 */
export default Ember.TextArea.extend({
    attributeBindings:['disabled'],

   didInsertElement:function(){
       //this.set('isInserted', true);

       var self = this;
       var selfID = self.get('elementId');

       if( this.get('disabled') === false )
       {
           var editor = $('#'+selfID).redactor({
               buttons:[
                   'html', '|', 'formatting', '|', 'bold', 'italic', 'deleted', '|',
                   'unorderedlist', 'orderedlist', 'outdent', 'indent', '|',
                   'alignment', '|', 'horizontalrule'
               ],
               changeCallback: function(html){
                   self.set('value', html);
               }
           });
       }

       /*if( !this.get('isRendered') && this.get('isInserted') && $('#'+selfID).parent().find('cke').length === 0 ){

           var editor = $('#'+selfID).ckeditor({
               toolbar:[
                   { name: 'document', items:['Source'] },
                   { name: 'clipboard', items:['Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                   { name: 'editing', items:['scayt']},
                   { name: 'basicstyles', items:['Bold', 'Italic', 'Underline', 'TextColor', 'BGColor', '-', 'RemoveFormat']},
                   { name: 'styles', items:['FontSize']},
                   { name: 'paragraph', items:['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']}
               ]
           }).editor;

           editor.on('change', function(e){
               if(e.editor.checkDirty()){
                   self.set('value', editor.getData());
               }
           });

           this.set('isRendered', true);
       }*/
   },

   renderEditor:function(){
    /*   var self = this;
       var selfID = self.get('elementId');

        if( !this.get('isRendered') && this.get('isInserted') && $('#'+selfID).parent().find('cke').length === 0 ){

            var editor = $('#'+selfID).ckeditor({
               toolbar:[
                   { name: 'document', items:['Source'] },
                   { name: 'clipboard', items:['Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
                   { name: 'editing', items:['scayt']},
                   { name: 'basicstyles', items:['Bold', 'Italic', 'Underline', 'TextColor', 'BGColor', '-', 'RemoveFormat']},
                   { name: 'styles', items:['FontSize']},
                   { name: 'paragraph', items:['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-']}
               ]
            }).editor;

            editor.on('change', function(e){
               if(e.editor.checkDirty()){
                   self.set('value', editor.getData());
               }
            });

            this.set('isRendered', true);
        }

       console.log( this.get('areaVisible') );
*/
   }.observes('areaVisible')

});