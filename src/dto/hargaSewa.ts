export namespace NSHargaSewa {

    export enum Type {
        product = 'product',
        paket = 'paket'
    }

    export interface Item {
        id?: string
        type: Type
        product_id?: string
        paket_id?: string
        satuan_id: string
        harga: number
        is_deleted?: boolean
    }
}