export interface ProductoUnico {
    id: number
    nombre: string
    tipo: string
    descripcion: string
    descripcion_extendida:string
    precio: number
    foto: string
    related_products: RelatedProduct[]
  }
  
  export interface RelatedProduct {
    id: number
    nombre: string
    precio: number
    foto: string
  }