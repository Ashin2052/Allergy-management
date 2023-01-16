
export type IAllergy = {
    id?:string,
    name: string,
    description: string,
    severity: severityEnum,
    symptoms: string,
    cloudinaryId: string,
    image?: any,
    notes?: string
}
export enum severityEnum {
    Low ='LOW',
    Medium ='MEDIUM',
    High ='HIGH',
}
