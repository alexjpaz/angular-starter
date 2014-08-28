angular.module('vehimatics').config(function($provide) {
	var each = angular.forEach;
	var isundef = angular.isUndefined;
	var isdef = angular.isDefined;
	/**
	 * @class UserSession
	 * @memberof module:vehimatics.helpers
	 */

	 /**
	  * @event module:vehimatics.helpers.UserSession#UserSession_refresh
	  * @type {object}
	  * @property session - instance of the UserAccount session object.
	  *
	  */
	 $provide.service('UserSession', function(UserAccount, $q, $rootScope, $parse) {

		 var session = null;

		 var sessionIsValid = function() {
			 return session !== null;
		 };

		 /**
		  * Globally sets the UserSession object
		  * @method module:vehimatics.helpers.UserSession#setSession
		  * @param session object
		  */
		  this.setSession = function(sess) {
			  session = sess;
		  };

		  /**
		   * Get new instance of the user session
		   * Should only be called by an agent to refesh the state.
		   * Use [onRefresh]{@link module:vehimatics.helpers.UserSession#onRefresh} to get the current state of the session.
		   * @method module:vehimatics.helpers.UserSession#refresh
		   * @param {callback} success
		   * @param {callback} error
		   */
		  this.refresh = function(success, error) {
			  return UserAccount.get(function(data) {
				  session = data;
				  if(isdef(success)) {
					  success(data);	
				  }
				  $rootScope.$broadcast('UserSession.refresh', session);
			  }, function(data) {
				  if(isdef(error)) {
					  error(data);	
				  }
				  $rootScope.$broadcast('UserSession.refresh', session);
			  });
		  };

		  /** 
		   * Attach callback to refresh event
		   * @method module:vehimatics.helpers.UserSession#onRefresh
		   * @param {function} callback - function that is called everytime the UserSession is updated
		   */
		   this.onRefresh = function(callback) {
			   $rootScope.$on('UserSession.refresh', callback);
		   };

		   /**
			* Checks to see if the user has a global permission.
			* permission parameter accepts dotpath notation
			* e.g. "termStatus.privacyAccepted"
			* @method module:vehimatics.helpers.UserSession#userHasRole
			* @param {string} role - role to search for e.g. SYSADMIN
			* @returns boolean
			*/
			this.userHasRole = function(role) {
				var hasRole = false;
				if(sessionIsValid()) {
					each(session.roles, function(rr) {
						if(rr.roleName === role) {
							hasRole = true;
						}
					});
				}
				return hasRole;
			};

			/**
			 * @method module:vehimatics.helpers.UserSession#getProperty
			 * @returns boolean
			 */
			 this.getPropery = function(property) {
				 return $parse(propert)(session);
			 };

			 /**
			  * @method module:vehimatics.helpers.UserSession#userHasPermission
			  * @param {string} permission
			  * @return boolean
			  */
			  this.userHasPermission = function(permission) {
				  var hasPermission = false;

				  var getter = $parse(permission);
				  hasPermission = (getter(session.globalPermissions) === true);

				  return hasPermission;
			  };

			  /**
			   * @method module:vehimatics.helpers.UserSession#getFirstEmail
			   * @return {string} primary email address
			   */
			   this.getFirstEmail = function() {
				   var email = null;
				   var isPrimary = false;

				   each(session.emailAddresses, function(ea) {
					   if(ea.emailTypeCode === 'P') {
						   isPrimary = true
						   email = ea.emailAddress;
					   } else {
						   if(isPrimary == false) {
							   email = ea.emailAddress;
						   }
					   }
				   });

				   return email;
			   };
	 });
});
/** @file */
