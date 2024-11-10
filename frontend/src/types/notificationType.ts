export interface Notification {
    notification_id: number;
    sender: number;
    senderName?: string;
    receiverName?: string;
    receiver: number;
    id_redirect: number;
    message: string | null;
    created_at: string;
    notif_type: string;
    updated_at: string;
}
