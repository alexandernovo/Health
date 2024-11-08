export interface Notification {
    notification_id: number;
    sender: number;
    receiver: number;
    notif_type: number;
    id_redirect: number;
    message: string | null;
    created_at: string;
    updated_at: string;
}
