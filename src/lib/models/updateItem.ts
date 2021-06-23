export interface UpdateItem {
    channel_post: Message;
    message: Message;
    update_id: number;
}

export interface Message {
    text: string;
    chat: Chat;
    message_id: number;
}

export interface Chat {
    id: number;
}
