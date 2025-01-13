import { NSHargaSewa } from "./hargaSewa.js"

export namespace NSPinjaman { 

    export enum StatusOrder {
        InProgress = 'in-progress',
        PaymentReceived = 'payment-received',
        PaymentFailed = 'payment-failed',
        Confirmed = 'confirmed',
        InDelivery = 'in-delivery',
        Completed = 'completed',
        Canceled = 'canceled',
        Closed = 'closed'
    }

    export interface Item {
        id?: string
        pinjam_kode: string
        order_date?: Date
        customer_id: string
        company_id: string
        total_order: number
        total_ppn: number
        diskon: number
        total_diskon: number
        biaya_pengiriman: number
        grand_total: number
        status_order?: StatusOrder
    }

    export interface ItemDetail {
        id?: string
        pinjaman_id: number
        product_id: string
        paket_id: string
        type?: NSHargaSewa.Type
        harga: number
        diskon: number
        tax: number
        komisi: number
        total: number
    }
}