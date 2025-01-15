export namespace NSPaket {
    
    export interface Item {
        id?: string
        paket_kode: string
        paket_name: string
        sub_paket_name?: string
        product_id: string
        category_id: string
        company_id: string
        is_deleted?: boolean
        createdAt?: Date
    }

    export interface ItemDetail {
        id?: string
        product_id: string
        detail_name: string
        detail_value: string
    }
}