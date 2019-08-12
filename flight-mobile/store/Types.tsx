export const GET_ORDER = 'GET_ORDER';

export interface Message {
    _id: number;
    text: string;
    createdAt: Date;
    user: {
        _id: number;
        name: string;
        avatar: string
    }
}

interface GetOrderAction {
    type: typeof GET_ORDER
    payload: String
} 

export type ChatActionTypes = GetOrderAction;