export namespace NSPengembalian {

    export interface Item{
        id?: string
        pinjaman_id: number
        pengembalian_kode: string
        pengembalian_date?: Date
    }

    export interface ItemDetail{
        id?: string
        pinjaman_id: number
        pengembalian_id: number
        product_id: string
        paket_id: string
    }
}