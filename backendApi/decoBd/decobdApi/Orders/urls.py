from django.urls import path
from .views import AllOrdersView,PlaceOrderView,AddCouponToCheckout,checkoutView
urlpatterns = [
    path('checkout/',checkoutView.as_view()),
    path('add-coupon-checkout/',AddCouponToCheckout.as_view()),
    path('allorders/',AllOrdersView.as_view()),
    path('place-order/',PlaceOrderView.as_view()),
    # path('remove-order-item/', RemoveCartItemFromOrder.as_view()),
    # path('item-quantity-update/', ItemQuantityUpdateView.as_view()),
]