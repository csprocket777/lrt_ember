import BaseModel from 'appkit/models/base-model';

export default BaseModel.extend({
    propertiesToWatch:      function(){
        return [ 'managerID', 'approverID', 'type' ];
    }.property(),

	active:					DS.attr('boolean', {default:true}),
	alphaUser:				DS.attr('boolean'),
	approverID:             DS.belongsTo('user', {inverse: 'directApprovees'}),
	betaUser:				DS.attr('boolean'),
	cecID:					DS.attr('string'),
	developmentTeam:		DS.belongsTo('developmentTeam'),
//	groupAssociation:		DS.belongsTo('groupAssociation', {inverse:''}),
    groupAssociation:		DS.hasMany('groupAssociation'),
	isAdmin:				DS.attr('boolean'),
	isMgmt:					DS.attr('boolean'),
	isPersonnel:			DS.attr('boolean', {default:true}),
	jobRole_ids:			DS.hasMany('jobRole'),
	lastLoginTime:			DS.attr('string'),
	maintenanceUser:		DS.attr('boolean'),
	managerID:				DS.belongsTo('user', {inverse:'directReports'}),
	name:					DS.attr('string'),
	type:					DS.belongsTo('userType'),

    accessLevels:           DS.hasMany('accessLevel'),
    extraPrivileges:        DS.hasMany('privilege'),

    directReports:          DS.hasMany('user', {inverse: 'managerID'}),
    directApprovees:        DS.hasMany('user', {inverse: 'approverID'}),

    jobRoleIsDirty:         DS.attr('boolean'),
    jobRolesOriginal:       DS.attr(),


//    orig_groupAssociation:  DS.attr('number'),
    orig_developmentTeam:   DS.belongsTo('developmentTeam'),
    orig_approverID:        DS.belongsTo('user'),//, {inverse: 'directApprovees'}),
    orig_managerID:         DS.belongsTo('user'),//, {inverse:'directReports'}),
    orig_type:              DS.belongsTo('userType'),
    orig_accessLevels:      DS.hasMany('accessLevel'),
    orig_groupAssociation:  DS.hasMany('groupAssociation'),
    orig_extraPrivileges:   DS.hasMany('privilege'),

    groupAssociationDirty:  DS.attr('boolean', {default: false}),
    developmentTeamDirty:   DS.attr('boolean', {default: false}),
    approverIDDirty:        DS.attr('boolean', {default: false}),
    managerIDDirty:         DS.attr('boolean', {default: false}),
    typeDirty:              DS.attr('boolean', {default: false}),

    accessLevelsDirty:      DS.attr('boolean', {default: false}),

    extraPrivilegesDirty:   DS.attr('boolean', {default: false}),

    saving:                 DS.attr('boolean', {default:false}),

    manager_AD_ID:          DS.attr('string'),
    user_AD_ID:             DS.attr('string'),
    user_AD_DEPT:           DS.attr('string'),
    user_AD_DN:             DS.attr('string'),

    emailAddress: function(){
        return this.get('cecID')+"@cisco.com";
    }.property('cecID'),
	
	
	firstName:function(){
		return ( this.get('name') && this.get('name').split(' ').length > 0 ? this.get('name').split(' ')[0]: this.get('name'));
	}.property('name'),

    accessLevelPrivileges: function(){
        var ret = [];

        if( this.get('accessLevels') )
        {
            this.get('accessLevels').forEach(function(al){
                al.get('privileges').forEach(function(priv){
                    if( !ret.contains(priv) )
                    {
                        ret.push(priv);
                    }
                });
            });
        }

        return ret;
    }.property('accessLevel.@each'),

    privileges:function( key, value ){
        var ret = [];

        if( this.get('accessLevels') )
        {
            this.get('accessLevels').forEach(function(al){
                al.get('privileges').forEach(function(priv){
                    if( !ret.contains(priv) )
                    {
                        ret.push(priv);
                    }
                });
            });
        }

        if( this.get('extraPrivileges') )
        {
            this.get('extraPrivileges').forEach( function(ep){
                if( !ret.contains(ep) )
                {
                    ret.push(ep);
                }
            });
        }

        return ret;
    }.property('accessLevels.@each.privileges.@each'),

    didError: function(){

    }
});