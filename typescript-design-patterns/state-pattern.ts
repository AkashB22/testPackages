interface State {
    order: Order;
    verifyPayment();
    cancelOrder();
    shipOrder()
}

class Order {
    currentState: State;
    paymentPendingState: State;
    orderPreparedState: State;
    cancelledOrderState: State;
    shippingOrderState: State;

    constructor() {
        this.paymentPendingState = new PaymentPendingState(this);
        this.orderPreparedState = new OrderPreparedState(this);
        this.cancelledOrderState = new CancelledOrderState(this);
        this.shippingOrderState = new ShippingOrderState(this);

        this.setState(this.paymentPendingState);
    }

    getState() {
        return this.currentState;
    }

    setState(state: State) {
        this.currentState = state;
    }
}

class PaymentPendingState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    verifyPayment() {
        console.log('verifying your order');
        this.order.setState(this.order.orderPreparedState);
    }
    cancelOrder() {
        console.log('cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    }
    shipOrder() {
        console.log('shipping your order');
        this.order.setState(this.order.shippingOrderState);
    }
}

class OrderPreparedState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    verifyPayment() {
        console.log('already your order is verified');
    }
    cancelOrder() {
        console.log('cancelling your order');
        this.order.setState(this.order.cancelledOrderState);
    }
    shipOrder() {
        console.log('shipping your order');
        this.order.setState(this.order.shippingOrderState);
    }
}

class CancelledOrderState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    verifyPayment() {
        console.log('your order has been cancelled, can not verify payment');
    }
    cancelOrder() {
        console.log('your order has been already cancelled');
    }
    shipOrder() {
        console.log('your order has been cancelled, can not shipped');
    }
}

class ShippingOrderState implements State {
    order: Order;

    constructor(order: Order) {
        this.order = order;
    }

    verifyPayment() {
        console.log('your order already been verified');
    }
    cancelOrder() {
        console.log('your order cannot be cancelled since its already shipped');
    }
    shipOrder() {
        console.log('your order already been shipped');
    }
}

let order = new Order();
order.getState().verifyPayment();
order.getState().cancelOrder();

console.log((<any> order.getState()).constructor.name);