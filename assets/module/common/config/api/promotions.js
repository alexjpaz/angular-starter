angular.module('vehimatics').config(function(ResourceProvider, $provide) {
	ResourceProvider.register('AllSagCoupons', '/sag/all');
	ResourceProvider.register('CurrentCoupons', '/coupon/admin/all');
	ResourceProvider.register('MfgCoupons', '/coupon/admin/list/mfg');
	ResourceProvider.register('EditCoupon', '/coupon/update/:promoCouponId');
	ResourceProvider.register('GetCoupon', '/coupon/:promoCouponId');
	ResourceProvider.register('CouponIntent', '/coupon/print');
	ResourceProvider.register('DeleteCoupon', '/coupon/delete');
	// ResourceProvider.register('SuspendCoupon', '/coupon/:promoCouponId'); // to suspend, set couponStatus = "S"
});
/** @file */
