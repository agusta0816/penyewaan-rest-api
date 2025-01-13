export namespace NSProduct {

    export interface Item {
        id?: string;
        product_kode: string;
        category_id: string;
        company_id: string;
        product_name: string;
        sub_product_name?: string;
        is_deleted?: boolean;
        createdAt?: Date;
    }

    export interface ItemDetail{
        id?: string;
        product_id: string;
        detail_name: string;
        detail_value: string;
    }
}