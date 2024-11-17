export namespace OrdersMicroservice {
    export const name = 'ORDERS_MS';
    export enum Actions {
        CREATE   = 'createOrder',
        FIND_ALL = 'findAllOrders',
        FIND_ONE = 'findOneOrder',
        CHANGE_STATUS = 'changeOrderStatus'
    }
}
