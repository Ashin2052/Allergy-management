import any = jasmine.any;

export type Userlogin = {
    email: string;
    password: string;
};

export type ApiErrorResponse = {
    data: ApiData;
    message: string;
    status: number;
};

type ApiData = {
    info: string;
    [key: string]: string;
};

export type ApiResponse = {
    data: ApiData;
    message?: string;
    status: number;
};

export type Signup = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};
export enum severityEnum {
    low ='LOW',
    medium ='MEDIUM',
    high ='HIGH',
}

export type Allergy = {
    id?:string,
    name: string,
    description: string,
    severity: severityEnum,
    symptoms: string,
    cloudinaryId: string,
    image?: any,
    notes?: string
}

export  type  Itable = {
    dataSource: any[],
    columns: any[]
}

export type Column = {
    id: 'name' | 'code' | 'population' | 'size' | 'density';
    label: string;
    minWidth?: number;
    align?: 'right' | 'left';
    format?: (value: number) => string;
}