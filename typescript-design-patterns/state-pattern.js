var Order = /** @class */ (function () {
    function Order() {
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderPreparedState = new OrderPreparedState(this);
        this.cancelledOrderState = new CancelledOrderState(this);
        this.shippingOrderState = new ShippingOrderState(this);
        this.setState(this.paymentPendingState);
    }
    Order.prototype.getState = function () {
        return this.currentState;
    };
    Order.prototype.setState = function (state) {
        this.currentState = state;
    };
    return Order;
}());
var PaymentPendingState = /** @class */ (function () {
    function PaymentPendingState(order) {
        this.order = order;
    }
    PaymentPendingState.prototype.verifyPayment = function () {
        console.log('verifying your order');
        this.order.setState(this.order.orderPreparedState);
    };
    PaymentPendingState.prototype.cancelOrder = function () {
        console.log('cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    };
    PaymentPendingState.prototype.shipOrder = function () {
        console.log('shipping your order');
        this.order.setState(this.order.shippingOrderState);
    };
    return PaymentPendingState;
}());
var OrderPreparedState = /** @class */ (function () {
    function OrderPreparedState(order) {
        this.order = order;
    }
    OrderPreparedState.prototype.verifyPayment = function () {
        console.log('already your order is verified');
    };
    OrderPreparedState.prototype.cancelOrder = function () {
        console.log('cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    };
    OrderPreparedState.prototype.shipOrder = function () {
        console.log('shipping your order');
        this.order.setState(this.order.shippingOrderState);
    };
    return OrderPreparedState;
}());
var CancelledOrderState = /** @class */ (function () {
    function CancelledOrderState(order) {
        this.order = order;
    }
    CancelledOrderState.prototype.verifyPayment = function () {
        console.log('your order has been cancelled, can not verify payment');
    };
    CancelledOrderState.prototype.cancelOrder = function () {
        console.log('your order has been already cancelled');
    };
    CancelledOrderState.prototype.shipOrder = function () {
        console.log('your order has been cancelled, can not shipped');
    };
    return CancelledOrderState;
}());
var ShippingOrderState = /** @class */ (function () {
    function ShippingOrderState(order) {
        this.order = order;
    }
    ShippingOrderState.prototype.verifyPayment = function () {
        console.log('your order already been verified');
    };
    ShippingOrderState.prototype.cancelOrder = function () {
        console.log('your order cannot be cancelled since its already shipped');
    };
    ShippingOrderState.prototype.shipOrder = function () {
        console.log('your order already been shipped');
    };
    return ShippingOrderState;
}());
var order = new Order();
order.getState().verifyPayment();
order.getState().cancelOrder();
console.log(order.getState().constructor.name);
