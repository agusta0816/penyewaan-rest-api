export namespace NSCompanies {
    
    export enum IsActive {
        Active = 'active',
        InActive = 'in-active'
    }

    export interface ICompanies {
        id: string;
        company_name: string;
        email: string;
        phone: string;
        address: string;
        is_active: IsActive;
    }
}