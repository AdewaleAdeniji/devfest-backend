export interface AttendeeSignupPayload {
    attendeeEmail: string;
    attendeeFirstName: string;
    attendeeLastName: string;
    attendeeOrg?: string;
    attendeeExperience?: string;
    attendeeLearning?: string;
    refferedBy?: string;
}

export interface Attendee {
    attendeeID: string;
    attendeeEmail: string;
    attendeeFirstName: string;
    attendeeLastName: string;
    attendeeOrg?: string;
    attendeeExperience?: string;
    attendeeLearning?: string;
    refferalCode?: string;
    referredBy?: string;
}