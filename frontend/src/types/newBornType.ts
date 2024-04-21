import { PostPartrumModel } from "./PostPartrum";
import { UserModel } from "./userType";

export interface NewBornModel extends UserModel {
    newBornId?: number;
    user_id?: number;
    appointment_id?: string;
    infantsName?: string;
    dateTimeDelivery?: string;
    infantsSex?: string;
    lengthAtBirth?: string;
    infantWeight?: string;
    newBornScreeningCode?: string;
    dateOfNewBornScreening?: string;
    dateAndTimeOfDischarge?: string;
    APGARScore?: string;
    Presentation?: string;
    uterusPosition?: string;
    size?: string;
    shape?: string;
    adnexae?: string;
    laceration?: string;
    discharge?: string;
    specify?: string;
    postPartrum?: PostPartrumModel[];
    postPartrumToRemove?: PostPartrumModel[];
}