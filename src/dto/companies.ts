export namespace NSCompanies {
    
    export enum IsActive {
        Active = 'active',
        InActive = 'in-active'
    }

    export interface Item {
        id: string;
        company_kode?: string;
        company_name: string;
        email: string;
        phone: string;
        address: string;
        is_active: IsActive;
    }
}