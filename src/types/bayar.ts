import { NSHargaSewa } from "./hargaSewa.js"

export namespace NSPaket {
    
    export interface Item{
        id?: string
        type: NSHargaSewa.Type
        product_id?: string
        paket_id?: string
        satuan_id: string
        harga: number
        is_default?: boolean
    }
}