/**
 * Created by chshipma on 3/5/14.
 */
import PrivilegedController from 'appkit/mixins/privileged-controller';
import PaginationMixin from 'appkit/mixins/pagination';
export default Ember.ArrayController.extend(PaginationMixin, PrivilegedController,{
    itemsPerPage: 10,
    pagesToShow: 10,
    recordMeta: null,
    currentPage: 1,
    changePerPageCountCallback: function(count){
        this.send('reloadModel');
    }
});